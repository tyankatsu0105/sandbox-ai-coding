import { FC, useState } from "react";
import { AvatarContainerProps } from "./facade";
import { AvatarPresentational } from "./presentational";

export const AvatarContainer: FC<AvatarContainerProps> = ({
  src,
  fallbackSrc,
  size,
  alt,
  onError,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    onError?.();
  };

  return (
    <AvatarPresentational
      src={src}
      currentSrc={currentSrc}
      size={size}
      alt={alt}
      onError={handleError}
    />
  );
};

AvatarContainer.displayName = "AvatarContainer";
