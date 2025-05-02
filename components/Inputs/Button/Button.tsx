/** @jsxImportSource @emotion/react */
import React, { JSX } from "react";
import { css, CSSObject } from "@emotion/react";

type ButtonProps = {
  variant?: "contained" | "outlined" | "ghost";
  size?: "small" | "medium" | "large";
  icon?: JSX.Element;
  children?: React.ReactNode;
  onClick?: () => void; // Made optional
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  sx?: CSSObject; // Accepts plain style objects like MUI's `sx`
};

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  size = "medium",
  icon,
  children,
  onClick,
  disabled = false,
  type = "button",
  sx = {},
}) => {
  const baseStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 6px;
    text-transform: Capitalize;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    transition: all 0.2s ease-in-out;
    outline: none;
    border: none;
  `;

  const sizeStyles = {
    small: css`
      padding: 5px 10px;
      font-size: 13px;
    `,
    medium: css`
      padding: 9px 26px;
      font-size: 14px;
    `,
    large: css`
      padding: 12px 26px;
      font-size: 16px;
    `,
  };

  const variantStyles = {
    contained: css`
      background-color: var(--primary-500);
      color: var(--primary-text-color);
      &:hover {
        background-color: var(--primary-600);
      }
        &:active {
        background-color: var(--primary-700);
      }
      &:disabled {
        background-color: var(--disabled);
        cursor: not-allowed;
      }
    `,
    outlined: css`
      background: transparent;
      color: var(--seconday-800);
      border: 1px solid rgba(var(--secondary-800-rgb), 0.25);
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      &:disabled {
        color: rgba(var(--secondary-800-rgb), 0.50);
        
      }
    `,
    ghost: css`
      background: transparent;
      color: rgba(var(--seconday-800), 0.55); 
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      &:disabled {
       color: rgba(var(--seconday-800), 0.50);
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
      type={type}
    >
      {icon && <span css={{ marginRight: "8px" }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
