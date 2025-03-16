import { expect, describe, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useButtonLoading, debounceClick } from "./facade";

describe("facade", () => {
  describe("useButtonLoading", () => {
    it("初期値がfalseの場合、isLoadingがfalseであること", () => {
      const { result } = renderHook(() => useButtonLoading());
      expect(result.current.isLoading).toBe(false);
    });

    it("初期値がtrueの場合、isLoadingがtrueであること", () => {
      const { result } = renderHook(() => useButtonLoading(true));
      expect(result.current.isLoading).toBe(true);
    });

    it("startLoadingを呼ぶと、isLoadingがtrueになること", () => {
      const { result } = renderHook(() => useButtonLoading());

      act(() => {
        result.current.startLoading();
      });

      expect(result.current.isLoading).toBe(true);
    });

    it("stopLoadingを呼ぶと、isLoadingがfalseになること", () => {
      const { result } = renderHook(() => useButtonLoading(true));

      act(() => {
        result.current.stopLoading();
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("debounceClick", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it("指定した時間が経過するまで、コールバックが実行されないこと", () => {
      const callback = vi.fn();
      const debouncedFn = debounceClick(callback, 300);

      debouncedFn();
      expect(callback).not.toBeCalled();

      vi.advanceTimersByTime(299);
      expect(callback).not.toBeCalled();

      vi.advanceTimersByTime(1);
      expect(callback).toBeCalled();
      expect(callback).toBeCalledTimes(1);
    });

    it("連続して呼び出した場合、最後の呼び出しのみが実行されること", () => {
      const callback = vi.fn();
      const debouncedFn = debounceClick(callback, 300);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      vi.advanceTimersByTime(299);
      expect(callback).not.toBeCalled();

      vi.advanceTimersByTime(1);
      expect(callback).toBeCalledTimes(1);
    });
  });
});
