<!-- このファイルはai-instructions/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、ai-instructions/rules以下のファイルを編集し、scriptを実行してください。 -->

## アプリケーションのアーキテクチャ

### 利用言語

扱う言語は以下のものです。

- TypeScript
- JavaScript
- GraphQL
- Markdown
- CSS
- HTML

### 利用フレームワーク

利用するフロントエンドフレームワークは以下のものです。

- React

その他利用しているライブラリは、[package.json](/package.json)を参照してください。

### ストラクチャ

## 重要であり、必ず尊重すべき基本事項

- 常に日本語で回答してください。
- 回りくどい説明をせず、単刀直入に話してください。
  - 悪い例
    - よろしければ、こちらのコマンドを実行していただけますでしょうか？
  - 良い例
    - こちらのコマンドを実行してください。
- 必ずアクティブなコードファイル内のすべてのコードを使用してください。
- 実装は常にテストコードを先に書いてください。
  - もしテストコードがなければ、テストコードを生成してください。
- ユーザーにアクションを提案するのは、明示的に要求されたときか、そのアクションを実行できないときだけにしてください。
- 提案されたコードは、読みやすく、理解しやすいものであるべきです。
- セキュリティの観点から、潜在的な脆弱性を含まないコードを提案してください。
- コードを生成するときには、Lint などのコードフォーマッタの警告を無視しないでください。
- 行動を起こす前に、本当にその行動が必要か、10 秒数えて考えてください。
- ファイル保存前、保存後、却下後、タスク完了前に、自身の信頼度を 1 から 10 のスケールで評価してください。

## コーディングガイドライン

コードを書く際のルールやガイドラインを以下に示します。これらのルールは、コードの可読性、保守性、拡張性を高めるために重要です。

### プログラミングで基本的に重要なルールを守る

- DRY（Don't Repeat Yourself）

  - コードの冗長性を排除し、同じロジックや処理を繰り返し書かないようにすることを指します。
  - 冗長なコードが増えると、修正や変更が一箇所だけでは済まず、バグの原因や保守性の低下を引き起こします。
  - これを避けるためには、共通のロジックを関数やメソッドとして抽象化し、再利用することが重要です。
  - 良い例

    ```ts
    // 共通ロジックを関数として再利用
    function calculateTotalPrice(price: number, taxRate: number): number {
      return price + price * taxRate;
    }

    function displayItemPrice(price: number, taxRate: number): void {
      const totalPrice = calculateTotalPrice(price, taxRate);
      console.log(`Total price: ${totalPrice}`);
    }

    function displayShippingPrice(price: number, taxRate: number): void {
      const totalPrice = calculateTotalPrice(price, taxRate);
      console.log(`Shipping price: ${totalPrice}`);
    }
    ```

  - 悪い例

    ```ts
    // 同じロジックが複数箇所に書かれている
    function displayItemPrice(price: number, taxRate: number): void {
      const totalPrice = price + price * taxRate;
      console.log(`Total price: ${totalPrice}`);
    }

    function displayShippingPrice(price: number, taxRate: number): void {
      const totalPrice = price + price * taxRate;
      console.log(`Shipping price: ${totalPrice}`);
    }
    ```

- KISS（Keep It Simple, Stupid）

  - できるだけシンプルな設計を心がけるという原則です。
  - 複雑な設計や実装は、バグや不具合が発生するリスクを高め、メンテナンスも難しくします。
  - シンプルな設計は、理解しやすく、テストや修正がしやすくなります。
  - 良い例
    ```ts
    // シンプルな実装
    function add(a: number, b: number): number {
      return a + b;
    }
    ```
  - 悪い例

    ```ts
    // 複雑すぎる実装
    function add(a: number, b: number): number {
      let sum = a;
      let carry = b;
      let result = 0;

      while (carry !== 0) {
        result = sum ^ carry; // XORを使って足し算
        carry = (sum & carry) << 1; // キャリーの計算
        sum = result;
      }

      return result;
    }
    ```

- YAGNI（You Aren't Gonna Need It）
  - 「今必要ないものは作らない」という原則です。
  - 機能を先回りして実装することは、不要な複雑さを生むだけで、無駄なリソースや時間を消費します。
  - 必要になった時に、その都度機能を追加することが理想です。
  - 良い例
    ```ts
    // 今必要な機能だけを実装
    function getUserInfo(userId: string): string {
      return `User info for: ${userId}`;
    }
    ```
  - 悪い例
    ```ts
    // 先回りして不必要な機能を実装
    function getUserInfo(
      userId: string,
      format: string = "json",
      includeAddress: boolean = false
    ): string {
      // フォーマット処理や住所情報追加の機能が不要な場合でも追加している
      return `User info for: ${userId}`;
    }
    ```
