/** @jsxImportSource @emotion/react */
import React, { JSX } from "react";
import { css, CSSObject } from "@emotion/react";

type ButtonProps = {
  variant?: "contained" | "outlined" | "ghost";
  size?: "small" | "medium" | "large";
  icon?: JSX.Element;
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  sx?: CSSObject // Accepts plain style objects like MUI's `sx`
};

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  size = "medium",
  icon,
  children,
  onClick,
  disabled = false,
  sx = {},
}) => {
  const baseStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 4px;
    text-transform: uppercase;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    transition: all 0.2s ease-in-out;
    outline: none;
    border: none;
    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    }
  `;

  const sizeStyles = {
    small: css`
      padding: 4px 10px;
      font-size: 12px;
    `,
    medium: css`
      padding: 6px 16px;
      font-size: 14px;
    `,
    large: css`
      padding: 8px 20px;
      font-size: 16px;
    `,
  };

  const variantStyles = {
    contained: css`
      background-color: #1976d2;
      color: #fff;
      &:hover {
        background-color: #1565c0;
      }
      &:disabled {
        background-color: #b0bec5;
        cursor: not-allowed;
      }
    `,
    outlined: css`
      background: transparent;
      color: #1976d2;
      border: 2px solid #1976d2;
      &:hover {
        background: rgba(25, 118, 210, 0.1);
      }
      &:disabled {
        color: #b0bec5;
        border-color: #b0bec5;
      }
    `,
    ghost: css`
      background: transparent;
      color: #1976d2;
      &:hover {
        background: rgba(25, 118, 210, 0.1);
      }
      &:disabled {
        color: #b0bec5;
      }
    `,
  };

  // Convert `sx` object to Emotion CSS
  const customStyles = css(sx);

  return (
    <button
      css={[baseStyles, sizeStyles[size], variantStyles[variant], customStyles]} // Merge all styles
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span css={{ marginRight: "8px" }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
