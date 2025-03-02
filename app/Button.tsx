import React from "react";

export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => <button onClick={onClick}>{children}</button>;
