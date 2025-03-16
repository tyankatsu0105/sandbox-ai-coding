import { expect, describe, it } from "vitest";
import { assertData } from "./assertData";

describe("assertData", () => {
  describe("neverを受け取るassertData関数が", () => {
    describe("網羅されていない値を受け取ったとき", () => {
      it("デフォルトのエラーメッセージとともに例外を投げる", () => {
        // Arrange
        const value = "c";

        // Act & Assert
        expect(() => {
          // @ts-expect-error - 意図的に型エラーを発生させる
          assertData({ value });
        }).toThrow("値が網羅されていません");
      });

      it("カスタムエラーメッセージとともに例外を投げる", () => {
        // Arrange
        const value = "c";
        const message = "カスタムエラーメッセージ";

        // Act & Assert
        expect(() => {
          // @ts-expect-error - 意図的に型エラーを発生させる
          assertData({ value, message });
        }).toThrow(message);
      });
    });

    describe("switch文での網羅性チェックにおいて", () => {
      it("全てのケースが網羅されていれば正しく動作する", () => {
        // Arrange
        type Status = "success" | "error";
        const exhaustiveCheck = (status: Status): string => {
          switch (status) {
            case "success":
              return "成功";
            case "error":
              return "エラー";
            default:
              return assertData({ value: status });
          }
        };

        // Act & Assert
        expect(exhaustiveCheck("success")).toBe("成功");
        expect(exhaustiveCheck("error")).toBe("エラー");
      });
    });
  });
});
