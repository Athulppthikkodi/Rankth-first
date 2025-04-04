/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { CSSProperties } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  color?: "primary" | "secondary" | "error";
  size?: "small" | "medium" | "large";
  sx?: CSSProperties; // ✅ Only allow plain CSS
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  color = "primary",
  size = "medium",
  sx = {}, // Default to an empty object
}) => {
  return (
    <label
      css={css([
        styles.switch,
        styles.size[size],
        checked && styles.checked[color],
        disabled && styles.disabled,
        css(sx as CSSObject), // ✅ Fix: Convert sx to Emotion-compatible style
      ])}
    >
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <span css={styles.slider}></span>
    </label>
  );
};

const styles = {
  switch: css`
    position: relative;
    display: inline-block;
    width: 42px;
    height: 24px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  `,
  slider: css`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 24px;

    &::before {
      content: "";
      position: absolute;
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  `,
  checked: {
    primary: css`
      & > span {
        background-color: #4caf50;
      }
      & > span::before {
        transform: translateX(18px);
      }
    `,
    secondary: css`
      & > span {
        background-color: #1976d2;
      }
      & > span::before {
        transform: translateX(18px);
      }
    `,
    error: css`
      & > span {
        background-color: #d32f2f;
      }
      & > span::before {
        transform: translateX(18px);
      }
    `,
  },
  size: {
    small: css`
      width: 32px;
      height: 18px;
      & > span::before {
        height: 12px;
        width: 12px;
      }
    `,
    medium: css`
      width: 42px;
      height: 24px;
    `,
    large: css`
      width: 52px;
      height: 30px;
      & > span::before {
        height: 22px;
        width: 22px;
      }
    `,
  },
  disabled: css`
    cursor: not-allowed;
    opacity: 0.5;
  `,
};

export default Switch;
