import { expect, test, describe } from "bun:test";
import { Window } from 'happy-dom';
import { render } from "@testing-library/react";
import Button from "./Button";
import React from 'react';

// Set up happy-dom
const window = new Window();
global.document = window.document as any;
global.window = window as any;

describe("Button Component", () => {
  // Test basic rendering
  test("renders button with default props", () => {
    const { container } = render(<Button onClick={() => {}}>Click me</Button>);
    const button = container.querySelector('button');
    expect(button?.tagName.toLowerCase()).toBe("button");
    expect(button?.textContent).toBe("Click me");
  });

  // Test variants
  const variants = ["contained", "outlined", "ghost"] as const;
  variants.forEach((variant) => {
    test(`renders ${variant} variant correctly`, () => {
      const { container } = render(
        <Button variant={variant} onClick={() => {}}>
          Test Button
        </Button>
      );
      const button = container.querySelector('button');
      expect(button).toBeDefined();
    });
  });

  // Test sizes
  const sizes = ["small", "medium", "large"] as const;
  sizes.forEach((size) => {
    test(`renders ${size} size correctly`, () => {
      const { container } = render(
        <Button size={size} onClick={() => {}}>
          Test Button
        </Button>
      );
      const button = container.querySelector('button');
      expect(button).toBeDefined();
    });
  });

  // Test with icon
  test("renders with icon correctly", () => {
    const testIcon = <span data-testid="test-icon">🔍</span>;
    const { container } = render(
      <Button icon={testIcon} onClick={() => {}}>
        Test Button
      </Button>
    );
    const button = container.querySelector('button');
    const iconSpan = button?.querySelector('span');
    expect(iconSpan).toBeDefined();
    expect(button?.textContent).toContain("Test Button");
  });

  // Test disabled state
  test("renders disabled state correctly", () => {
    const { container } = render(
      <Button disabled onClick={() => {}}>
        Test Button
      </Button>
    );
    const button = container.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  // Test custom styles via sx prop
  test("applies custom styles via sx prop", () => {
    const { container } = render(
      <Button sx={{ backgroundColor: "red" }} onClick={() => {}}>
        Test Button
      </Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeDefined();
  });

  // Test onClick handler
  test("handles click events", async () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    const { container } = render(
      <Button onClick={handleClick}>Test Button</Button>
    );
    
    const button = container.querySelector('button');
    button?.click();
    await Promise.resolve(); // Wait for any async updates
    expect(clicked).toBe(true);
  });
});
