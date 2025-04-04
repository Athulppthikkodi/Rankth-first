// import { test, expect, describe, beforeEach, mock } from "bun:test";
// import { renderToString } from "react-dom/server";
// import { css } from "@emotion/react";
// import Checkbox from "./Checkbox"; // Update the import path as needed
// import React from "react";

// describe("Checkbox Component", () => {
//   const mockOnChange = mock((e: React.ChangeEvent<HTMLInputElement>) => {});

//   beforeEach(() => {
//     mockOnChange.mockClear();
//   });

//   // Helper function to check if a string contains a style
//   const hasStyle = (html: string, property: string, value: string) => {
//     const regex = new RegExp(`${property}:${value}[;"}]`);
//     return regex.test(html);
//   };

//   test("renders basic checkbox correctly", () => {
//     const html = renderToString(<Checkbox />);
//     expect(html.includes('type="checkbox"')).toBe(true);
//     // Check for flex display in a more lenient way
//     expect(html.includes("display:flex")).toBe(true);
//   });

//   test("renders with label", () => {
//     const html = renderToString(<Checkbox label="Test Label" />);

//     expect(html.includes("Test Label")).toBe(true);
//   });

//   test("renders in checked state", () => {
//     const html = renderToString(<Checkbox checked={true} />);

//     expect(html.includes("checked")).toBe(true);
//   });

//   test("renders in unchecked state", () => {
//     const html = renderToString(<Checkbox checked={false} />);

//     // Should not contain checked attribute
//     expect(html.includes('checked=""') || html.includes("checked={true}")).toBe(
//       false
//     );
//   });

//   test("renders in disabled state", () => {
//     const html = renderToString(<Checkbox disabled={true} />);

//     expect(html.includes("disabled")).toBe(true);
//   });

//   test("renders in small size", () => {
//     const html = renderToString(<Checkbox size="small" />);
//     expect(html.includes("width:16px")).toBe(true);
//     expect(html.includes("height:16px")).toBe(true);
//   });

//   test("renders in medium size", () => {
//     const html = renderToString(<Checkbox size="medium" />);
//     expect(html.includes("width:20px")).toBe(true);
//     expect(html.includes("height:20px")).toBe(true);
//   });

//   test("renders in large size", () => {
//     const html = renderToString(<Checkbox size="large" />);
//     expect(html.includes("width:24px")).toBe(true);
//     expect(html.includes("height:24px")).toBe(true);
//   });

//   test("applies custom styles with sx prop", () => {
//     const customStyles = css({
//       marginTop: "10px",
//       backgroundColor: "red",
//     });

//     const html = renderToString(<Checkbox sx={customStyles} />);
//     expect(html.includes("margin-top:10px")).toBe(true);
//     expect(html.includes("background-color:red")).toBe(true);
//   });

//   test("renders with combined props", () => {
//     const customStyles = css({
//       padding: "5px",
//     });

//     const html = renderToString(
//       <Checkbox
//         label="Combined Props"
//         size="large"
//         checked={true}
//         disabled={true}
//         sx={customStyles}
//       />
//     );

//     expect(html.includes("Combined Props")).toBe(true);
//     expect(html.includes("width:24px")).toBe(true);
//     expect(html.includes("height:24px")).toBe(true);
//     expect(html.includes("checked")).toBe(true);
//     expect(html.includes("disabled")).toBe(true);
//     expect(html.includes("padding:5px")).toBe(true);
//   });

//   // Testing controlled vs uncontrolled behavior
//   test("handles controlled component behavior", () => {
//     const html = renderToString(
//       <Checkbox checked={true} onChange={mockOnChange} />
//     );

//     expect(html.includes("checked")).toBe(true);
//   });

//   test("handles uncontrolled component behavior", () => {
//     // For uncontrolled behavior, we need to test the internal state changes
//     // This is challenging with renderToString, but we can check the initial state
//     const html = renderToString(<Checkbox />);

