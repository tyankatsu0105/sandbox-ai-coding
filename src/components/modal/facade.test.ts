import { expect, describe, it } from "vitest";
import * as Facade from "./facade";
import { act, renderHook } from "@testing-library/react";

describe("facade", () => {
  describe("useModal", () => {
    describe("初期値が", () => {
      describe("指定されていない場合", () => {
        it("isOpenがfalseとなる", () => {
          // Arrange
          const { result } = renderHook(() => Facade.useModal());

          // Act（この場合は初期化時の動作のみ）

          // Assert
          expect(result.current.isOpen).toBe(false);
        });
      });

      describe("trueが指定された場合", () => {
        it("isOpenがtrueとなる", () => {
          // Arrange
          const { result } = renderHook(() => Facade.useModal(true));

          // Act（この場合は初期化時の動作のみ）

          // Assert
          expect(result.current.isOpen).toBe(true);
        });
      });
    });

    describe("モーダルが閉じている状態で", () => {
      describe("handleOpenが呼ばれた場合", () => {
        it("isOpenがtrueとなる", () => {
          // Arrange
          const { result } = renderHook(() => Facade.useModal(false));

          // Act
          act(() => {
            result.current.handleOpen();
          });

          // Assert
          expect(result.current.isOpen).toBe(true);
        });
      });
    });

    describe("モーダルが開いている状態で", () => {
      describe("handleCloseが呼ばれた場合", () => {
        it("isOpenがfalseとなる", () => {
          // Arrange
          const { result } = renderHook(() => Facade.useModal(true));

          // Act
          act(() => {
            result.current.handleClose();
          });

          // Assert
          expect(result.current.isOpen).toBe(false);
        });
      });
    });
  });
});
