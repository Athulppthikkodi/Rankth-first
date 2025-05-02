/** @jsxImportSource @emotion/react */
import React, { forwardRef } from "react";
import { css } from "@emotion/react";

type InputStatus = { error?: true; success?: never } | { error?: never; success?: true };

type InputProps = InputStatus & 
Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    type?: string;
    label?: string;
    placeholder?: string;
    value?: string | number | undefined;
    defaultValue?: string | number | undefined;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    statusText?: string;
    size?: "small" | "medium" | "large";
    multiline?: boolean;
    rows?: number;
    sx?: React.CSSProperties;
    ref?: React.RefObject<HTMLInputElement | null>;
    icon?: React.ReactNode;
  };

const sizeStyles = {
  small: {
    padding: "6px 8px",
    fontSize: "12px",
  },
  medium: {
    padding: "10px 12px",
    fontSize: "13px",
  },
  large: {
    padding: "13px 16px",
    fontSize: "14px",
    fontWeight: "700",
  },
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      type = "text",
      label,
      name,
      placeholder = "",
      value,
      defaultValue,
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
      icon,
    },
    ref
  ) => {
    const baseStyles = css({
      display: "block",
      width: fullWidth ? "100%" : "auto",
      border: error ? "2px solid red" : success ? "2px solid green" : "1px solid #ccc",
      borderRadius: "6px",
      outline: "none",
      transition: "border-color 0.2s ease-in-out",
      "::focus": {
        borderColor: error ? "red" : success ? "green" : "#1976d2",
        borderWidth: "1px",
      },
      "::placeholder": {
        color: "#37415199", fontWeight: 400,},
      "::disabled": {
        backgroundColor: "#f5f5f5",
        cursor: "not-allowed",
      },
      ...sizeStyles[size],
      ...sx,
    });

    const inputWrapperStyles = css({
      position: "relative",
      display: "inline-block",
      width: fullWidth ? "100%" : "auto",
    });

    const iconStyles = css({
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: "12px",
      color: "#6B7280",
    });

    const inputStyles = css([
      baseStyles,
      icon ? { paddingLeft: "36px" } : {}
    ]);

    const inputProps = {
      type,
      name,
      placeholder,
      disabled,
      css: inputStyles,
      ...(onChange
        ? { value: value ?? '', onChange }
        : { defaultValue: value ?? defaultValue }
      ),
    };

    return (
      <div>
        {label && (
          <label
            css={{
              display: "block",
              marginBottom: "4px",
              fontWeight: "500",
              fontSize: `${sizeStyles[size].fontSize}`,
            }}
          >
            {label}
          </label>
        )}
        <div css={inputWrapperStyles}>
          {icon && <span css={iconStyles}>{icon}</span>}
          {multiline ? (
            <textarea
              {...inputProps}
              rows={rows}
              ref={ref as React.Ref<HTMLTextAreaElement>}
            />
          ) : (
            <input
              {...inputProps}
              ref={ref as React.Ref<HTMLInputElement>}
            />
          )}
        </div>
        {(error || success) && statusText && (
          <div
            css={{
              color: error ? "red" : "green",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            {statusText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
