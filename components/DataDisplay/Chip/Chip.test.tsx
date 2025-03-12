import { expect, test, describe, mock } from "bun:test";
import { Window } from 'happy-dom';
import { render } from "@testing-library/react";
import Chip from "./Chip";
import React from 'react';

// Set up happy-dom
const window = new Window();
global.document = window.document as any;
global.window = window as any;

// Mock Next/Image using Bun's mocking system
import { default as NextImage } from 'next/image';
mock.module('next/image', () => {
  return {
    default: (props: any) => React.createElement('img', { ...props })
  };
});

describe("Chip Component", () => {
  // Test basic rendering for each type
  const chipTypes = [
    ["high", "bg-red-500"],
    ["low", "bg-blue-500"],
    ["link-building", "bg-green-500"],
  ] as const;

  chipTypes.forEach(([type, expectedBgClass]) => {
    test(`renders ${type} chip correctly`, () => {
      const { container } = render(<Chip type={type} />);
      const chip = container.firstChild as HTMLElement;
      
      // Test base styles
      expect(chip?.tagName.toLowerCase()).toBe("span");
      expect(chip?.className).toContain("rounded-full");
      expect(chip?.className).toContain("text-sm");
      expect(chip?.className).toContain("font-medium");
      expect(chip?.className).toContain("px-3");
      expect(chip?.className).toContain("py-1");
      
      // Test type-specific styles
      expect(chip?.className).toContain(expectedBgClass);
      expect(chip?.className).toContain("text-white");
    });
  });

  // Test link-building specific features
  test("renders link-building chip with icon", () => {
    const { container } = render(<Chip type="link-building" />);
    const chip = container.firstChild as HTMLElement;
    
    // Test link-building specific classes
    expect(chip?.className).toContain("flex");
    expect(chip?.className).toContain("items-center");
    expect(chip?.className).toContain("gap-1");
    
    // Test icon presence
    const img = chip?.querySelector("img");
    expect(img).toBeTruthy();
    expect(img?.getAttribute("width")).toBe("11");
    expect(img?.getAttribute("height")).toBe("11");
    expect(img?.getAttribute("alt")).toBe("link building icon");
  });

  // Test text content formatting
  test("formats text content correctly", () => {
    const { container } = render(<Chip type="link-building" />);
    const chip = container.firstChild as HTMLElement;
    expect(chip?.textContent).toContain("link building");
  });

  // Test className composition
  test("composes classes correctly", () => {
    const { container } = render(<Chip type="high" />);
    const chip = container.firstChild as HTMLElement;
    const classes = chip?.className.split(" ");
    expect(classes).toContain("px-3");
    expect(classes).toContain("py-1");
    expect(classes).toContain("rounded-full");
    expect(classes).toContain("text-sm");
    expect(classes).toContain("font-medium");
    expect(classes).toContain("bg-red-500");
    expect(classes).toContain("text-white");
  });

  // Test each chip type's specific styling
  test("applies correct background color for each type", () => {
    const typeToColor = {
      high: "bg-red-500",
      low: "bg-blue-500",
      "link-building": "bg-green-500"
    };

    Object.entries(typeToColor).forEach(([type, color]) => {
      const { container } = render(<Chip type={type as any} />);
      const chip = container.firstChild as HTMLElement;
      expect(chip?.className).toContain(color);
    });
  });

  // Test text transformation
  test("transforms hyphenated type to space-separated text", () => {
    const { container } = render(<Chip type="link-building" />);
    const chip = container.firstChild as HTMLElement;
    expect(chip?.textContent?.trim()).toBe("link building");
  });
});
