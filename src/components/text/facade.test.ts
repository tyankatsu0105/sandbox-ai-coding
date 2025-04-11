import { describe, it, expect } from "vitest";
import { TextFacade } from "./facade";

describe("TextFacade", () => {
  it("デフォルト値で初期化される", () => {
    const facade = new TextFacade({ children: "テスト" });

    expect(facade.getSize()).toBe("medium");
    expect(facade.getWeight()).toBe("normal");
    expect(facade.getColor()).toBe("inherit");
    expect(facade.getText()).toBe("テスト");
    expect(facade.getClassName()).toBe("");
  });

  it("カスタムプロパティで初期化される", () => {
    const facade = new TextFacade({
      children: "カスタム",
      size: "large",
      weight: "bold",
      color: "#000000",
      className: "custom-text",
    });

    expect(facade.getSize()).toBe("large");
    expect(facade.getWeight()).toBe("bold");
    expect(facade.getColor()).toBe("#000000");
    expect(facade.getText()).toBe("カスタム");
    expect(facade.getClassName()).toBe("custom-text");
  });
});
