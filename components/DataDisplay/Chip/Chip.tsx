import React from "react";
import { cn } from "@/lib/utils"; 
import linkIcon from "@/public/link-building-icon.svg";
import Image from "next/image";
type ChipType = "high" | "low" | "link-building";

type ChipsProps = {
  type: ChipType;
};
const Chip: React.FC<ChipsProps> = ({ type }) => {
  const chipStyles: Record<ChipType, string> = {
    high: "bg-red-500 text-white",
    low: "bg-blue-500 text-white",
    "link-building": "bg-green-500 text-white flex items-center gap-1",
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-sm font-medium", chipStyles[type])}>
      {type === "link-building" && <Image src={linkIcon} width={11} height={11} alt="link building icon" />} 
      {type.replace("-", " ")} 
    </span>
  );
};

export default Chip;
