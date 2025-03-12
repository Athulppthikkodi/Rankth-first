/** @jsxImportSource @emotion/react */
import React, { ElementType } from "react";
import { css, CSSObject } from "@emotion/react";

type BoxBaseProps = {
  component?: ElementType;
  display?: React.CSSProperties["display"];
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  margin?: React.CSSProperties["margin"];
  padding?: React.CSSProperties["padding"];
  bgcolor?: React.CSSProperties["backgroundColor"];
  border?: React.CSSProperties["border"];
  borderRadius?: React.CSSProperties["borderRadius"];
  boxShadow?: React.CSSProperties["boxShadow"];
  sx?: CSSObject;
  children?: React.ReactNode;
}

type BoxProps<T extends ElementType> = BoxBaseProps & 
  Omit<React.ComponentPropsWithoutRef<T>, keyof BoxBaseProps>;

const Box = <T extends ElementType = "div">({
  component,
  display,
  width,
  height,
  margin,
  padding,
  bgcolor,
  border,
  borderRadius,
  boxShadow,
  sx = {},
  children,
  ...props
}: BoxProps<T>) => {
  const Component = component || "div";
  
  const baseStyles = css({
    display,
    width,
    height,
    margin,
    padding,
    backgroundColor: bgcolor,
    border,
    borderRadius,
    boxShadow,
  });

  const customStyles = css(sx);

  return (
    <Component 
      css={[baseStyles, customStyles]} 
      {...props}
    >
      {children}
    </Component>
  );
};

export type { BoxProps };
export default Box;
