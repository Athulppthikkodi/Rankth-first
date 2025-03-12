import { test, expect, describe } from "bun:test";
import { renderToString } from "react-dom/server";
import Container from "./Container"; // Update the import path as needed
import React from "react";

// Import or redefine the MaxWidth type
type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | "fullWidth";

describe("Container Component", () => {
  // Helper function to check if a string has CSS properties
  const hasCssProperty = (html: string, property: string, value: string) => {
    const regex = new RegExp(`${property}:${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
    return regex.test(html);
  };

  test("renders children correctly", () => {
    const html = renderToString(
      <Container>
        <p>Test Content</p>
        <div>Child Element</div>
      </Container>
    );
    
    expect(html.includes("Test Content")).toBe(true);
    expect(html.includes("Child Element")).toBe(true);
  });

  test("applies default props correctly", () => {
    const html = renderToString(
      <Container>
        <div>Test</div>
      </Container>
    );
    
    expect(hasCssProperty(html, "width", "100%")).toBe(true);
    expect(hasCssProperty(html, "margin", "0 auto")).toBe(true);
    expect(hasCssProperty(html, "max-width", "1024px")).toBe(true); // Default 'lg'
    expect(hasCssProperty(html, "padding-left", "16px")).toBe(true);
    expect(hasCssProperty(html, "padding-right", "16px")).toBe(true);
  });

  // Test each maxWidth option
  const maxWidthOptions: Array<[MaxWidth, string]> = [
    ["xs", "444px"],
    ["sm", "600px"],
    ["md", "768px"],
    ["lg", "1024px"],
    ["xl", "1280px"],
    ["fullWidth", "100%"]
  ];
  
  maxWidthOptions.forEach(([size, value]) => {
    test(`applies maxWidth="${size}" correctly`, () => {
      const html = renderToString(
        <Container maxWidth={size}>
          <div>Test</div>
        </Container>
      );
      
      expect(hasCssProperty(html, "max-width", value)).toBe(true);
    });
  });

  test("applies disableGutters=true correctly", () => {
    const html = renderToString(
      <Container disableGutters={true}>
        <div>Test</div>
      </Container>
    );
    
    expect(hasCssProperty(html, "padding-left", "0")).toBe(true);
    expect(hasCssProperty(html, "padding-right", "0")).toBe(true);
  });

  test("applies disableGutters=false correctly", () => {
    const html = renderToString(
      <Container disableGutters={false}>
        <div>Test</div>
      </Container>
    );
    
    expect(hasCssProperty(html, "padding-left", "16px")).toBe(true);
    expect(hasCssProperty(html, "padding-right", "16px")).toBe(true);
  });

  test("applies custom sx styles correctly", () => {
    const html = renderToString(
      <Container sx={{ backgroundColor: "red", borderRadius: "4px" }}>
        <div>Test</div>
      </Container>
    );
    
    expect(hasCssProperty(html, "background-color", "red")).toBe(true);
    expect(hasCssProperty(html, "border-radius", "4px")).toBe(true);
  });

  test("sx props override default styles correctly", () => {
    const html = renderToString(
      <Container sx={{ maxWidth: "500px", paddingLeft: "24px" }}>
        <div>Test</div>
      </Container>
    );
    
    expect(hasCssProperty(html, "max-width", "500px")).toBe(true);
    expect(hasCssProperty(html, "padding-left", "24px")).toBe(true);
  });

  test("combines all custom props correctly", () => {
    const html = renderToString(
      <Container 
        maxWidth="xs"
        disableGutters={true}
        sx={{ 
          border: "1px solid black",
          backgroundColor: "#f5f5f5"
        }}
      >
        <div>Test</div>
      </Container>
    );
    
    expect(hasCssProperty(html, "max-width", "444px")).toBe(true);
    expect(hasCssProperty(html, "padding-left", "0")).toBe(true);
    expect(hasCssProperty(html, "padding-right", "0")).toBe(true);
    expect(hasCssProperty(html, "border", "1px solid black")).toBe(true);
    expect(hasCssProperty(html, "background-color", "#f5f5f5")).toBe(true);
  });

  test("renders as expected with complex children", () => {
    const html = renderToString(
      <Container>
        <div>
          <h1>Heading</h1>
          <p>Paragraph text</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Container>
    );
    
    expect(html.includes("Heading")).toBe(true);
    expect(html.includes("Paragraph text")).toBe(true);
    expect(html.includes("Item 1")).toBe(true);
    expect(html.includes("Item 2")).toBe(true);
  });

  test("renders with empty string child correctly", () => {
    const html = renderToString(<Container>{""}</Container>);
    
    // Should still render the container div with styles
    expect(hasCssProperty(html, "width", "100%")).toBe(true);
    expect(hasCssProperty(html, "max-width", "1024px")).toBe(true);
  });

  test("renders with null child correctly", () => {
    const html = renderToString(<Container>{null}</Container>);
    
    // Should still render the container div with styles
    expect(hasCssProperty(html, "width", "100%")).toBe(true);
    expect(hasCssProperty(html, "max-width", "1024px")).toBe(true);
  });

  test("renders with multiple children including null/undefined", () => {
    const html = renderToString(
      <Container>
        <div>Valid Child</div>
        {null}
        {undefined}
        {""}
      </Container>
    );
    
    expect(html.includes("Valid Child")).toBe(true);
    expect(hasCssProperty(html, "width", "100%")).toBe(true);
  });

  test("handles nested components correctly", () => {
    const NestedComponent = () => <span>Nested Component</span>;
    
    const html = renderToString(
      <Container>
        <NestedComponent />
      </Container>
    );
    
    expect(html.includes("Nested Component")).toBe(true);
  });
});