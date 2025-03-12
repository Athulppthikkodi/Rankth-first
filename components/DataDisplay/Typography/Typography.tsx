// components/Typography.tsx
import React, { ReactNode } from "react";

// Define all possible variant options
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  // | "subtitle2"
  | "body1"
  | "body2"
  // | "button"
  // | "caption"
  // | "overline";

// Define color options
type TypographyColor =
  | "initial"
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "error"
  | "warning"
  | "info"
  | "success";

// Define align options
type TypographyAlign = "inherit" | "left" | "center" | "right" | "justify";

// Define font weight
type FontWeight = "light" | "regular" | "medium" | "bold";

// Define font style
type FontStyle = "normal" | "italic";

// Define component props with TypeScript
interface TypographyProps {
  variant?: TypographyVariant;
  component?: React.ElementType;
  color?: TypographyColor;
  align?: TypographyAlign;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  noWrap?: boolean;
  gutterBottom?: boolean;
  paragraph?: boolean;
  children: ReactNode;
  className?: string;
  [key: string]: any; // For any additional props
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  component,
  color = "inherit",
  align = "inherit",
  fontWeight = "bold",
  fontStyle,
  noWrap = false,
  gutterBottom = false,
  paragraph = false,
  children,
  className = "",
  ...props
}) => {
  // Define styles for different variants
  const variantStyles: Record<TypographyVariant, string> = {
    h1: "text-[40px] font-bold tracking-tight sm:text-[40px]",
    h2: "text-[30px] font-bold tracking-tight",
    h3: "text-[25px] font-bold",
    h4: "text-[20px] font-bold",
    h5: "text-[18px] font-bold",
    h6: "text-[16px] font-bold",
    subtitle: "text-lg font-medium text-[14px]",
    // subtitle2: "text-base font-medium",
    body1: "text-base leading-7 text-[14px]",
    body2: "text-sm leading-6 text-[13px]",
    // button: "text-sm font-medium uppercase",
    // caption: "text-xs",
    // overline: "text-xs uppercase tracking-wider",
  };

  // Define color styles
  const colorStyles: Record<TypographyColor, string> = {
    initial: "text-gray-900 dark:text-gray-100",
    inherit: "",
    primary: "text-blue-600 dark:text-blue-400",
    secondary: "text-purple-600 dark:text-purple-400",
    textPrimary: "text-gray-900 dark:text-gray-100",
    textSecondary: "text-gray-600 dark:text-gray-400",
    error: "text-red-600 dark:text-red-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    info: "text-sky-600 dark:text-sky-400",
    success: "text-green-600 dark:text-green-400",
  };

  // Define alignment styles
  const alignStyles: Record<TypographyAlign, string> = {
    inherit: "",
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  // Define font weight styles
  const fontWeightStyles: Record<FontWeight, string> = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  // Define font style
  const fontStyleClasses: Record<FontStyle, string> = {
    normal: "",
    italic: "italic",
  };

  // Default component mapping based on variant
  const defaultComponents: Record<TypographyVariant, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subtitle: "h6",
    // subtitle2: "h6",
    body1: paragraph ? "p" : "span",
    body2: paragraph ? "p" : "span",
    // button: "span",
    // caption: "span",
    // overline: "span",
  };

  // Determine which HTML element to use
  const Component =
    component || (paragraph ? "p" : defaultComponents[variant]) || "span";

  // Build the complete className
  const classes = [
    variantStyles[variant],
    colorStyles[color],
    alignStyles[align],
    fontWeight ? fontWeightStyles[fontWeight] : "",
    fontStyle ? fontStyleClasses[fontStyle] : "",
    noWrap ? "whitespace-nowrap overflow-hidden text-ellipsis" : "",
    gutterBottom ? "mb-4" : "",
    paragraph ? "mb-4" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;

// Export types for use in tests and stories
export type {
  TypographyVariant,
  TypographyColor,
  TypographyAlign,
  FontWeight,
  FontStyle,
  TypographyProps
};
