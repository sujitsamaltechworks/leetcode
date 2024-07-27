import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  const [problem, setProblem] = React.useState();
  const { query } = useRouter();
  let problemTitle = query.titleSlug;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://alfa-leetcode-api.onrender.com/select?titleSlug=${query?.titleSlug}`
        );
        setProblem(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    problemTitle && fetchData();
  }, [query]);

  return (
    <>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </>
  );
};

export default ProblemPage;
