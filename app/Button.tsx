import React from "react";

export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return <button onClick={onClick}>{children}</button>;
};
