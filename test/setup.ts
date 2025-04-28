import { beforeAll, afterAll, afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

beforeAll(() => {
  // Setup any global test configuration
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  // Cleanup any global test configuration
});