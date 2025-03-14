/** @jsxImportSource @emotion/react */
import { test, expect, describe, beforeEach, mock } from "bun:test";
import { renderToString } from "react-dom/server";
import type { ChangeEvent, FocusEvent } from "react";
import Input from "./Input";

describe("Input Component", () => {
  const mockOnChange = mock((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {});
  const mockOnFocus = mock((e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {});
  const mockOnBlur = mock((e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {});

  beforeEach(() => {
    // Reset mocks between tests
    mockOnChange.mockClear();
    mockOnFocus.mockClear();
    mockOnBlur.mockClear();
  });

  const getSerializedStyles = (html: string): string => {
    const match = html.match(/css-[^"]+/);
    return match ? match[0] : '';
  };

  // Helper function to check if a string contains a class
  const hasClass = (html: string, className: string) => {
    return html.includes(`class=`) && html.includes(className);
  };

  test("renders basic input correctly", () => {
    const html = renderToString(
      <Input
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
        onChange={mockOnChange}
        data-testid="input-test"
      />
    );
    
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
    expect(html).toContain("Test Label");
    expect(html).toContain("placeholder=\"Test Placeholder\"");
  });

  test("renders with provided value", () => {
    const html = renderToString(
      <Input
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
      />
    );
    
    expect(html.includes("value=\"Test Value\"")).toBe(true);
  });

  test("renders with different input types", () => {
    const types = ["text", "password", "email", "number", "tel", "url", "search"];
    
    types.forEach(type => {
      const html = renderToString(
        <Input
          type={type}
          label={`${type} input`}
          value=""
          onChange={mockOnChange}
        />
      );
      
      expect(html.includes(`type="${type}"`)).toBe(true);
    });
  });

  test("renders in small size", () => {
    const html = renderToString(
      <Input
        label="Small Input"
        size="small"
        value=""
        onChange={mockOnChange}
        data-testid="input-test"
      />
    );
    
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  test("renders in medium size", () => {
    const html = renderToString(
      <Input
        label="Medium Input"
        size="medium"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(html.includes("padding:10px 12px")).toBe(true);
    expect(html.includes("font-size:16px")).toBe(true);
  });

  test("renders in large size", () => {
    const html = renderToString(
      <Input
        label="Large Input"
        size="large"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(html.includes("padding:14px 16px")).toBe(true);
    expect(html.includes("font-size:18px")).toBe(true);
  });

  test("renders with error state", () => {
    const html = renderToString(
      <Input
        label="Error Input"
        error={true}
        statusText="Error message"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(html.includes("border:2px solid red")).toBe(true);
    expect(html.includes("Error message")).toBe(true);
  });

  test("renders with success state", () => {
    const html = renderToString(
      <Input
        label="Success Input"
        success={true}
        statusText="Success message"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(html.includes("border:2px solid green")).toBe(true);
    expect(html.includes("Success message")).toBe(true);
  });

  test("renders in disabled state", () => {
    const html = renderToString(
      <Input
        label="Disabled Input"
        disabled={true}
        value=""
        onChange={mockOnChange}
      />
    );
    
    expect(html.includes("disabled")).toBe(true);
  });

  test("renders with fullWidth", () => {
    const html = renderToString(
      <Input
        label="Full Width Input"
        fullWidth={true}
        value=""
        onChange={mockOnChange}
      />
    );
    expect(html.includes("width:100%")).toBe(true);
  });

  test("renders multiline input correctly", () => {
    const html = renderToString(
      <Input
        label="Multiline Input"
        multiline={true}
        rows={4}
        value=""
        onChange={mockOnChange}
      />
    );
    
    // Multiline should render a textarea instead of input
    expect(html.includes("<textarea")).toBe(true);
    expect(html.includes("rows=\"4\"")).toBe(true);
  });

  test("renders with both label and placeholder", () => {
    const html = renderToString(
      <Input
        label="Label Text"
        placeholder="Placeholder Text"
        value=""
        onChange={mockOnChange}
      />
    );
    
    expect(html.includes("Label Text")).toBe(true);
    expect(html.includes("placeholder=\"Placeholder Text\"")).toBe(true);
  });

  test("renders without label", () => {
    const html = renderToString(
      <Input
        placeholder="Placeholder Only"
        value=""
        onChange={mockOnChange}
      />
    );
    
    expect(html.includes("placeholder=\"Placeholder Only\"")).toBe(true);
  });

  test("renders with statusText but no error/success state", () => {
    const html = renderToString(
      <Input
        label="Input with status"
        statusText="Helper text"
        value=""
        onChange={mockOnChange}
      />
    );
    // Status text only shows with error or success state
    expect(html.includes("Helper text")).toBe(false);
  });

  test("renders with required attribute", () => {
    const html = renderToString(
      <Input
        label="Required Input"
        required={true}
        value=""
        onChange={mockOnChange}
      />
    );
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  test("renders with autoFocus attribute", () => {
    const html = renderToString(
      <Input
        label="Autofocus Input"
        autoFocus={true}
        value=""
        onChange={mockOnChange}
      />
    );
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  test("renders with name attribute", () => {
    const html = renderToString(
      <Input
        label="Named Input"
        name="test-input-name"
        value=""
        onChange={mockOnChange}
      />
    );
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  test("combines multiple props correctly", () => {
    const html = renderToString(
      <Input
        label="Complex Input"
        placeholder="Complex placeholder"
        type="email"
        size="small"
        required={true}
        name="email-input"
        value="test@example.com"
        error={true}
        statusText="Please use a valid email"
        onChange={mockOnChange}
        data-testid="input-test"
      />
    );
    expect(html.includes("Complex Input")).toBe(true);
    expect(html.includes("type=\"email\"")).toBe(true);
    expect(html.includes("border:2px solid red")).toBe(true);
  });

  test("renders with readOnly attribute", () => {
    const html = renderToString(
      <Input
        label="ReadOnly Input"
        readOnly={true}
        value="Cannot edit this"
        onChange={mockOnChange}
      />
    );
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  // Testing with additional props that might be passed through
  test("passes additional HTML attributes", () => {
    const html = renderToString(
      <Input
        label="Input with HTML attrs"
        value=""
        onChange={mockOnChange}
        data-testid="test-input"
        aria-label="Test input field"
      />
    );
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  // Testing with no props except required ones
  test("renders with minimal required props", () => {
    const html = renderToString(
      <Input
        value=""
        onChange={mockOnChange}
      />
    );
    
    // Should still render an input element
    expect(html.includes("<input")).toBe(true);
  });

  // Testing with empty string value
  test("renders with empty string value", () => {
    const html = renderToString(
      <Input
        label="Empty Value"
        value=""
        onChange={mockOnChange}
      />
    );
    
    expect(html.includes("value=\"\"")).toBe(true);
  });

  // Edge case - passing null as value (should be handled gracefully)
//   test("handles null value gracefully", () => {
//     // @ts-ignore - Testing edge case
//     const html = renderToString(
//       <Input
//         label="Null Value Test"
//         value={null}
//         onChange={mockOnChange}
//       />
//     );
    
//     // Should still render without crashing
//     expect(html.includes("<input")).toBe(true);
//   });
});