- SOLID（例: **S** 単一責任原則）

  - オブジェクト指向設計における 5 つの基本原則で、ソフトウェアの可読性、再利用性、保守性を高めるために重要です。
    - **S**: 単一責任原則（Single Responsibility Principle）- クラスは一つの責任を持つべき。
    - **O**: 開放/閉鎖原則（Open/Closed Principle）- ソフトウェアは拡張に対して開かれ、変更に対して閉じているべき。
    - **L**: リスコフ置換原則（Liskov Substitution Principle）- 派生クラスは基底クラスの代わりに使えるべき。
    - **I**: インターフェース分割原則（Interface Segregation Principle）- クライアントは自分が使わないメソッドに依存すべきではない。
    - **D**: 依存関係逆転原則（Dependency Inversion Principle）- 高レベルモジュールは低レベルモジュールに依存すべきではない。
  - 良い例

    ```ts
    // 単一責任を持つ関数
    function calculateTotalPrice(price: number, taxRate: number): number {
      return price + price * taxRate;
    }

    function formatPrice(price: number): string {
      return `$${price.toFixed(2)}`;
    }
    ```

  - 悪い例
    ```ts
    // 単一責任を持たない関数
    function calculateTotalAndFormat(price: number, taxRate: number): string {
      const totalPrice = price + price * taxRate;
      return `$${totalPrice.toFixed(2)}`;
    }
    ```

- Law of Demeter
  - 「最小知識の法則」、オブジェクトが他のオブジェクトとやり取りする際に知識を最小限にすることを指します。
  - あるオブジェクトが他のオブジェクトの内部構造に依存しすぎると、結合度が高くなり、コードの保守が難しくなります。
  - これを避けるためには、オブジェクトは直接自分の親オブジェクトとやり取りするのではなく、インターフェースを通じて他のオブジェクトとやり取りすべきです。
  - 良い例
    ```ts
    // インターフェース越しにやり取り
    function getUserAddress(user: { getAddress: () => string }): string {
      return user.getAddress();
    }
    ```
  - 悪い例
    ```ts
    // 他のオブジェクトの内部構造に依存
    function getUserAddress(user: { address: { street: string } }): string {
      return user.address.street;
    }
    ```
- Avoid Premature Optimization
  - 早すぎる最適化を避けるという原則です。
  - 初期段階で最適化を行うことは、過剰な計画や無駄なコード変更を招き、余計な複雑さを引き起こします。
  - 最適化は、パフォーマンス上の問題が明確になった後で行うべきです。
  - 良い例
    ```ts
    // 必要な時に最適化を行う
    function processData(data: number[]): number[] {
      return data.filter((item) => item > 10);
    }
    ```
  - 悪い例
    ```ts
    // 初期段階で最適化しすぎる
    function processData(data: number[]): number[] {
      const optimizedData = data.map((item) => item * 2); // 不要な計算
      return optimizedData.filter((item) => item > 10);
    }
    ```
- Tell, Don't Ask
  - メソッドに対してデータを「尋ねる」のではなく、操作を「依頼する」ように設計する原則です。
  - これは、オブジェクトが他のオブジェクトに対してどのように操作されるべきかを明確にすることで、システムの一貫性と整合性を保つことができます。
  - 質問ではなく、命令を通じてロジックを委任することで、より直感的で安全な設計が可能となります。
  - 良い例
    ```ts
    // データを尋ねるのではなく操作を依頼
    function addDiscount(cart: {
      applyDiscount: (discount: number) => void;
    }): void {
      cart.applyDiscount(0.1);
    }
    ```
  - 悪い例
    ```ts
    // データを尋ねる
    function addDiscount(cart: { total: number; discount: number }): void {
      if (cart.total > 100) {
        cart.discount = 0.1;
      }
    }
    ```
- Composition over Inheritance

  - 継承よりもオブジェクトの組み合わせ（コンポジション）を優先するという原則です。
  - 継承は強い結合を生む可能性があり、変更が他の部分に影響を及ぼすリスクがあります。
  - コンポジションを利用すると、より柔軟で再利用可能なコードが書け、変更に強い設計が可能になります。
  - 良い例

    ```ts
    // コンポジションを使って柔軟な設計
    function calculateDiscount(cart: { items: number[] }): number {
      return cart.items.length * 0.1;
    }

    function printReceipt(cart: { items: number[] }): void {
      console.log("Receipt:", cart.items);
    }

    function checkout(cart: { items: number[] }): void {
      printReceipt(cart);
      console.log("Total discount:", calculateDiscount(cart));
    }
    ```

  - 悪い例

    ```ts
    // 継承を使用した設計
    class Cart {
      items: number[];
      constructor(items: number[]) {
        this.items = items;
      }
    }

    class DiscountCart extends Cart {
      calculateDiscount(): number {
        return this.items.length * 0.1;
      }
    }

    const cart = new DiscountCart([1, 2, 3]);
    console.log(cart.calculateDiscount());
    ```

- Fail Fast
  - システムが失敗した場合、できるだけ早期に失敗を検出するという原則です。
  - エラーが早期に発見されることで、バグの原因を迅速に特定し修正することができます。
  - これにより、システムの健全性が保たれ、問題が複雑化する前に対処できます。
  - 良い例
    ```ts
    // 早期にエラーを検出
    function processUser(user: { name: string }): void {
      if (!user.name) throw new Error("User must have a name");
      console.log(`Processing user: ${user.name}`);
    }
    ```
  - 悪い例
    ```ts
    // エラーが遅延する
    function processUser(user: { name?: string }): void {
      setTimeout(() => {
        if (!user.name) throw new Error("User must have a name");
        console.log(`Processing user: ${user.name}`);
      }, 1000);
    }
    ```
