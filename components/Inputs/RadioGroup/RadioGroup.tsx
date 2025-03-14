/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode, useState } from "react";

interface RadioGroupProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  children: ReactNode;
  direction?: "row" | "column";
  sx?: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value: controlledValue,
  onChange,
  name,
  children,
  direction = "column",
  sx = {},
}) => {
  const [internalValue, setInternalValue] = useState("");

  const isControlled = controlledValue !== undefined;
  const finalValue = isControlled ? controlledValue : internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  return (
    <div css={[groupContainer(direction), sx]}>
      {children &&
        // Inject name, value, and onChange into each Radio component
        (Array.isArray(children) ? children : [children]).map((child) =>
          child && typeof child === "object" && "props" in child
            ? {
                ...child,
                props: {
                  ...child.props,
                  name,
                  checked: finalValue === child.props.value,
                  onChange: handleChange,
                },
              }
            : child
        )}
    </div>
  );
};

// Styles
const groupContainer = (direction: "row" | "column") => css`
  display: flex;
  flex-direction: ${direction};
  gap: 8px;
`;

export default RadioGroup;
