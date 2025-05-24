import { FC } from "react";
import { AvatarSize, getSizeInPixels } from "./facade";

export interface Props {
  /**
   * 現在表示中の画像URL
   */
  currentSrc: string;
  /**
   * アバターのサイズ
   * @default 'medium'
   */
  size?: AvatarSize;
  /**
   * 代替テキスト
   */
  alt: string;
  /**
   * エラー発生時のハンドラー
   */
  onError?: () => void;
}

export const AvatarPresentational: FC<Props> = ({
  currentSrc,
  size = "medium",
  alt,
  onError,
}) => {
  const sizeInPixels = getSizeInPixels(size);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={onError}
      style={{
        width: sizeInPixels,
        height: sizeInPixels,
        borderRadius: "50%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
};

AvatarPresentational.displayName = "AvatarPresentational";