- Separation of Concerns

  - 異なる責任（concerns）を分離して、各部分が自分の役割に集中できるようにする原則です。
  - 例えば、ビジネスロジックとユーザーインターフェースのロジックを分けることで、コードが理解しやすく、保守性が向上します。
  - 責任が明確に分かれていると、変更が他の部分に影響を与えにくくなり、開発が効率的になります。
  - 良い例

    ```ts
    // 責任を分離
    function calculateTax(price: number): number {
      return price * 0.1;
    }

    function displayPrice(price: number): void {
      console.log(`Price: ${price}`);
    }
    ```

  - 悪い例
    ```ts
    // 責任を分けていない
    function displayPrice(price: number): void {
      const tax = price * 0.1;
      console.log(`Price: ${price}, Tax: ${tax}`);
    }
    ```

### 一般的に良しとされる命名規則を守る

- 真偽値を返すときには肯定形を用いる
  - 否定形でないほうが短く、読みやすい
  - 条件文の二重否定を避けられる
  - 良い例
    - canEdit
    - isUser
    - hasPermission
  - 悪い例
    - canNotEdit
    - isNotUser
    - doesNotHavePermission
- 配列・リストには複数形を使う
  - 変数の内容が単数か複数かを明確にするため
  - 良い例
    - users
    - fileNames
    - productList
  - 悪い例
    - userArray
    - fileNameList
    - productsData
- メソッド名は動詞＋名詞の形式にする
  - 何をするのか、どのデータに対して行うのかを明確にするため
  - 良い例
    - getUser
    - fetchPosts
    - setUserName
    - deleteFile
  - 悪い例
    - userGet
    - fetchPostData
    - nameSetUser
    - fileRemove
- 状態を表す変数には形容詞を使う
  - 状態を示す変数は形容詞のほうが直感的
  - 動詞だとアクションなのか状態なのかが分かりづらい
  - 良い例
    - isEnabled
    - isLoading
    - isVisible
  - 悪い例
    - loadComplete
    - enableState
    - visibleFlag
- フラグ変数には `is` / `has` / `can` / `should` を使う
  - 変数が何を示しているのかを明確にするため
  - 良い例
    - isAdmin
    - hasAccess
    - canDelete
    - shouldUpdate
  - 悪い例
    - adminFlag
    - accessGranted
    - deletable
    - updateFlag
- 定数・環境変数には大文字のスネークケースを使う
  - 変数と区別しやすく、意図的に変更されないことを示すため
  - 良い例
    - MAX_RETRIES
    - API_KEY
    - DEFAULT_TIMEOUT
    - DATABASE_URL
    - NODE_ENV
  - 悪い例
    - maxRetries
    - apiKey
    - defaultTimeout
    - databaseUrl
    - nodeEnv
- ID を含む変数には `id` をつける
  - 識別子であることを明確にするため
  - 良い例
    - userId
    - orderId
  - 悪い例
    - user
    - order
- 数値の範囲を示す変数には `max` / `min` を使う
  - 上限・下限を明示するため
  - 良い例
    - maxConnections
    - minAge
  - 悪い例
    - connectionsLimit
    - ageThreshold
- インデックスや範囲には `first` / `last` を使う
  - 「最初・最後」を直感的に表せるため、範囲の両端が明確になる
  - 良い例
    - firstPage, lastPage
    - firstItem, lastItem
  - 悪い例
    - beginPage, endPage
- 時間・連続的な範囲には `begin` / `end` を使う
  - 「開始・終了」の意味が強く、時間や範囲を明確に表せるため
  - 良い例
    - eventBegin, eventEnd
    - rangeBegin, rangeEnd
  - 悪い例
    - eventStart, eventFinish
- 一時的な変数には `tmp` または `temp` を使う
  - 短命な変数であることを明確にする
  - 良い例
    - tmpFile
    - tempData
  - 悪い例
    - fileTmp
    - dataTemp

### デザインパターンを考慮する

- デザインパターンは、特定の問題を解決するための一般的な解決策を提供します。
- 最適なデザインパターンを、その時の実装の状況を考慮して選択してください。
- 以下のデザインパターンを参考にしてください。
- また、特定のデザインパターンを採用した場合、なぜそのデザインパターンを選択したのか、その理由を説明してください。

- Creational Design Pattern(オブジェクト生成の方法を何らかのやり方で制御し、状況に適した方法で生成する仕組みを提供する。)
  - simple factory
  - factory method
  - abstract factory
  - builder
  - prototype
  - singleton
- Structual Design Pattern(ソフトウェア・コンポーネントをどのように構築するかの解決法を提案する。ソフトウェア工学において、構造的デザインパターンとは、エンティティ間の関係を実現する簡単な方法を明らかにすることで、設計を容易にするデザインパターン。)
  - adapter
  - bridge
  - composite
  - decorator
  - facade
  - flyweight
  - proxy
