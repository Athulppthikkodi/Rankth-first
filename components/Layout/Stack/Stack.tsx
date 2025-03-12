/** @jsxImportSource @emotion/react */
import React from "react";
import { CSSObject } from "@emotion/react";

type StackProps = {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  spacing?: number; // Spacing in pixels
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  sx?: CSSObject; // Custom styles like MUI `sx`
  children: React.ReactNode;
};

const Stack: React.FC<StackProps> = ({
  direction = "row",
  spacing = 0,
  alignItems = "stretch",
  justifyContent = "flex-start",
  wrap = "nowrap",
  sx = {},
  children,
}) => {
  const stackStyles: CSSObject = {
    display: "flex",
    flexDirection: direction,
    gap: `${spacing}px`,
    alignItems,
    justifyContent,
    flexWrap: wrap,
    ...sx, // Merge custom styles
  };

  return <div css={stackStyles}>{children}</div>;
};

export default Stack;
