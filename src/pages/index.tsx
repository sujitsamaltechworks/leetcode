import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import React from "react";

const Index = () => {
  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      <Topbar />
      <ProblemsTable />
    </div>
  );
};

export default Index;
