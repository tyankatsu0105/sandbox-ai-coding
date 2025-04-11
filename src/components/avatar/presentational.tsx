import { FC } from "react";
import { AvatarPresentationalProps, getSizeInPixels } from "./facade";

export const AvatarPresentational: FC<AvatarPresentationalProps> = ({
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
