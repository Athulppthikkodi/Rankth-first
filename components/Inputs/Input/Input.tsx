/** @jsxImportSource @emotion/react */
import React, { forwardRef, useEffect } from "react";
import { css } from "@emotion/react";

type InputStatus = { error?: true; success?: never } | { error?: never; success?: true };

type InputProps = InputStatus & 
Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    type?: string;
    label?: string;
    placeholder?: string;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    statusText?: string;
    size?: "small" | "medium" | "large";
    multiline?: boolean;
    rows?: number;
    sx?: React.CSSProperties;
    ref?: React.RefObject<HTMLInputElement | null>;
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
    },
    ref
  ) => {
    useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
        if (value != null && !onChange) {
          console.warn(
            'You provided a `value` prop to a form field without an `onChange` handler. ' +
            'This will render a read-only field. ' +
            'If the field should be mutable use `defaultValue`. ' +
            'Otherwise, set either `onChange` or `readOnly`.'
          );
        }
      }
    }, [value, onChange]);

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

    const inputProps = {
      type,
      placeholder,
      disabled,
      css: baseStyles,
      ref,
      ...(onChange ? { value, onChange } : { defaultValue: value ?? defaultValue }),
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