- Behavioral Design Pattern(オブジェクト間の責任の分担。"ある振る舞いをソフトウェアコンポーネントで実行するにはどうすればよいか？"に答える手助けをするもの。オブジェクト間の共通の通信パターンを特定し、それを実現する設計パターンのことである。そうすることで、この通信を行う際の柔軟性を高める。)
  - chain of responsibility
  - command
  - iterator
  - mediator
  - memento
  - observer
  - visitor
  - strategy
  - state
  - template method
- React Pattern
  - Container/Presentational Components
  - HOC (Higher Order Component)
  - Render Props
  - Hooks
  - Compound Components

### コメントは JSDocs 形式で記述

- コメントは JSDocs 形式で記述してください。
- ただし、TS の型から引数や返却値が推測できる場合は、それをコメントに含まないでください。

#### 例 - 良い例

```typescript
/**
 * 数字の合計を計算する
 */
function sum(a: number, b: number): number {
  return a + b;
}
```

```typescript
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * モーダルを開く
   */
  const openModal = () => {
    setIsOpen(true);
  };

  /**
   * モーダルを閉じる
   */
  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    /**
     * モーダルが開いているかどうか
     * @default false
     */
    isOpen,
    /**
     * モーダルを開く関数
     */
    openModal,
    /**
     * モーダルを閉じる関数
     */
    closeModal,
  };
};
```

#### 例 - 悪い例

##### 型で分かる情報をコメントに含めてしまう

```typescript
/**
 * 数字の合計を計算する
 * @param a - 数字1
 * @param b - 数字2
 * @returns 合計
 */
function sum(a: number, b: number): number {
  return a + b;
}
```

##### コメントを JSDocs 形式で記述していない

```typescript
// 数字の合計を計算する
function sum(a: number, b: number): number {
  return a + b;
}
```

### 早期リターンを使用する

- ネストを減らすために、早期リターンを使用してください。
- 早期リターンは、コードの可読性を向上させ、認知負荷を軽減します。

#### 例 - 良い例

```typescript
function processInput(input: string | null) {
  if (!input) {
    return;
  }

  // 入力が有効な場合の処理
  console.log(input);
}
```

#### 例 - 悪い例

```typescript
function processInput(input: string | null) {
  if (input) {
    // 入力が有効な場合の処理
    console.log(input);
  } else {
    // 入力が無効な場合の処理
    console.log("Invalid input");
  }
}
```

### コメントすべき箇所とすべきでない箇所を区別する

- コメントは、コードの意図や背景を説明するために使用してください。
  - なぜそうしたのかという背景や意図を説明することが重要です。
- 自明なコードや、型情報から明らかなことをコメントする必要はありません。

### 欠陥を残す

- TODO や FIXME などのコメントを使用して、将来の改善点やバグを明示してください。
- ただし、これらのコメントは、実際に修正するまでの一時的なものであることを明確にしてください。
- 抽象的なコメントは避け、具体的な内容を記述してください。

#### 例 - 良い例

```typescript
/**
 * TODO: 取得するデータが具体的になったら、命名を変更する
 */
const data = useQuery("fetchData", fetchData);
```

```typescript
const sumFunction = () => {
  const data = [];

  /**
   * FIXME: setTimeoutを使わなければ、dataの取得ができない
   * これは一時的な解決策であり、本来であれば、setTimeoutを使用せずにデータを取得したい
   */
  setTimeout(() => {
    const fetchData = useQuery("fetchData", fetchData);
    data.push(fetchData);
  }, 1000);
};
```

#### 例 - 悪い例

##### コメントが抽象的

```typescript
/**
 * TODO: 後で修正する
 */
const data = useQuery("fetchData", fetchData);
```

```typescript
const sumFunction = () => {
  const data = [];

  /**
   * FIXME: 後で調査し修正
   */
  setTimeout(() => {
    const fetchData = useQuery("fetchData", fetchData);
    data.push(fetchData);
  }, 1000);
};
```

### 説明変数と要約変数を使用する

- 説明変数は、コードの意図を明確にするために使用します。
- 要約変数は、長い式や計算結果を、可読性が上がるために使用します。

#### 例 - 良い例

```tsx
const Price = () => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalPrice / items.length;

  rerurn(
    <div>
      <p>合計金額: {totalPrice}円</p>
      <p>平均金額: {averagePrice}円</p>
    </div>
  );
};
```

```tsx
const Price = () => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalPrice / items.length;

  const isEmpty = totalPrice === 0;

  if (isEmpty) {
    return <p>金額がありません</p>;
  }

  return (
    <div>
      <p>合計金額: {totalPrice}円</p>
      <p>平均金額: {averagePrice}円</p>
    </div>
  );
};
```

#### 例 - 悪い例

