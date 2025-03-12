/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";

type GridSize = {
  cols?: number;
  rows?: number;
};

type GridBreakpoints = {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  rowSpacing?: number;
  columnSpacing?: number;
  cols?: number;
  rows?: number;
  size?: GridBreakpoints;
  sx?: CSSObject;
}

const Grid: React.FC<GridProps> = ({
  container = false,
  item = false,
  spacing = 0,
  rowSpacing,
  columnSpacing,
  cols,
  rows,
  size,
  sx,
  children,
  ...props
}) => {
  const gridStyles = css`
    ${container && `
      display: grid;
      ${cols ? `grid-template-columns: repeat(${cols}, minmax(0, 1fr));` : ""}
      ${rows ? `grid-template-rows: repeat(${rows}, minmax(0, 1fr));` : ""}
      ${spacing ? `gap: ${spacing * 8}px;` : ""}
      ${rowSpacing ? `row-gap: ${rowSpacing * 8}px;` : ""}
      ${columnSpacing ? `column-gap: ${columnSpacing * 8}px;` : ""}
    `}

    ${item && `
      display: block;
    `}

    /* Responsive grid template columns */
    ${size?.xs && `
      @media (max-width: 640px) {
        ${size.xs.cols ? `grid-template-columns: repeat(${size.xs.cols}, minmax(0, 1fr));` : ""}
        ${size.xs.rows ? `grid-template-rows: repeat(${size.xs.rows}, minmax(0, 1fr));` : ""}
      }
    `}

    ${size?.sm && `
      @media (min-width: 641px) {
        ${size.sm.cols ? `grid-template-columns: repeat(${size.sm.cols}, minmax(0, 1fr));` : ""}
        ${size.sm.rows ? `grid-template-rows: repeat(${size.sm.rows}, minmax(0, 1fr));` : ""}
      }
    `}

    ${size?.md && `
      @media (min-width: 769px) {
        ${size.md.cols ? `grid-template-columns: repeat(${size.md.cols}, minmax(0, 1fr));` : ""}
        ${size.md.rows ? `grid-template-rows: repeat(${size.md.rows}, minmax(0, 1fr));` : ""}
      }
    `}

    ${size?.lg && `
      @media (min-width: 1025px) {
        ${size.lg.cols ? `grid-template-columns: repeat(${size.lg.cols}, minmax(0, 1fr));` : ""}
        ${size.lg.rows ? `grid-template-rows: repeat(${size.lg.rows}, minmax(0, 1fr));` : ""}
      }
    `}

    ${size?.xl && `
      @media (min-width: 1281px) {
        ${size.xl.cols ? `grid-template-columns: repeat(${size.xl.cols}, minmax(0, 1fr));` : ""}
        ${size.xl.rows ? `grid-template-rows: repeat(${size.xl.rows}, minmax(0, 1fr));` : ""}
      }
    `}

    /* Apply custom styles */
    ${typeof sx === 'string' ? sx : ''}
    ${sx && typeof sx === 'object' && !('styles' in sx) ? css(sx) : ''}
    ${sx && typeof sx === 'object' && 'styles' in sx ? sx : ''}
  `;

  return (
    <div css={gridStyles} {...props}>
      {children}
    </div>
  );
};

export type { GridProps, GridSize, GridBreakpoints };
export default Grid;
