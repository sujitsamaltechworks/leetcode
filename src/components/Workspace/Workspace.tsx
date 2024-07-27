import * as React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

type WorkspaceProps = {
  problem: any;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  return (
    <Split className="split">
      <ProblemDescription problem={problem} />
      <div>Code Editor</div>
    </Split>
  );
};

export default Workspace;
