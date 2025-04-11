/**
 * 型安全な配列フィルター関数
 *
 * この関数は配列をフィルタリングし、フィルター関数に基づいて型を絞り込みます。
 * `Boolean`をフィルター関数として使用した場合、falsyな値が型から除外されます。
 *
 * @example
 * ```typescript
 * // Booleanフィルター
 * const input = [0, 1, "", "hello", false, true, null, undefined] as const;
 * const result = arrayFilter(input, Boolean);
 * // result の型は (1 | "hello" | true)[]
 *
 * // カスタムフィルター関数
 * const values = ["a", "b", "c"] as const;
 * const isAorB = (value: string): value is "a" | "b" => value === "a" || value === "b";
 * const filtered = arrayFilter(values, isAorB);
 * // filtered の型は ("a" | "b")[]
 * ```
 */

// 型ヘルパー: Booleanフィルターで除外されるfalsyな値の型
type Falsy = false | null | undefined | "" | 0 | 0n;

// 型ヘルパー: 配列の要素型からfalsyな値を除外した型
type NonFalsy<T> = Exclude<T, Falsy>;

// Boolean述語関数の型定義
declare global {
  interface BooleanConstructor {
    <T>(value: T): value is NonFalsy<T>;
  }
}

// オーバーロードシグネチャ
export function arrayFilter<T>(
  array: readonly T[],
  predicate: typeof Boolean
): NonFalsy<T>[];
export function arrayFilter<T, S extends T>(
  array: readonly T[],
  predicate: (value: T) => value is S
): S[];

// 実装
export function arrayFilter<T, S extends T>(
  array: readonly T[],
  predicate: ((value: T) => value is S) | typeof Boolean
): T[] {
  if (predicate === Boolean) {
    return array.filter(Boolean);
  }
  return array.filter(predicate);
}
