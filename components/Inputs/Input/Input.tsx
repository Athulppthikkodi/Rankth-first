/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

type InputStatus = { error?: true; success?: never } | { error?: never; success?: true };

type InputProps = InputStatus & 
Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &{
    type?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    statusText?: string;
    size?: "small" | "medium" | "large";
    multiline?: boolean;
    rows?: number;
    sx?: React.CSSProperties;
  };

const sizeStyles = {
  small: {
    padding: "6px 8px",
    fontSize: "12px",
  },
  medium: {
    padding: "10px 12px",
    fontSize: "16px",
  },
  large: {
    padding: "14px 16px",
    fontSize: "18px",
  },
};

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
  disabled = false,
  fullWidth = false,
  error,
  success,
  statusText = "",
  size = "medium",
  multiline = false,
  rows = 3,
  sx = {},
}) => {
  const baseStyles = css({
    display: "block",
    width: fullWidth ? "100%" : "auto",
    border: error ? "2px solid red" : success ? "2px solid green" : "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.2s ease-in-out",
    ":focus": {
      borderColor: error ? "red" : success ? "green" : "#1976d2",
      borderWidth: "4px",
    },
    ":disabled": {
      backgroundColor: "#f5f5f5",
      cursor: "not-allowed",
    },
    ...sizeStyles[size],
    ...sx,
  });

  return (
    <div>
      {label && <label css={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: `${sizeStyles[size].fontSize}` }}>{label}</label>}
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          css={baseStyles}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          css={baseStyles}
        />
      )}
      {(error || success) && statusText && (
        <div css={{ color: error ? "red" : "green", fontSize: "12px", marginTop: "4px" }}>{statusText}</div>
      )}
    </div>
  );
};

export default Input;
