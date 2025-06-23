import { describe, it, expect, vi } from "vitest";

// mock the native clipboard module (adjust path if yours differs)
vi.mock("../native-clipboard/lib", () => ({
  read_clipboard: () => Promise.resolve("hello"),
  write_clipboard: (text) => Promise.resolve(text),
}));

import { readClipboard, writeClipboard } from "../src/clipboard";

describe("clipboard-native bridge", () => {
  it("reads text from clipboard", async () => {
    const text = await readClipboard();
    expect(text).toBe("hello");
  });

  it("writes text to clipboard", async () => {
    const result = await writeClipboard("world");
    expect(result).toBe("world");
  });
});
