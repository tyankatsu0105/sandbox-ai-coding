/**
 * 値の網羅性チェックを行う関数
 *
 * この関数は、switch文やif文で全てのケースが処理されていることを保証します。
 *
 * @example
 * ```typescript
 * type Status = "success" | "error";
 *
 * function handleStatus(status: Status): string {
 *   switch (status) {
 *     case "success":
 *       return "成功しました";
 *     case "error":
 *       return "エラーが発生しました";
 *     default:
 *       return assertData({ value: status });
 *   }
 * }
 * ```
 */
export function assertData(params: {
  /** 網羅性チェックを行う値 */
  value: never;
  /** エラー発生時のカスタムメッセージ */
  message?: string;
}): never {
  throw new Error(params.message ?? "値が網羅されていません");
}