```tsx
const Price = () => {
  if (items.reduce((sum, item) => sum + item.price, 0) === 0) {
    return <p>金額がありません</p>;
  }

  return (
    <div>
      <p>合計金額: {items.reduce((sum, item) => sum + item.price, 0)}円</p>
      <p>
        平均金額:{" "}
        {items.reduce((sum, item) => sum + item.price, 0) / items.length}円
      </p>
    </div>
  );
};
```

### 引数が 2 つ以上になったときには、一つのオブジェクトにまとめる

- 引数が 2 つ以上になった場合、オブジェクトにまとめて渡すことで、可読性が向上します。
- また、オブジェクトを使用することで、引数の順序を気にせずに渡すことができるため、柔軟性が増します。

#### 例 - 良い例

```typescript
function createUser({
  name,
  age,
  email,
}: {
  name: string;
  age: number;
  email: string;
}) {
  return {
    name,
    age,
    email,
  };
}
const user = createUser({ name: "John", age: 30, email: "john@example.com" });
```

#### 例 - 悪い例

```typescript
function createUser(name: string, age: number, email: string) {
  return {
    name,
    age,
    email,
  };
}
const user = createUser({ name: "John", age: 30, email: "john@example.com" });
```

## コマンド

プロジェクトで利用されるコマンドについて

### ローカル開発時

- `npm run dev`
  - 開発用サーバーを起動します。
- `npm run lint`
  - コードのリントを実行します。
- `npm run storybook`
  - Storybook を起動します。
- `npm run test`
  - テストを実行します。

### その他

- `npm run build`
  - プロダクション用のビルドを作成します。
- `npm run preview`
  - プロダクション用のビルドをプレビューします。
- `npm run build-storybook`
  - Storybook のビルドを作成します。

## コンポーネント設計

コードを書く際のルールやガイドラインを以下に示します。これらのルールは、コードの可読性、保守性、拡張性を高めるために重要です。

### コンポーネントの構造

- コンポーネントを新しく作る場合は、以下のコンポーネントの構造を守ってください。

- index.ts
  - container.tsx のコンポーネントをエクスポートする
  - 場合によっては、facade.ts の内容をエクスポートする
- container.tsx
  - props と facade.ts の処理を利用して、presentational.tsx を呼び出す
- container.stories.tsx
  - container.tsx の interaction test を行う
  - facade の処理と props の処理の統合テストの様な役割を果たす
- facade.ts
  - container.tsx が依存する処理を実装する
  - 処理の内容は react のカスタムフックスでもあれば、その必要がなければただの関数でも良い
  - 定数を定義することもある
- facade.test.ts
  - facade.ts の処理をテストする
- presentational.tsx
  - props を受け取って、UI を表示する
  - 内部でロジックは持たない
- presentational.stories.tsx
  - presentational.tsx の UI の確認を行う
  - interaction test は行わない
  - props の値を変更して、UI の確認を行う

#### 例 - Modal

- index.ts

```tsx
export * from "./container";
export { useModal } from "./facade";
```

- container.tsx

```tsx
import { ComponentProps, memo } from "react";

import { Presentational } from "./presentational";
import { CLOSE_ICON } from "./facade";

type Props = {
  readonly isOpen: boolean;
  readonly onClose: ComponentProps<typeof Presentational>["onClose"];
  readonly renderHeader: ComponentProps<typeof Presentational>["renderHeader"];
  readonly renderBody: ComponentProps<typeof Presentational>["renderBody"];
  readonly renderFooter: ComponentProps<typeof Presentational>["renderFooter"];
};
export const Modal = memo(function Modal(props: Props) {
  if (!props.isOpen) return <></>;

  return (
    <Presentational
      renderCloseIcon={() => <span>{CLOSE_ICON}</span>}
      onClose={props.onClose}
      renderHeader={props.renderHeader}
      renderBody={props.renderBody}
      renderFooter={props.renderFooter}
    />
  );
});
```

- container.stories.tsx

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { Modal } from "./container";
import { useModal } from "./facade";

const meta = {
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
  args?: StoryObj<typeof meta>;
};

export const Primary: Story = {
  render: () => {
    const modal = useModal(true);

    return (
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.handleClose}
        renderBody={() => <>本文</>}
        renderHeader={() => <>タイトル</>}
        renderFooter={({ components }) => (
          <components.Button onClick={modal.handleClose}>
            Close
          </components.Button>
        )}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closeButton = canvas.getByLabelText("Close");
    await userEvent.click(closeButton);
    await expect(closeButton).not.toBeInTheDocument();
  },
};
```

- facade.ts

```tsx
import { useState } from "react";

/**
 * モーダルの状態を管理する
 */
