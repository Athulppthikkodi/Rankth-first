/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React, { useState } from "react";

export interface RadioProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  value: string;
  name?: string;
  size?: "small" | "medium" | "large";
  sx?: SerializedStyles;
}

const sizeStyles = {
  small: css({
    "& + span": {  // Radio circle
      width: "16px !important",
      height: "16px !important",
    },
    "& ~ span": {  // Label
      fontSize: "12px",
    },
  }),
  medium: css({
    "& + span": {
      width: "20px !important",
      height: "20px !important",
    },
    "& ~ span": {  // Label
      fontSize: "14px",
    },
  }),
  large: css({
    "& + span": {
      width: "24px !important",
      height: "24px !important",
    },
    "& ~ span": {  // Label
      fontSize: "16px",
    },
  }),
};

const radioContainer = css({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: "8px",
  position: "relative",
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const radioBase = css({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  "&:checked + span": {
    borderColor: "#1976d2",
    "&::after": {
      transform: "scale(1)",
    },
  },
  "&:disabled + span": {
    borderColor: "#ccc",
    cursor: "not-allowed",
  },
//   "&:focus + span": {
//     boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.5)",
//   },
});

const radioCircle = css({
  border: "2px solid #666",
  borderRadius: "50%",
  display: "inline-block",
  position: "relative",
  transition: "all 0.2s ease-in-out",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "50%",
    height: "50%",
    background: "#1976d2",
    borderRadius: "50%",
    top: "25%",
    left: "25%",
    transform: "scale(0)",
    transition: "transform 0.2s ease-in-out",
  },
});

const radioLabel = css({
  userSelect: "none",
  transition: "font-size 0.2s ease-in-out",
});

const Radio: React.FC<RadioProps> = ({
  checked: controlledChecked,
  onChange,
  disabled = false,
  label,
  value,
  name,
  size = "medium",
  sx,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const finalChecked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
    onChange?.(event);
  };

  return (
    <label css={[radioContainer, disabled && css({ opacity: 0.5, cursor: "not-allowed" }), sx]}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={finalChecked}
        onChange={handleChange}
        disabled={disabled}
        css={[radioBase, sizeStyles[size]]}
      />
      <span css={radioCircle} />
      {label && <span css={radioLabel}>{label}</span>}
    </label>
  );
};

export default Radio;
