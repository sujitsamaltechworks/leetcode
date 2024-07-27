import React from "react";

export function getDifficultyType(val: string) {
  if (val === "Easy") {
    return <span className="text-green-500">{val}</span>;
  } else if (val === "Medium") {
    return <span className="text-yellow-500">{val}</span>;
  } else {
    return <span className="text-red-500">{val}</span>;
  }
}