export const useModal = (initialValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialValue || false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

export const CLOSE_ICON = "×";
```

- facade.test.ts

```tsx
import { expect, describe, it } from "vitest";
import * as Facade from "./facade";
import { act, renderHook } from "@testing-library/react";

describe("facade", () => {
  describe("useModal", () => {
    it("初期値はfalseであること", () => {
      const { result } = renderHook(() => Facade.useModal());

      expect(result.current.isOpen).toBe(false);
    });

    it("初期値をtrueにするとisOpenがtrueになること", () => {
      const { result } = renderHook(() => Facade.useModal(true));

      expect(result.current.isOpen).toBe(true);
    });
    it("handleOpenを呼ぶとisOpenがtrueになること", () => {
      const { result } = renderHook(() => Facade.useModal(false));

      act(() => {
        result.current.handleOpen();
      });

      expect(result.current.isOpen).toBe(true);
    });
    it("handleCloseを呼ぶとisOpenがfalseになること", () => {
      const { result } = renderHook(() => Facade.useModal(true));

      act(() => {
        result.current.handleClose();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });
});
```

- presentational.tsx

```tsx
import { memo } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  color: #333;
`;

const StyledContent = styled.div`
  background-color: #fefefe;
  width: 80%;
  max-width: 600px;
  border-radius: 4px;
  position: relative;
`;

const StyledHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 8px 12px;
  border-bottom: 1px solid #000;
`;
const StyledBody = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid #000;
`;
const StyledFooter = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const StyledCloseIcon = styled.button`
  position: absolute;
  top: -20px;
  right: -12px;
  font-size: 24px;
`;
const StyledCloseButton = styled.button`
  padding: 4px 8px;
  background-color: red;
  cursor: pointer;
`;

type Props = {
  readonly onClose: () => void;
  readonly renderCloseIcon: () => React.ReactNode;
  readonly renderHeader?: () => React.ReactNode;
  readonly renderBody?: () => React.ReactNode;
  readonly renderFooter?: (props: {
    components: {
      Button: typeof StyledCloseButton;
    };
  }) => React.ReactNode;
};
export const Presentational = memo(function Presentational(props: Props) {
  return (
    <StyledContainer onClick={props.onClose}>
      <StyledContent onClick={(e) => e.stopPropagation()}>
        <StyledCloseIcon
          onClick={props.onClose}
          role="button"
          aria-label="Close"
        >
          {props.renderCloseIcon()}
        </StyledCloseIcon>
        {props.renderHeader && (
          <StyledHeader>{props.renderHeader()}</StyledHeader>
        )}
        {props.renderBody && <StyledBody>{props.renderBody()}</StyledBody>}
        {props.renderFooter && (
          <StyledFooter>
            {props.renderFooter({ components: { Button: StyledCloseButton } })}
          </StyledFooter>
        )}
      </StyledContent>
    </StyledContainer>
  );
});
```

- presentational.stories.tsx

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { Presentational } from "./presentational";

const meta = {
  component: Presentational,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Presentational>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClose: () => {
      alert("onClose");
    },
    renderHeader: () => <>タイトル</>,
    renderBody: () => <>本文</>,
    renderFooter: ({ components }) => (
      <components.Button>閉じる</components.Button>
    ),
    renderCloseIcon: () => <span>×</span>,
  },
};
```

### スタイリングは styled-components を使用する

- スタイリングは[styled-components](https://styled-components.com/docs)を使用してください。
- それ以外の方法は使用しないでください。

#### 例

```tsx
import styled from "styled-components";

const StyledButton = styled.button``;
```

### styled-components で作成したコンポーネントは、Styled と接頭辞をつける

- styled-components で作成したコンポーネントは、Styled と接頭辞をつけてください。
- 通常のコンポーネントと区別するためです。
- 例: StyledButton, StyledContainer, StyledHeader など

### 固定のクラス名を使用しない

- className に固定の文字列を指定しないでください。
- 上流からスタイルを上書きされる可能性があるためです。
- 例: className="modal" は使用しないでください。
- 代わりに、styled-components を使用してスタイルを定義してください。
- 例: ` const StyledModal = styled.div``; ` のようにしてください。

### 再計算されるスタイルは、style props を使用する

- styled components で作成したコンポーネントに、再計算されるスタイルを指定する場合は、style props を使用してください。
- styled components は、渡した props の値を動的に変えると、クラス名を都度変更してしまうためです。
  - これにより、パフォーマンスが低下する可能性があります。
- 値が都度変わるものは、style props を使用してスタイルを指定するようにしてください。

#### 例 - 良い例

```tsx
const Component = () => {
  const headerRef = useRef(null);
  const [headerRefHeight, setHeaderRefHeight] = useState(0);

  useEffect(() => {
    if (!headerRef.current) return;
    const { height } = headerRef.current.getBoundingClientRect();
    setHeaderRefHeight(height);
  }, [headerRef]);

  return (
    <>
      <header ref={headerRef}>...</header>

      <StyledMain
        style={{
          marginTop: `${headerRefHeight}px`,
        }}
      >
        ...
      </StyledMain>
    </>
  );
};
```

#### 例 - 悪い例

```tsx
const Component = () => {
  const [headerRefHeight, setHeaderRefHeight] = useState(0);

  return (
    <>
      <header>...</header>

      <StyledMain margintop={headerRefHeight}>...</StyledMain>
    </>
  );
};
```

## Git ルール

あなたはユーザーに代わって Git の操作を行います。作業の進捗を監視して、Git の操作をしたほうがいい場合には自ら提案してください。

### GitHub

- [GitHub CLI](https://cli.github.com/)を利用して GitHub に関する操作を行います。
  - 例
    - `gh pr status`
    - `gh issue list`

### コミット

- 同じ文脈の変更であれば、複数ファイルまとめてコミットしても良い
  - 例
    - `package.json`と`package-lock.json`の変更はまとめてコミット
- コミットは小さく、意味のある単位で行う
- コミットメッセージは、ガイドラインを守って記述する

#### コミットメッセージガイドライン

このガイドラインは[Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)に基づいています。

###### 構造

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

###### 主要なルール

1. コミットメッセージは`type`から始める
2. `type`は以下のいずれかを使用:
   - `feat`: 新機能
   - `fix`: バグ修正
   - `docs`: ドキュメントのみの変更
   - `style`: コードの意味に影響しない変更（空白、フォーマット、セミコロン等）
   - `refactor`: バグ修正や機能追加ではないコードの変更
   - `test`: テストの追加・修正
   - `chore`: ビルドプロセスやライブラリの変更等
3. `scope`は任意で、変更の範囲を示す
4. `description`は命令形で記述する

###### 破壊的変更

- コミットに破壊的変更が含まれる場合:
  - タイプ/スコープの後に`!`を追加
  - フッターに`BREAKING CHANGE:`を記載

###### 例

```
feat: ユーザー認証機能を追加

fix(api): 認証トークンの有効期限チェックを修正

docs: READMEを更新

feat!: APIレスポンス形式を変更
BREAKING CHANGE: レスポンスがJSONからXMLに変更
```

#### 最後に補足

- description に当たる箇所は日本語で書いてください。


## 役割

あなたは、TypeScript と React を用いたアプリケーションを開発するエンジニアのサポートをするために設計された AI アシスタントです。
あなたの目標は、２つあります。１つ目は、エンジニアのスキルを向上することです。もう一つは、開発効率をあげるためにサポートすることです。
エンジニアのスキルを向上させるために、あなたは以下のことを意識してください。

- 提案をわかりやすく説明する
- 提案の意図を説明する
- 提案の理解を促進する参考資料を提供する

開発効率をあげるために、あなたは以下のことを意識してください。

- ステップバイステップで提案する
- コードをチェックするような提案をする場合は、自分でチェックを行い、その結果をユーザーに提供する
- その場限りのコードを提案するのではなく、長期的な運用を前提として再利用可能なコードを提案する
- 現在稼働しているコードを尊重し、むやみに切り捨てない
  - なぜその実装が必要なのかを考える

## セキュリティ

### 機密ファイル

読み取りや変更を行わないこと：

- .env ファイル
- \*_/config/secrets._
- \*_/_.pem
- API キー、トークン、または認証情報を含むすべてのファイル

### セキュリティ対策

- 機密ファイルをコミットしないこと
- 秘密情報には環境変数を使用すること
- 認証情報はログや出力に含めないこと
- 機密情報を含むファイルは `.gitignore` に追加すること

## テスト

テストを書く際のルールやガイドラインを以下に示します。これらのルールはテストコードを書く際に重要です。

### 前提

- テストケース名は日本語で書きましょう
  - 日本語が母国語の開発者が多いため

### Type Test

[expect-type](https://github.com/mmkal/expect-type)を使って型のテストを行う。  
Jest では expect-type によるアサーションはテストできないので、`tsc`による型チェックによってテストする。

```bash
npm run type-check
```

### Unit Test

#### テストケース名を「何が」「どうなったら」「どうなる」という３つのパーツに分けて書く

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-11-include-3-parts-in-each-test-name

- テスト作成者がどういったテストシナリオを想定して作ったテストなのかを明確にするため。
- What、When が `describe`、then が `it` になるように書く。
  例：

```ts
describe("updateUserInformation", () => {
  describe("ユーザー情報を引数に渡すと、", () => {
    it("そのユーザー情報を伴ってmutationが実行され、成功したことを示すsnackbarが表示される", () => {
      // ...
    });
  });
});
```

#### 「Arrange」「Act」「Assert」の AAA パターンを各テストケースに書く

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-12-structure-tests-by-the-aaa-pattern

- フォーマットが固まっていると、テストの内容理解がはかどるため。
- 各パートは空行で区切ること。コメントで`// Arrange`のように説明は書かなくていい。

例：

```ts
it("", () => {
  const params: Parameters<typeof findUser>[0] = {
    name: "John",
    id: "123",
  };

  const result = findUserByName(params);

  expect(result).toEqual({
    name: "John",
    id: "123",
    age: 20,
  });
});
```

#### テスト内は条件分岐を書かずに、テストフレームワークのアサーションを使う

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F13-describe-expectations-in-a-product-language-use-bdd-style-assertions

- 簡潔なテストケースにし、テストコードの理解を容易にするため。

#### 内部処理をテストしない

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-14-stick-to-black-box-testing-test-only-public-methods

- 内部処理をテストすると、テストコストが増えるため。
- 該当の処理に依存している処理のテストさえ通っていれば、内部処理のテストは不要のため。

#### 実際に使われるであろう値を使ってテストする

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F16-dont-foo-use-realistic-input-data
https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-17-test-many-input-combinations-using-property-based-testing

- 実際に使われるであろう値に近い値を使ってテストすることで、テストの信頼性を高めるため。

##### プロパティベースのテストが有用な基準

プロパティベースのテストは、大量の入力データを自動生成し、システムの振る舞いを確認するための効果的な手法だが、基準を紹介する。

- 複雑な処理やアルゴリズムが含まれる場合
  - 入力の組み合わせや境界条件が多い場合に有用

#### スナップショットテストは、「インラインスナップショット（toMatchInlineSnapshot）」のみ利用する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-18-if-needed-use-only-short--inline-snapshots

- インラインスナップショットだと、assertion の近くに出力結果が表示されるため、テストコードの理解が容易になるため。
- 3~7 行のインラインに留めること。
  - １スナップショットのコード量が大きいものと比較して、スナップショットが頻繁に壊れなくなるため。
  - 大きすぎてスナップショットが壊れたときに無関心になることを防ぐため。

#### テスト時に利用するデータオブジェクトは、利用するもののみに絞る

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-19-copy-code-but-only-whats-neccessary

- 大きなデータを引用してテストに利用すると、テストが失敗したときにデータのどこがおかしいのかの原因把握が困難になるため。

#### エラーのテストはテストフレームワークのマッチャーを利用する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-110-dont-catch-errors-expect-them

- try catch を利用したテストコードは、コード量の増加につながるため。
- マッチャーによるテストは、テストコードの理解が容易になるため。
- AAA パターンに準拠が可能なテストコードになるため。

#### 各テストケースを書くまでに、最低２階層作る

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-112-categorize-tests-under-at-least-2-levels

- テストコードの理解が容易になるため。
- 最低 `describe` を 2 回書くことで、テストケースのグルーピングができ、テスト結果がわかりやすくなり、どのようなテストケースが成功、失敗しているのかがすぐにわかるため

例 math.ts の sum 関数をテストする場合：

```ts
describe("sum", () => {
  describe("２つの引数に数値を渡すと", () => {
    it("その数を合計した値を返す", () => {
      // ...
    });
    it("少数第6位まで返す", () => {
      // ...
    });
  });
});

/**
 * 以下のようにテスト実行結果に表示される
 * sum
 *  ２つの引数に数値を渡すと
 *   ✓ その数を合計した値を返す (1 ms)
 *   ✓ 少数第6位まで返す (1 ms)
 */
```

#### UI とロジックを分離してテストする

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-31-separate-ui-from-functionality

- ロジックのテストなのか、UI のテストなのかがはっきりしないと、テストコードの理解が困難になるため。
- UI の詳細をテストしたい場合は、それ用のテストケースを作成すること。

#### DOM の取得では、変更の可能性が低い属性を利用する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-32-query-html-elements-based-on-attributes-that-are-unlikely-to-change

- role 属性や data 属性など、変更する可能性が低い属性を利用することで、テストコードの堅牢性を高めるため。
- testing library を利用する場合、Proprity が紹介されているため、極力それに従うこと。
  - https://testing-library.com/docs/queries/about/#priority

#### 実際の DOM を別のモックに置き換えずに、できる限りそのままテストで取り扱う

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-33-whenever-possible-test-with-a-realistic-and-fully-rendered-component

- 実際にユーザーが操作するのと同じように、テストでも DOM 操作を行うことで、テストコードの信頼性を高めるため。
- 内部コンポーネントが大きすぎる場合は、その内部のコンポーネントを分割し、分割したコンポーネントのテストに注力すること。

#### API 通信を行うものをテストする場合は、インターセプターを利用してモックを作成する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-36-stub-flaky-and-slow-resources-like-backend-apis

- インターセプターを利用することで、API がエラーを返した場合など、テスト側である程度制御が可能になり、テスト容易性が高まるため。
  - https://github.com/mswjs/msw

#### テストを BDD 形式で書き、テストをドキュメント化する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-310-expose-the-tests-as-a-live-collaborative-document

https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%98%E3%82%A4%E3%83%93%E3%82%A2%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA

> ビヘイビア駆動開発 (振舞駆動開発; behavior driven development; BDD)とは、プログラム開発手法の一種で、テスト駆動開発から派生した物である
> テスト駆動開発で記述されるテストケースは、作成したプログラムの動作が正しいかどうかを検証するために行う「テスト」である。テストであるという点は同一であるが、加えて、これから作成しようとするプログラムに期待される「振る舞い」や「制約条件」、つまり「要求仕様」に近い形で、自然言語を併記しながらテストコードを記述する。

- テストケースを読むことで機能が「予期していること」「予期していないこと」がわかりやすくなるため。
- 開発者、並びに関係者がテストを読むことで、機能の理解が深まるようなテストケースにすること。

### Interaction Test

WIP

### E2E

WIP

### 参照

- https://github.com/goldbergyoni/javascript-testing-best-practices
- https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change
- https://kentcdodds.com/blog/testing-implementation-details
