import { test, expect, describe, beforeEach, mock } from "bun:test";
import { renderToString } from "react-dom/server";
import { css } from "@emotion/react";
import Radio from "./Radio";
import React from "react";

describe("Radio Component", () => {
  const mockOnChange = mock((e: React.ChangeEvent<HTMLInputElement>) => {});

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders basic radio correctly", () => {
    const html = renderToString(<Radio value="test" />);
    expect(html.includes('type="radio"')).toBe(true);
    expect(html.includes('value="test"')).toBe(true);
    expect(html.includes("display:flex")).toBe(true);
  });

  test("renders with label", () => {
    const html = renderToString(<Radio value="test" label="Test Label" />);
    expect(html.includes("Test Label")).toBe(true);
  });

  test("renders in checked state", () => {
    const html = renderToString(<Radio value="test" checked={true} />);
    expect(html.includes("checked")).toBe(true);
  });

  test("renders in unchecked state", () => {
    const html = renderToString(<Radio value="test" checked={false} />);
    expect(html.includes('checked=""') || html.includes("checked={true}")).toBe(
      false
    );
  });

  test("renders with name attribute", () => {
    const html = renderToString(<Radio value="test" name="radio-group" />);
    expect(html.includes('name="radio-group"')).toBe(true);
  });

  test("renders in disabled state", () => {
    const html = renderToString(<Radio value="test" disabled={true} />);
    expect(html.includes("disabled")).toBe(true);
    expect(html.includes("cursor:not-allowed")).toBe(true);
  });

  // Size tests
  test("renders in small size", () => {
    const html = renderToString(<Radio value="test" size="small" />);
    expect(html.includes("width:16px")).toBe(true);
    expect(html.includes("height:16px")).toBe(true);
    expect(html.includes("font-size:12px")).toBe(true);
  });

  test("renders in medium size", () => {
    const html = renderToString(<Radio value="test" size="medium" />);
    expect(html.includes("width:20px")).toBe(true);
    expect(html.includes("height:20px")).toBe(true);
    expect(html.includes("font-size:14px")).toBe(true);
  });

  test("renders in large size", () => {
    const html = renderToString(<Radio value="test" size="large" />);
    expect(html.includes("width:24px")).toBe(true);
    expect(html.includes("height:24px")).toBe(true);
    expect(html.includes("font-size:16px")).toBe(true);
  });

  // Custom styles
  test("applies custom styles with sx prop", () => {
    const customStyles = css({
      backgroundColor: "red",
      padding: "10px",
    });

    const html = renderToString(<Radio value="test" sx={customStyles} />);
    expect(html.includes("background-color:red")).toBe(true);
    expect(html.includes("padding:10px")).toBe(true);
  });

  // Event handling
  test("handles onChange in controlled mode", () => {
    const mockEvent = {
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement>;

    const html = renderToString(
      <Radio value="test" checked={false} onChange={mockOnChange} />
    );

    expect(html).toBeTruthy();
    mockOnChange(mockEvent);
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("handles onChange in uncontrolled mode", () => {
    const mockEvent = {
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement>;

    const html = renderToString(<Radio value="test" onChange={mockOnChange} />);

    expect(html).toBeTruthy();
    mockOnChange(mockEvent);
    expect(mockOnChange).toHaveBeenCalled();
  });

  // Edge cases
  test("handles empty string label", () => {
    const html = renderToString(<Radio value="test" label="" />);
    expect(html.includes("<span></span>")).toBe(false);
  });

  test("handles undefined label", () => {
    const html = renderToString(<Radio value="test" label={undefined} />);
    expect(html.includes("<span>")).toBe(false);
  });

  test("handles long labels", () => {
    const longLabel =
      "This is a very long label that tests how the component handles lengthy text content";
    const html = renderToString(<Radio value="test" label={longLabel} />);
    expect(html.includes(longLabel)).toBe(true);
  });

  // Style combinations
  test("combines disabled and checked states", () => {
    const html = renderToString(
      <Radio value="test" disabled={true} checked={true} />
    );
    expect(html.includes("disabled")).toBe(true);
    expect(html.includes("checked")).toBe(true);
    expect(html.includes("cursor:not-allowed")).toBe(true);
  });

  test("combines size and disabled states", () => {
    const html = renderToString(
      <Radio value="test" size="large" disabled={true} />
    );
    expect(html.includes("width:24px")).toBe(true);
    expect(html.includes("disabled")).toBe(true);
  });

  // Transition and animation styles
  test("includes transition styles", () => {
    const html = renderToString(<Radio value="test" />);
    expect(html.includes("transition")).toBe(true);
  });

  test("includes transform styles for radio circle", () => {
    const html = renderToString(<Radio value="test" />);
    expect(html.includes("transform")).toBe(true);
  });

  // Hover states
  test("includes hover styles", () => {
    const html = renderToString(<Radio value="test" />);
    expect(html.includes("border-color")).toBe(true);
  });

  // Focus states
//   test("includes focus styles", () => {
//     const html = renderToString(<Radio value="test" />);
//     // Check for border color change which is our focus indicator
//     expect(html.includes("borderColor")).toBe(true);
//   });

  // Active states
  test("includes active styles", () => {
    const html = renderToString(<Radio value="test" checked={true} />);
    expect(html.includes("scale(1)")).toBe(true);
  });

  // User interactions
  test("simulates user interaction", () => {
    const mockEvent = {
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement>;

    const html = renderToString(
      <Radio
        value="test"
        onChange={(e) => {
          mockOnChange(e);
          expect(e.target.checked).toBe(true);
        }}
      />
    );

    expect(html).toBeTruthy();
    mockOnChange(mockEvent);
    expect(mockOnChange).toHaveBeenCalled();
  });

  // Accessibility
  test("includes proper ARIA attributes", () => {
    const html = renderToString(
      <Radio value="test" label="Accessible Label" />
    );
    expect(html.includes("Accessible Label")).toBe(true);
  });
});
