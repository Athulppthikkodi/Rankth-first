/** @jsxImportSource @emotion/react */
import React, { ReactNode, ElementType } from "react";
import { css, CSSObject } from "@emotion/react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

export type TypographyAlign = "inherit" | "left" | "center" | "right" | "justify";

export type TypographyProps = {
  variant?: TypographyVariant;
  align?: TypographyAlign;
  color?: string;
  noWrap?: boolean;
  paragraph?: boolean;
  fontWeight?: "light" | "regular" | "medium" | "bold";
  fontStyle?: "normal" | "italic";
  component?: ElementType;
  children?: ReactNode;
  sx?: CSSObject;
  className?: string;
};

// Map variant to valid HTML elements
const variantMapping: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "p",
  subtitle2: "p",
  body1: "div",
  body2: "div",
  caption: "span",
  overline: "span",
};

const baseStyles = css`
  margin: 0;
  padding: 0;
  line-height: 1.5;
  p {
    font-size: 16px;
    color: inherit;
  }
`;

const variantStyles: Record<TypographyVariant, CSSObject> = {
  h1: { fontSize: "40px", fontWeight: 700 , lineHeight: "normal" },
  h2: { fontSize: "30px", fontWeight: 700, lineHeight: "normal" },
  h3: { fontSize: "25px", fontWeight: 700,  lineHeight: "normal" },
  h4: { fontSize: "20px", fontWeight: 700 , lineHeight: "normal" },
  h5: { fontSize: "18px", fontWeight: 700, lineHeight: "normal" },
  h6: { fontSize: "16px", fontWeight: 700, lineHeight: "normal" },
  subtitle1: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5 },
  subtitle2: { fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.5 },
  body1: {  fontWeight: 400, lineHeight: 1.5 },
  body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.4 },
  overline: { fontSize: "0.625rem", fontWeight: 400, lineHeight: 1.4, textTransform: "uppercase" },
};

const fontWeightStyles: Record<string, CSSObject> = {
  light: { fontWeight: 300 },
  regular: { fontWeight: 400 },
  medium: { fontWeight: 500 },
  bold: { fontWeight: 700 },
};

const fontStyleStyles: Record<string, CSSObject> = {
  normal: { fontStyle: "normal" },
  italic: { fontStyle: "italic" },
};

const alignStyles: Record<TypographyAlign, CSSObject> = {
  inherit: {},
  left: { textAlign: "left" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  justify: { textAlign: "justify" },
};

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  align = "inherit",
  color = "inherit",
  noWrap = false,
  paragraph = false,
  fontWeight,
  fontStyle = "normal",
  component,
  children,
  sx = {},
  className = "",
  ...props
}) => {
  // Resolve the correct HTML element
  const Component: ElementType =
    component || (paragraph ? "p" : variantMapping[variant] || "span");

  // Apply default fontWeight from variant if not explicitly passed
  const defaultFontWeight = fontWeight
    ? fontWeightStyles[fontWeight]
    : { fontWeight: variantStyles[variant].fontWeight };

  const combinedStyles = css([
    baseStyles,
    variantStyles[variant],
    defaultFontWeight, // Automatically apply based on variant
    fontStyleStyles[fontStyle],
    alignStyles[align],
    noWrap && { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    { color },
    sx,
  ]);

  return (
    <Component css={combinedStyles} className={className} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
