import React from "react";
import styled from "@emotion/styled";
import linkIcon from "@/public/link-building-icon.svg";
import Image from "next/image";

type ChipType = "high" | "low" | "medium" | "link-building";

const ChipContainer = styled.span<{ chipType: ChipType }>`
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  ${({ chipType }) => {
    switch (chipType) {
      case "high":
        return `
          background-color: #FFD3C9;
          color: #E24622;
        `;
      case "medium":
        return `
          background-color: #FDEDBC;
          color: #AB7200;
        `;
      case "low":
        return `
          background-color: #DEF4EB;
          color: #01B86E;
        `;
      case "link-building":
        return `
          background-color: #DEF0F4;
          color: #148AA4;
        `;
    }
  }}
`;

const Dot = styled.span<{ chipType: ChipType }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ chipType }) => {
    switch (chipType) {
      case "high":
        return "#dc2626";
      case "medium":
        return "#ca8a04";
      case "low":
        return "#2563eb";
      default:
        return "currentColor";
    }
  }};
`;

type ChipsProps = {
  type: ChipType;
  text: string;
};

const Chip: React.FC<ChipsProps> = ({ type, text }) => {
  const showDot = type === 'high' || type === 'medium' || type === 'low';
  
  return (
    <ChipContainer chipType={type}>
      {showDot && <Dot chipType={type} />}
      {type === "link-building" && <Image src={linkIcon} width={11} height={11} alt="link building icon" />}
      {text}
    </ChipContainer>
  );
};

export default Chip;
