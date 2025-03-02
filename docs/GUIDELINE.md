# TS

## MUST

### 関数宣言よりも関数式

hoisting による挙動の違いを避けるため、関数宣言よりも関数式を使用すること。

```ts
// NG
function foo() {}

// OK
const foo = () => {};
```
