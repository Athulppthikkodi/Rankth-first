import { expect, test, describe } from "bun:test";
import { Window } from "happy-dom";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Typography, { TypographyProps, TypographyVariant } from "./Typography";

// Set up happy-dom
const window = new Window();
global.document = window.document as unknown as Document;
(global.window as unknown as Window & typeof globalThis & { __NEXT_DATA__?: unknown }) = window as unknown as Window & typeof globalThis;

describe("Typography", () => {
  const render = async (props: Partial<TypographyProps> = {}) => {
    const container = document.createElement("div");
    const root = createRoot(container);
    const finalProps = { children: "Test Text", ...props } as TypographyProps;

    await new Promise<void>((resolve) => {
      root.render(createElement(Typography, finalProps));
      setTimeout(resolve, 0);
    });

    return container;
  };

  test("renders default typography", async () => {
    const container = await render();
    const element = container.querySelector("p") as HTMLElement;
    expect(element).toBeDefined();
    expect(element.textContent).toBe("Test Text");
  });

  const variants: Record<TypographyVariant, { tag: string }> = {
    h1: { tag: "h1" },
    h2: { tag: "h2" },
    h3: { tag: "h3" },
    h4: { tag: "h4" },
    h5: { tag: "h5" },
    h6: { tag: "h6" },
    subtitle1: { tag: "p" },
    subtitle2: { tag: "p" },
    body1: { tag: "p" },
    body2: { tag: "p" },
    caption: { tag: "span" },
    overline: { tag: "span" },
  };

  Object.entries(variants).forEach(([variant, config]) => {
    test(`renders ${variant} variant correctly`, async () => {
      const container = await render({ variant: variant as TypographyVariant });
      const element = container.querySelector(config.tag) as HTMLElement;
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe(config.tag);
    });
  });

  test("applies custom styles via sx prop", async () => {
    const container = await render({ sx: { color: "red", fontSize: "20px" } });
    const element = container.firstChild as HTMLElement;
    expect(element).toBeDefined();
    expect(getComputedStyle(element).color).toBe("red"); // Fix: Use getComputedStyle to validate Emotion-applied styles
    expect(getComputedStyle(element).fontSize).toBe("20px");
  });

  test("renders with custom component", async () => {
    const container = await render({ component: "div" });
    const element = container.querySelector("div") as HTMLElement;
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe("div");
  });

  test("combines multiple props correctly", async () => {
    const container = await render({
      variant: "h1",
      color: "blue",
      align: "center",
      fontWeight: "bold",
      fontStyle: "italic",
      // gutterBottom: true, error
      noWrap: true,
      sx: { fontSize: "50px" },
    });
    const element = container.querySelector("h1") as HTMLElement;
    expect(element).toBeDefined();
    expect(getComputedStyle(element).color).toBe("blue"); // Fix: Use getComputedStyle for color validation
    expect(getComputedStyle(element).textAlign).toBe("center");
    expect(getComputedStyle(element).fontWeight).toBe("700");
    expect(getComputedStyle(element).fontStyle).toBe("italic");
    expect(getComputedStyle(element).marginBottom).toBe("0.5rem");
    expect(getComputedStyle(element).whiteSpace).toBe("nowrap");
    expect(getComputedStyle(element).fontSize).toBe("50px");
  });
});
