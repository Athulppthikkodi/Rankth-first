/** @jsxImportSource @emotion/react */
import React from "react";
import { CSSObject } from "@emotion/react";

type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | "fullWidth";

type ContainerProps = {
  maxWidth?: MaxWidth;
  disableGutters?: boolean;
  sx?: CSSObject;
  children: React.ReactNode;
};

const maxWidthValues: Record<MaxWidth, string> = {
  xs: "444px",
  sm: "600px",
  md: "768px",
  lg: "1157px",
  xl: "1280px",
  fullWidth: "100%",
};

const Container: React.FC<ContainerProps> = ({
  maxWidth = "lg",
  disableGutters = false,
  sx = {},
  children,
}) => {
  const containerStyles: CSSObject = {
    width: "100%",
    margin: "0 auto",
    maxWidth: maxWidthValues[maxWidth],
    paddingLeft: disableGutters ? "0" : "16px",
    paddingRight: disableGutters ? "0" : "16px",
    ...sx, // Merge custom styles
  };

  return <div css={containerStyles}>{children}</div>;
};

export default Container;
