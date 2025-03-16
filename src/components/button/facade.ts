import { useState } from "react";

/**
 * ボタンのローディング状態を管理するフック
 */
export const useButtonLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

/**
 * ボタンのダブルクリック防止用のデバウンス処理
 */
export const debounceClick = (
  callback: () => void,
  delay: number = 300
): (() => void) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback();
    }, delay);
  };
};
