import React, { useState, useEffect, useRef} from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  variant?: "outlined" | "filled";
  selectSize?: "small" | "medium" | "large";
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  multiple?: boolean;
  value?: string | string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  sx?: React.CSSProperties;
  name?: string;
  id?: string;
  options: SelectOption[];
  showCheckmark?: boolean; // NEW PROP
}

const Select: React.FC<SelectProps> = ({
  label,
  variant = "outlined",
  selectSize = "medium",
  fullWidth = false,
  error = false,
  helperText,
  required = false,
  multiple = false,
  value: propValue,
  onChange,
  onValueChange,
  disabled = false,
  placeholder = "Select...",
  className,
  sx,
  name,
  id,
  options = [],
  showCheckmark = false, // Default to false
}) => {
  // State for selected options
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    multiple
      ? Array.isArray(propValue)
        ? propValue
        : propValue
        ? [propValue.toString()]
        : []
      : propValue
      ? [propValue.toString()]
      : []
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update state if prop value changes externally
  useEffect(() => {
    if (propValue !== undefined) {
      setSelectedOptions(
        multiple
          ? Array.isArray(propValue)
            ? propValue
            : propValue
            ? [propValue.toString()]
            : []
          : propValue
          ? [propValue.toString()]
          : []
      );
    }
  }, [propValue, multiple]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    let newSelectedOptions: string[];

    if (multiple) {
      if (selectedOptions.includes(optionValue)) {
        // Remove if already selected
        newSelectedOptions = selectedOptions.filter(
          (val) => val !== optionValue
        );
      } else {
        // Add if not selected
        newSelectedOptions = [...selectedOptions, optionValue];
      }
    } else {
      // Single select: replace value and close dropdown
      newSelectedOptions = [optionValue];
      setIsOpen(false);
    }

    setSelectedOptions(newSelectedOptions);

    // Create a synthetic event for onChange
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: multiple ? newSelectedOptions : optionValue,
        },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }

    if (onValueChange) {
      onValueChange(multiple ? newSelectedOptions : optionValue);
    }
  };

  // Find label for a given value
  const getOptionLabel = (value: string): string => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  // Render chips for multiple selections
  const renderSelectedChips = () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        marginBottom: 4,
      }}
    >
      {selectedOptions.map((option) => (
        <div
          key={option}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 8px",
            backgroundColor: "#e0f7fa",
            borderRadius: 16,
            marginRight: 4,
            fontSize: 14,
          }}
        >
          {getOptionLabel(option)}
          <span
            style={{
              marginLeft: 4,
              color: "#e53935",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleOptionClick(option);
            }}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  );
  // Updated render for selected values
  const renderSelectedValue = () => {
    if (multiple) {
      return selectedOptions.length === 0 ? (
        <span style={{ color: "#757575" }}>{placeholder}</span>
      ) : (
        renderSelectedChips()
      );
    } else {
      return selectedOptions.length > 0 ? (
        <span>{getOptionLabel(selectedOptions[0])}</span>
      ) : (
        <span style={{ color: "#757575" }}>{placeholder}</span>
      );
    }
  };

  const baseStyles = {
    padding:
      selectSize === "small"
        ? "4px 8px"
        : selectSize === "large"
        ? "12px 16px"
        : "8px 12px",
    borderRadius: "6px",
    outline: "none",
    width: fullWidth ? "100%" : "auto",
    fontSize: selectSize === "small" ? 14 : selectSize === "large" ? 18 : 16,
    backgroundColor: disabled ? "#f0f0f0" : "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    position: "relative" as const,
    minHeight:
      selectSize === "small"
        ? "28px"
        : selectSize === "large"
        ? "49px"
        : "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const variantStyles =
    variant === "filled"
      ? {
          backgroundColor: disabled ? "#e0e0e0" : "#f5f5f5",
          border: "none",
        }
      : {
          border: `1px solid ${error ? "#e53935" : "#ccc"}`,
          backgroundColor: disabled ? "#f0f0f0" : "#fff",
        };

  const dropdownStyles = {
    position: "absolute" as const,
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 10,
    maxHeight: "200px",
    overflowY: "auto" as const,
    marginTop: 4,
  };

  const optionStyles = {
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: selectSize === "small" ? 13 : selectSize === "large" ? 16 : 14,
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: fullWidth ? "100%" : "auto",
        position: "relative",
      }}
      ref={dropdownRef}
    >
      {label && (
        <label
          style={{
            fontSize:
              selectSize === "small" ? 12 : selectSize === "large" ? 16 : 14,
            fontWeight: 500,
            color: error ? "#e53935" : "#000",
            marginBottom: 4,
            lineHeight: "21px",
          }}
          htmlFor={id}
        >
          {label}
          {required && (
            <span style={{ color: "#e53935", marginLeft: 4 }}>*</span>
          )}
        </label>
      )}

      {/* Custom Select UI */}
      <div
        style={{ ...baseStyles, ...variantStyles, ...sx }}
        className={cn(className)}
        onClick={handleToggleDropdown}
      >
        {renderSelectedValue()}

        <div style={{ marginLeft: 8 }}><ChevronDown size={20} strokeWidth={1} /></div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div style={dropdownStyles}>
          {options.map((option) => {
            const isSelected = selectedOptions.includes(option.value);
            return (
              <div
                key={option.value}
                style={{
                  
                  backgroundColor: isSelected ? "#e0f7fa" : "transparent",
                  ...optionStyles,
                }}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
                {showCheckmark && isSelected && (
                  <span style={{ marginLeft: 8, color: "#00BC74" }}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && helperText && (
        <span style={{ color: "#e53935", fontSize: 12, marginTop: 4 }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Select;
export type { SelectProps };
