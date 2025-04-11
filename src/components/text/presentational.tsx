import React from "react";
import { TextProps } from "./facade";

const sizeClasses = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

const weightClasses = {
  normal: "font-normal",
  bold: "font-bold",
};

export const TextPresentational: React.FC<TextProps> = ({
  children,
  size = "medium",
  weight = "normal",
  color = "inherit",
  className = "",
}) => {
  const classes = [sizeClasses[size], weightClasses[weight], className].join(
    " "
  );

  return (
    <span className={classes} style={{ color }}>
      {children}
    </span>
  );
};
