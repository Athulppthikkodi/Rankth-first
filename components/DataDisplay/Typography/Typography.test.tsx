import { expect, test, describe } from "bun:test";
import { Window } from "happy-dom";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Typography, {
  TypographyProps,
  TypographyVariant,
  TypographyColor,
} from "./Typography";

// Set up happy-dom
const window = new Window();
global.document = window.document as any;
global.window = window as any;

describe("Typography", () => {
  const render = async (props: Partial<TypographyProps> = {}) => {
    const container = document.createElement("div");
    const root = createRoot(container);
    const finalProps = { children: "Test Text", ...props } as TypographyProps;

    await new Promise<void>((resolve) => {
      root.render(createElement(Typography, finalProps));
      // Wait for next tick to ensure render is complete
      setTimeout(resolve, 0);
    });

    return container;
  };

  // Helper function for class checking with type safety
  const hasClass = (element: Element | null, className: string): boolean => {
    if (!element) return false;
    const classes = element.className.split(" ");
    return classes.some((cls) => cls.trim() === className.trim());
  };

  test("renders default typography", async () => {
    const container = await render();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const element = container.firstChild as HTMLElement;
    expect(element).toBeDefined();
    expect(element.textContent).toBe("Test Text");
    expect(hasClass(element, "text-base")).toBe(true);
  });

  // Test variants
  const variants: Record<TypographyVariant, { tag: string; class: string }> = {
    h1: { tag: "h1", class: "text-[40px]" },
    h2: { tag: "h2", class: "text-[30px]" },
    h3: { tag: "h3", class: "text-[25px]" },
    h4: { tag: "h4", class: "text-[20px]" },
    h5: { tag: "h5", class: "text-[18px]" },
    h6: { tag: "h6", class: "text-[16px]" },
    subtitle: { tag: "h6", class: "text-[14px]" },
    body1: { tag: "span", class: "text-[14px]" },
    body2: { tag: "span", class: "text-[13px]" },
  } as const;

  Object.entries(variants).forEach(([variant, config]) => {
    test(`renders ${variant} variant correctly`, async () => {
      const container = await render({ variant: variant as TypographyVariant });
      await new Promise((resolve) => setTimeout(resolve, 0));
      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe(config.tag);
      expect(hasClass(element, config.class)).toBe(true);
    });
  });

  // Test colors
  Object.entries({
    primary: "text-blue-600",
    secondary: "text-purple-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-sky-600",
    success: "text-green-600",
    initial: "text-gray-900",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
  } as const).forEach(([color, expectedClass]) => {
    test(`renders ${color} color correctly`, async () => {
      const container = await render({ color: color as TypographyColor });
      await new Promise((resolve) => setTimeout(resolve, 0));
      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
      expect(hasClass(element, expectedClass)).toBe(true);
    });
  });

  // Special cases
  test("renders as paragraph", async () => {
    const container = await render({ paragraph: true });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const element = container.firstChild as HTMLElement;
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe("p");
    expect(hasClass(element, "mb-4")).toBe(true);
  });

  test("applies text wrapping", async () => {
    const container = await render({ noWrap: true });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const element = container.firstChild as HTMLElement;
    expect(element).toBeDefined();
    expect(hasClass(element, "whitespace-nowrap")).toBe(true);
  });

  test("combines multiple props correctly", async () => {
    const container = await render({
      variant: "h1",
      color: "primary",
      align: "center",
      fontWeight: "bold",
      noWrap: true,
      gutterBottom: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const element = container.firstChild as HTMLElement;
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe("h1");
    expect(hasClass(element, "text-[40px]")).toBe(true);
    expect(hasClass(element, "text-blue-600")).toBe(true);
    expect(hasClass(element, "text-center")).toBe(true);
    expect(hasClass(element, "whitespace-nowrap")).toBe(true);
    expect(hasClass(element, "mb-4")).toBe(true);
  });
});
