import { FC } from "react";

export type AvatarSize = "small" | "medium" | "large";

export interface AvatarProps {
  /**
   * アバターの画像URL
   */
  src: string;
  /**
   * フォールバック用の画像URL
   */
  fallbackSrc?: string;
  /**
   * アバターのサイズ
   * @default 'medium'
   */
  size?: AvatarSize;
  /**
   * 代替テキスト
   */
  alt: string;
}

export interface AvatarContainerProps extends AvatarProps {
  /**
   * エラー発生時のハンドラー
   */
  onError?: () => void;
}

export interface AvatarPresentationalProps extends AvatarContainerProps {
  /**
   * 現在表示中の画像URL
   */
  currentSrc: string;
}

export interface AvatarFacade {
  Container: FC<AvatarContainerProps>;
  Presentational: FC<AvatarPresentationalProps>;
}

export const getSizeInPixels = (size: AvatarSize): number => {
  switch (size) {
    case "small":
      return 24;
    case "large":
      return 48;
    case "medium":
    default:
      return 32;
  }
};
