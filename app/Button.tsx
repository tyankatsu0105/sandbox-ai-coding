import React, { forwardRef, ButtonHTMLAttributes, memo } from "react";

/**
 * ボタンの外観とサイズのバリエーション
 */
export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "small" | "medium" | "large";

/**
 * ボタンコンポーネントのプロパティ
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * ボタンのバリエーション
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * ボタンのサイズ
   * @default "medium"
   */
  size?: ButtonSize;
  /**
   * ボタンが無効化されているかどうか
   * @default false
   */
  disabled?: boolean;
  /**
   * ボタンがロード中かどうか
   * @default false
   */
  loading?: boolean;
  /**
   * カスタムCSSクラス
   */
  className?: string;
}

/**
 * 再利用可能なボタンコンポーネント
 *
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="medium"
 *   onClick={() => console.log('clicked')}
 * >
 *   クリックしてください
 * </Button>
 * ```
 */
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        variant = "primary",
        size = "medium",
        disabled = false,
        loading = false,
        className = "",
        onClick,
        children,
        type = "button",
        ...props
      },
      ref
    ) => {
      // クリックハンドラーでのエラー処理
      const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (
        e
      ) => {
        try {
          if (loading || disabled) return;
          await onClick?.(e);
        } catch (error) {
          console.error("ボタンクリックでエラーが発生しました:", error);
        }
      };

      // ベースとなるクラス名
      const baseClassName = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        loading && "button--loading",
        disabled && "button--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <button
          ref={ref}
          type={type}
          className={baseClassName}
          onClick={handleClick}
          disabled={disabled || loading}
          aria-disabled={disabled || loading}
          aria-busy={loading}
          {...props}
        >
          {loading ? (
            <span className="button__loading-indicator" aria-hidden="true">
              読み込み中...
            </span>
          ) : (
            children
          )}
        </button>
      );
    }
  )
);

Button.displayName = "Button";
