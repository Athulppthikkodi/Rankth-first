import { expect, test, describe } from "bun:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Grid from "./Grid";

describe("Grid", () => {
  test("renders with default props", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(createElement(Grid, {}, "Default Grid"));
    
    expect(div.textContent).toBe("Default Grid");
  });

  test("renders as container", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(createElement(Grid, { container: true }, "Container Grid"));
    
    const grid = div.firstChild as HTMLElement;
    const styles = window.getComputedStyle(grid);
    expect(styles.display).toBe("grid");
  });

  test("applies spacing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      createElement(Grid, { 
        container: true,
        spacing: 2
      }, "Spaced Grid")
    );
    
    const grid = div.firstChild as HTMLElement;
    const styles = window.getComputedStyle(grid);
    expect(styles.gap).toBe("16px");
  });

  test("renders nested grids", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      createElement(Grid, { container: true },
        createElement(Grid, { item: true }, "Nested Grid")
      )
    );
    
    expect(div.querySelectorAll("[class*='css-']").length).toBeGreaterThan(0);
  });

  test("applies responsive sizes", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      createElement(Grid, {
        container: true,
        size: {
          xs: { cols: 1 },
          md: { cols: 3 }
        }
      })
    );
    
    const grid = div.firstChild as HTMLElement;
    expect(grid.getAttribute("class")).toContain("css");
  });

  test("applies custom sx styles", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      createElement(Grid, {
        sx: {
          backgroundColor: "red",
          padding: "20px"
        }
      })
    );
    
    const grid = div.firstChild as HTMLElement;
    const styles = window.getComputedStyle(grid);
    expect(styles.backgroundColor).toBe("red");
    expect(styles.padding).toBe("20px");
  });

  test("handles row and column spacing separately", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      createElement(Grid, {
        container: true,
        rowSpacing: 2,
        columnSpacing: 3
      })
    );
    
    const grid = div.firstChild as HTMLElement;
    const styles = window.getComputedStyle(grid);
    expect(styles.rowGap).toBe("16px");
    expect(styles.columnGap).toBe("24px");
  });
});
