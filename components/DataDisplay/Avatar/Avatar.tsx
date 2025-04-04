/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";

type AvatarProps = {
  src?: { src: string };
  alt?: string;
  size?: "small" | "medium" | "large";
  variant?: "circular" | "rounded" | "square";
  fallback?: string;
  sx?: CSSObject;
} & React.HTMLAttributes<HTMLDivElement>;

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "medium",
  variant = "circular",
  fallback,
  sx,
  ...props
}) => {
  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const avatarStyles = css`
    width: ${sizes[size]}px;
    height: ${sizes[size]}px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: ${sizes[size] / 2.5}px;
    font-weight: 500;
    color: #fff;
    background-color: #e4e4e7;
    overflow: hidden;
    ${variant === "circular" && "border-radius: 50%;"}
    ${variant === "rounded" && "border-radius: 12px;"}
    ${variant === "square" && "border-radius: 4px;"}
    ${sx && css(sx)};
  `;

  return (
    <div css={avatarStyles} {...props}>
      {src ? (
        <img
          src={src.src}
          alt={alt || "Avatar"}
          css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
        />
      ) : (
        fallback || "A"
      )}
    </div>
  );
};

export default Avatar;
