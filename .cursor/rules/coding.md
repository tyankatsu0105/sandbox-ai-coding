<!-- このファイルはai-instructions/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、ai-instructions/rules以下のファイルを編集し、scriptを実行してください。 -->

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
