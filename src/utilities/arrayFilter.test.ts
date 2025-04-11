import { expect, describe, it } from "vitest";
import { arrayFilter } from "./arrayFilter";

describe("arrayFilter", () => {
  describe("Booleanフィルターを使用する場合", () => {
    it("falsyな値を除外する", () => {
      // Arrange
      const input = [
        0,
        1,
        "",
        "hello",
        false,
        true,
        null,
        undefined,
        NaN,
      ] as const;
      type Expected = (1 | "hello" | true)[];

      // Act
      const result = arrayFilter(input, Boolean);

      // Assert
      expect(result).toEqual([1, "hello", true]);
      // 型チェック
      expectType<Expected>(result);
    });
  });

  describe("カスタムフィルター関数を使用する場合", () => {
    it("型安全にフィルタリングできる", () => {
      // Arrange
      const input = ["a", "b", "c", "d"] as const;
      const isAorB = (value: string): value is "a" | "b" => {
        return value === "a" || value === "b";
      };
      type Expected = ("a" | "b")[];

      // Act
      const result = arrayFilter(input, isAorB);

      // Assert
      expect(result).toEqual(["a", "b"]);
      // 型チェック
      expectType<Expected>(result);
    });
  });
});

/**
 * 型チェックヘルパー関数
 * コンパイル時の型チェックのみを目的とし、実行時には何もしない
 */
function expectType<T>(value: T): void {
  // 型チェックのみを行う
}
