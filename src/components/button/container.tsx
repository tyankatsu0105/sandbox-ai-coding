import { ComponentProps, memo } from "react";
import { Presentational } from "./presentational";

type Props = {
  readonly label: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly variant?: ComponentProps<typeof Presentational>["variant"];
  readonly size?: ComponentProps<typeof Presentational>["size"];
  readonly "data-testid"?: string;
};

export const Button = memo(function Button({
  label,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  "data-testid": dataTestId,
}: Props) {
  return (
    <Presentational
      label={label}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      data-testid={dataTestId}
    />
  );
});
