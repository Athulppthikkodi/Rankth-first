/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";
import Avatar from "../Avatar/Avatar";

type AvatarGroupProps = {
  children: React.ReactNode;
  max?: number;
  spacing?: number;
  sx?: CSSObject;
} & React.HTMLAttributes<HTMLDivElement>;

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  spacing = -8,
  sx,
  ...props
}) => {
  const avatars = React.Children.toArray(children).slice(
    0,
    max ? max : undefined
  );

  const extraCount = React.Children.count(children) - (max || 0);

  const groupStyles = css`
    display: flex;
    align-items: flex-start;
    ${sx && css(sx)};
  `;

  return (
    <div css={groupStyles} {...props}>
      {avatars.map((child, index) => (
        <div
          key={index}
          css={css`
            margin-left: ${index > 0 ? `${spacing}px` : 0};
          `}
        >
          {child}
        </div>
      ))}
      {extraCount > 0 && (
        <Avatar
          size="small"
          fallback={`+${extraCount}`}
          sx={{
            marginLeft: spacing,
            backgroundColor: "#172935",
            fontSize: 12,
            fontWeight: "400",
            color: "#FFFFFF",
            border: "2px solid #fff"
          }}
        />
      )}
    </div>
  );
};

export default AvatarGroup;
