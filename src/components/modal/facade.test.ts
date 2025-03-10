import { expect, describe, it } from "vitest";
import * as Facade from "./facade";
import { act, renderHook } from "@testing-library/react";

describe("facade", () => {
  describe("useModal", () => {
    it("初期値はfalseであること", () => {
      const { result } = renderHook(() => Facade.useModal());

      expect(result.current.isOpen).toBe(false);
    });

    it("初期値をtrueにするとisOpenがtrueになること", () => {
      const { result } = renderHook(() => Facade.useModal(true));

      expect(result.current.isOpen).toBe(true);
    });
    it("handleOpenを呼ぶとisOpenがtrueになること", () => {
      const { result } = renderHook(() => Facade.useModal(false));

      act(() => {
        result.current.handleOpen();
      });

      expect(result.current.isOpen).toBe(true);
    });
    it("handleCloseを呼ぶとisOpenがfalseになること", () => {
      const { result } = renderHook(() => Facade.useModal(true));

      act(() => {
        result.current.handleClose();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });
});
