import { memo } from "react";
import styled, { css } from "styled-components";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "danger";

const sizeStyles = {
  small: css`
    padding: 4px 8px;
    font-size: 12px;
  `,
  medium: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  large: css`
    padding: 12px 24px;
    font-size: 16px;
  `,
};

const variantStyles = {
  primary: css`
    background-color: #007bff;
    color: white;
    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `,
  secondary: css`
    background-color: #6c757d;
    color: white;
    &:hover:not(:disabled) {
      background-color: #545b62;
    }
  `,
  danger: css`
    background-color: #dc3545;
    color: white;
    &:hover:not(:disabled) {
      background-color: #c82333;
    }
  `,
};

const StyledButton = styled.button<{
  $size: ButtonSize;
  $variant: ButtonVariant;
}>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

type Props = {
  readonly label: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly "data-testid"?: string;
};

export const Presentational = memo(function Presentational({
  label,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  "data-testid": dataTestId,
}: Props) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      $size={size}
      type="button"
      data-testid={dataTestId}
    >
      {label}
    </StyledButton>
  );
});
