/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  label?: string;
  size?: "small" | "medium" | "large";
  sx?: SerializedStyles;
};

const sizeStyles = {
  small: css({
    width: "16px",
    height: "16px",
  }),
  medium: css({
    width: "20px",
    height: "20px",
  }),
  large: css({
    width: "24px",
    height: "24px",
  }),
};

const checkboxContainer = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
});

const checkboxBase = css({
  appearance: "none",
  border: "2px solid #666",
  borderRadius: "50px",
  transition: "all 0.2s ease-in-out",
  position: "relative",
  cursor: "pointer",
  margin: 0,
  ":checked": {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
  },
  ":checked::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "5px",
    height: "10px",
    border: "solid white",
    borderWidth: "0 2px 2px 0",
    transform: "translate(-50%, -50%)",
    backgroundColor: "red",
  },
  ":disabled": {
    borderColor: "#ccc",
    cursor: "not-allowed",
    backgroundColor: "#f0f0f0",
  },
  ":hover:not(:disabled)": {
    borderColor: "#1976d2",
  },
});

const Checkbox: React.FC<CheckboxProps> = ({
    checked: controlledChecked,
    onChange,
    disabled = false,
    label,
    size = "medium",
    sx = {},
  }) => {
    // Internal state for uncontrolled behavior
    const [internalChecked, setInternalChecked] = useState(false);
  
    // Determine if component is controlled
    const isControlled = controlledChecked !== undefined;
    const finalChecked = isControlled ? controlledChecked : internalChecked;
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Update internal state only if uncontrolled
      if (!isControlled) {
        setInternalChecked(event.target.checked);
      }
      
      // Always call onChange if provided
      onChange?.(event);
    };
  
    return (
      <label css={[checkboxContainer, sx]}>
        <input
          type="checkbox"
          checked={finalChecked}
          onChange={handleChange}
          disabled={disabled}
          css={[checkboxBase, sizeStyles[size]]}
        />
        {label && <span>{label}</span>}
      </label>
    );
  };

export default Checkbox;
