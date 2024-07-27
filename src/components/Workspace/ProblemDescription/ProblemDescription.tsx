import * as React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import {
  AiFillDislike,
  AiFillLike,
  AiFillStar,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { getDifficultyType } from "@/utils/commonFunctions";

type ProblemDescriptionProps = {
  problem: any;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  return (
    <div className="bg-dark-layer-1">
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          <div className="w-full">
            <div className="flex-col">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem
                  ? `${problem.questionId}. ${problem.questionTitle}`
                  : "...Loading"}
              </div>
              <div className="flex items-center mt-3">
                <div
                  className={`inline-block rounded-[21px] bg-opacity-[.15] py-1 text-sm font-medium capitalize `}
                >
                  {problem
                    ? getDifficultyType(problem.difficulty)
                    : "...Loading"}
                </div>

                <div className={`flex items-center ms-4`}>
                  <AiFillLike className="text-xl text-white me-1 hover:text-red-900" />
                  <div className="text-white">
                    {problem ? problem.likes : "...Loading"}
                  </div>
                </div>

                <div className={`flex items-center ms-4`}>
                  <AiFillDislike className="text-xl text-white me-1 hover:text-red-900" />
                  <div className="text-white">
                    {problem ? problem.dislikes : "...Loading"}
                  </div>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="text-white text-sm mt-3">
                <div dangerouslySetInnerHTML={{ __html: problem?.question }} />
              </div>

              {/* Hints */}
              <div className="my-8 pb-4">
                <div className="text-white font-medium">Hints:</div>
                <ul className="text-white list-disc ml-5 mt-2">
                  {problem?.hints.map((hint: string, index: number) => (
                    <li
                      className="text-sm mb-1"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: hint }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