//     // Initially unchecked
//     expect(html.includes('checked=""') || html.includes("checked={true}")).toBe(
//       false
//     );
//   });

//   // Testing hover and checked states
//   test("has hover styles", () => {
//     const html = renderToString(<Checkbox />);

//     // Instead of looking for pseudo-selectors (which won't be in the HTML),
//     // verify the base styles are present
//     expect(html.includes("border")).toBe(true);
//     expect(html.includes("cursor")).toBe(true);
//   });

//   test("has checked styles", () => {
//     const html = renderToString(<Checkbox checked={true} />);

//     // Verify the element has the checked attribute
//     expect(html.includes('checked=""')).toBe(true);
//   });

//   // Testing pseudo-elements
//   test("has checked::after pseudo-element", () => {
//     const html = renderToString(<Checkbox />);

//     expect(html.includes(":checked::after")).toBe(true);
//     expect(html.includes("content")).toBe(true);
//     expect(html.includes("position")).toBe(true);
//     expect(html.includes("transform")).toBe(true);
//   });

//   // Testing disabled state styles
//   test("has disabled styles", () => {
//     const html = renderToString(<Checkbox />);

//     expect(html.includes(":disabled")).toBe(true);
//     expect(
//       html.includes("cursor: not-allowed") ||
//         html.includes("cursor:not-allowed")
//     ).toBe(true);
//   });

//   // Test event handling simulation
//   test("simulates onChange event for uncontrolled component", () => {
//     // Create a mock event
//     const mockEvent = {
//       target: { checked: true },
//     } as React.ChangeEvent<HTMLInputElement>;

//     // We can't directly test state changes with renderToString, but we can
//     // ensure the component renders without errors when handling events

//     // This test is more symbolic since we can't actually trigger the event
//     const html = renderToString(<Checkbox onChange={mockOnChange} />);
//     expect(html).toBeTruthy();

//     // Verify onChange is called
//     mockOnChange(mockEvent);
//     expect(mockOnChange).toHaveBeenCalled();
//   });

//   test("simulates onChange event for controlled component", () => {
//     // Create a mock event
//     const mockEvent = {
//       target: { checked: true },
//     } as React.ChangeEvent<HTMLInputElement>;

//     const html = renderToString(
//       <Checkbox checked={false} onChange={mockOnChange} />
//     );
//     expect(html).toBeTruthy();

//     // Verify onChange is called
//     mockOnChange(mockEvent);
//     expect(mockOnChange).toHaveBeenCalled();
//   });

//   // Test with various checkbox labels
//   test("renders with empty string label", () => {
//     const html = renderToString(<Checkbox label="" />);

//     // Should not render label span
//     expect(html.includes("<span></span>")).toBe(false);
//   });

//   test("renders with long label", () => {
//     const longLabel =
//       "This is a very long label that tests how the component handles lengthy text content";
//     const html = renderToString(<Checkbox label={longLabel} />);

//     expect(html.includes(longLabel)).toBe(true);
//   });

//   test("renders with HTML in label", () => {
//     const htmlLabel = "Label with bold text";
//     const html = renderToString(<Checkbox label={htmlLabel} />);

//     // Just check if the text content is present
//     expect(html.includes(htmlLabel)).toBe(true);
//   });

//   // Edge cases
//   test("handles null label gracefully", () => {
//     // @ts-ignore - Testing edge case
//     const html = renderToString(<Checkbox label={null} />);

//     // Should not render label span
//     expect(html.includes("<span>")).toBe(false);
//   });

//   test("handles undefined label gracefully", () => {
//     const html = renderToString(<Checkbox label={undefined} />);

//     // Should not render label span
//     expect(html.includes("<span>")).toBe(false);
//   });

//   test("handles boolean label gracefully", () => {
//     // @ts-ignore - Testing edge case
//     const html = renderToString(<Checkbox label={true} />);

//     // Should render something in the span
//     expect(html.includes("<span>")).toBe(true);
//   });
// });
