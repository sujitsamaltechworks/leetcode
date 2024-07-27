import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/router";
import { getDifficultyType } from "@/utils/commonFunctions";

type ProblemsTableProps = {};

// type Problem = {
//   acRate: number;
//   difficulty: string;
//   freqBar: any;
//   questionFrontendId: string;
//   isFavor: boolean;
//   isPaidOnly: boolean;
//   status: any;
//   title: string;
//   titleSlug: string;
//   topicTags: Array<{}>;
//   hasSolution: boolean;
//   hasVideoSolution: boolean;
// };

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  const [problems, setProblems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://alfa-leetcode-api.onrender.com/problems"
        );
        setProblems(response.data.problemsetQuestionList);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchData();
  }, []);

  // const getDifficultyType = (val: string) => {
  //   if (val == "Easy") {
  //     return <span className="text-green-500">{val}</span>;
  //   } else if (val == "Medium") {
  //     return <span className="text-yellow-500">{val}</span>;
  //   } else {
  //     return <span className="text-red-500">{val}</span>;
  //   }
  // };

  const handleProblemSelect = (title: string) => {
    router.push(`/problems/${title}`);
    // router.push("/pid");
  };

  return (
    <Table className="m-[32px] w-[60%] mx-auto">
      <TableCaption>A list of mind bending problems</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20px]">Status</TableHead>
          <TableHead className="w-[70%]">Title</TableHead>
          <TableHead className="w-[20px]">Difficulty</TableHead>
          <TableHead className="w-[20%]">Category</TableHead>
          <TableHead className="w-[100%]">Solutions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem: any) => (
          <TableRow key={problem.questionFrontendId}>
            <TableCell>{problem.status}</TableCell>
            <TableCell
              onClick={() => handleProblemSelect(problem.titleSlug)}
            >{`${problem.questionFrontendId}. ${problem.title}`}</TableCell>
            <TableCell>{getDifficultyType(problem.difficulty)}</TableCell>
            <TableCell>
              {problem.topicTags.map((topic: any) => topic.name).join(", ")}
            </TableCell>
            <TableCell>
              {problem.hasSolution ? "Solution" : "No Solution"}
              {problem.hasVideoSolution ? " (Video)" : ""}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProblemsTable;
