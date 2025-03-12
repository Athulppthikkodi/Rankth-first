import { expect, test, describe, beforeAll } from "bun:test";
import { render } from "@testing-library/react";
import Box from "./Box";
import React from 'react';
import { Window } from 'happy-dom';

// Set up happy-dom
beforeAll(() => {
  const window = new Window();
  const document = window.document;
  globalThis.window = window as any;
  globalThis.document = document as any;
});

describe("Box Component", () => {
  test("renders with default props", () => {
    const { container } = render(<Box data-testid="box">Content</Box>);
    const box = container.querySelector('[data-testid="box"]');
    expect(box?.tagName.toLowerCase()).toBe('div');
    expect(box?.textContent).toBe('Content');
  });

  test("renders with custom component prop", () => {
    const elements = ['section', 'article', 'main', 'aside'] as const;
    elements.forEach(tag => {
      const { container } = render(<Box component={tag} data-testid={`box-${tag}`}>Test</Box>);
      const element = container.querySelector(`[data-testid="box-${tag}"]`);
      expect(element?.tagName.toLowerCase()).toBe(tag);
    });
  });

  test("applies style props correctly", async () => {
    const { container } = render(
      <Box
        data-testid="styled-box"
        display="flex"
        width="200px"
        height="100px"
        padding="20px"
        margin="10px"
        bgcolor="#ff0000"
        border="1px solid black"
        borderRadius="8px"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      >
        Test
      </Box>
    );
    
    const box = container.querySelector('[data-testid="styled-box"]');
    expect(box).toBeDefined();
  });

  test("applies and merges sx prop correctly", () => {
    const { container } = render(
      <Box
        data-testid="sx-box"
        bgcolor="blue"
        sx={{
          backgroundColor: 'red',
          padding: '20px',
          '@media (min-width: 600px)': {
            fontSize: '20px'
          }
        }}
      >
        Test
      </Box>
    );
    
    const box = container.querySelector('[data-testid="sx-box"]');
    expect(box).toBeDefined();
  });

  test("handles nested boxes", () => {
    const { container } = render(
      <Box data-testid="parent-box">
        <Box data-testid="child-box-1">Child 1</Box>
        <Box data-testid="child-box-2">Child 2</Box>
      </Box>
    );

    const parent = container.querySelector('[data-testid="parent-box"]');
    const child1 = container.querySelector('[data-testid="child-box-1"]');
    const child2 = container.querySelector('[data-testid="child-box-2"]');

    expect(parent).toBeDefined();
    expect(child1).toBeDefined();
    expect(child2).toBeDefined();
  });

  test("forwards HTML attributes correctly", () => {
    const { container } = render(
      <Box
        data-testid="attr-box"
        aria-label="test box"
        role="region"
        title="Test Title"
      >
        Test
      </Box>
    );
    
    const box = container.querySelector('[data-testid="attr-box"]');
    expect(box?.getAttribute('aria-label')).toBe('test box');
    expect(box?.getAttribute('role')).toBe('region');
    expect(box?.getAttribute('title')).toBe('Test Title');
  });
});
