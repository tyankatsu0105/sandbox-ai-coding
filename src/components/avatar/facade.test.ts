import { describe, expect, it } from "vitest";
import { getSizeInPixels } from "./facade";

describe("Avatar Facade", () => {
  describe("getSizeInPixels", () => {
    it("should return correct pixel size for small avatar", () => {
      expect(getSizeInPixels("small")).toBe(24);
    });

    it("should return correct pixel size for medium avatar", () => {
      expect(getSizeInPixels("medium")).toBe(32);
    });

    it("should return correct pixel size for large avatar", () => {
      expect(getSizeInPixels("large")).toBe(48);
    });

    it("should return medium size as default for invalid size", () => {
      // @ts-expect-error テストのために無効な値を渡す
      expect(getSizeInPixels("invalid")).toBe(32);
    });
  });
});
