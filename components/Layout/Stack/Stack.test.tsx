/** @jsxImportSource @emotion/react */
import { test, expect, describe } from "bun:test";
import { renderToString } from "react-dom/server";
import { css } from "@emotion/react";
import Stack from "./Stack"; // Update the import path as needed
import React from "react";

describe("Stack Component", () => {
  const getSerializedStyles = (html: string): string => {
    const match = html.match(/css-[^"]+/);
    return match ? match[0] : '';
  };

  test("renders children correctly", () => {
    const html = renderToString(
      <Stack data-testid="stack-test">
        <div>Child 1</div>
        <div>Child 2</div>
      </Stack>
    );
    expect(html).toContain("Child 1");
    expect(html).toContain("Child 2");
  });

  test("applies default props as CSS", () => {
    const html = renderToString(<Stack data-testid="stack-test"><div>Test</div></Stack>);
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  test("applies custom direction prop", () => {
    const html = renderToString(<Stack direction="column"><div>Test</div></Stack>);
    expect(html.includes("flex-direction:column")).toBe(true);
  });

  test("applies custom spacing prop", () => {
    const html = renderToString(<Stack spacing={16}><div>Test</div></Stack>);
    expect(html.includes("gap:16px")).toBe(true);
  });

  test("applies custom alignItems prop", () => {
    const html = renderToString(<Stack alignItems="center"><div>Test</div></Stack>);
    expect(html.includes("align-items:center")).toBe(true);
  });

  test("applies custom justifyContent prop", () => {
    const html = renderToString(
      <Stack justifyContent="space-between"><div>Test</div></Stack>
    );
    expect(html.includes("justify-content:space-between")).toBe(true);
  });

  test("applies custom wrap prop", () => {
    const html = renderToString(<Stack wrap="wrap"><div>Test</div></Stack>);
    expect(html.includes("flex-wrap:wrap")).toBe(true);
  });

  test("applies custom sx styles", () => {
    const html = renderToString(
      <Stack 
        data-testid="stack-test"
        sx={{ backgroundColor: "red", padding: "10px" }}
      >
        <div>Test</div>
      </Stack>
    );
    const styles = getSerializedStyles(html);
    expect(styles).toBeTruthy();
  });

  test("combines all custom props correctly", () => {
    const html = renderToString(
      <Stack 
        direction="column-reverse"
        spacing={24}
        alignItems="flex-end"
        justifyContent="space-around"
        wrap="wrap-reverse"
        sx={{ border: "1px solid black" }}
      >
        <div>Test</div>
      </Stack>
    );
    
    expect(html.includes("flex-direction:column-reverse")).toBe(true);
    expect(html.includes("gap:24px")).toBe(true);
    expect(html.includes("align-items:flex-end")).toBe(true);
    expect(html.includes("justify-content:space-around")).toBe(true);
    expect(html.includes("flex-wrap:wrap-reverse")).toBe(true);
    expect(html.includes("border:1px solid black")).toBe(true);
  });
});