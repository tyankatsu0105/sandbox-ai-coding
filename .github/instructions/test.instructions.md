<!-- このファイルはdocs/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、docs/rules以下のファイルを編集し、scriptを実行してください。 -->

---
applyTo: "**/*.spec.*,**/*.test.*"
---

# テスト

テストを書く際のルールやガイドラインを以下に示す。これらのルールはテストコードを書く際に重要。

## 前提

- テストケース名は日本語で書け。
  - 日本語が母国語の開発者が多いため。

## Type Test

[expect-type](https://github.com/mmkal/expect-type)を使って型のテストを行え。
Jest では expect-type によるアサーションはテストできないので、`tsc`による型チェックによってテストしろ。

```bash
npm run type-check
```

## Unit Test

### テストケース名を「何が」「どうなったら」「どうなる」という３つのパーツに分けて書く

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

### 「Arrange」「Act」「Assert」の AAA パターンを各テストケースに書く

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-12-structure-tests-by-the-aaa-pattern

- フォーマットが固まっていると、テストの内容理解がはかどるため。
- 各パートは空行で区切れ。コメントで`// Arrange`のように説明は書かなくていい。

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

### テスト内は条件分岐を書かずに、テストフレームワークのアサーションを使う

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F13-describe-expectations-in-a-product-language-use-bdd-style-assertions

- 簡潔なテストケースにしろ。テストコードの理解を容易にするため。

### 内部処理をテストしない

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-14-stick-to-black-box-testing-test-only-public-methods

- 内部処理をテストするな。テストコストが増えるため。
- 該当の処理に依存している処理のテストさえ通っていれば、内部処理のテストは不要。

### 実際に使われるであろう値を使ってテストする

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F16-dont-foo-use-realistic-input-data
https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-17-test-many-input-combinations-using-property-based-testing

- 実際に使われるであろう値に近い値を使ってテストすることで、テストの信頼性を高めるため。

#### プロパティベースのテストが有用な基準

プロパティベースのテストは、大量の入力データを自動生成し、システムの振る舞いを確認するための効果的な手法だが、基準を紹介する。

- 複雑な処理やアルゴリズムが含まれる場合
  - 入力の組み合わせや境界条件が多い場合に有用

### スナップショットテストは、「インラインスナップショット（toMatchInlineSnapshot）」のみ利用する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-18-if-needed-use-only-short--inline-snapshots

- インラインスナップショットだと、assertion の近くに出力結果が表示されるため、テストコードの理解が容易になるため。
- 3~7 行のインラインに留めること。
  - １スナップショットのコード量が大きいものと比較して、スナップショットが頻繁に壊れなくなるため。
  - 大きすぎてスナップショットが壊れたときに無関心になることを防ぐため。

### テスト時に利用するデータオブジェクトは、利用するもののみに絞る

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-19-copy-code-but-only-whats-neccessary

- 大きなデータを引用してテストに利用すると、テストが失敗したときにデータのどこがおかしいのかの原因把握が困難になるため。

### エラーのテストはテストフレームワークのマッチャーを利用する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-110-dont-catch-errors-expect-them

- try catch を利用したテストコードは、コード量の増加につながるため。
- マッチャーによるテストは、テストコードの理解が容易になるため。
- AAA パターンに準拠が可能なテストコードになるため。

### 各テストケースを書くまでに、最低２階層作る

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

### UI とロジックを分離してテストする

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-31-separate-ui-from-functionality

- ロジックのテストなのか、UI のテストなのかがはっきりしないと、テストコードの理解が困難になるため。
- UI の詳細をテストしたい場合は、それ用のテストケースを作成すること。

### DOM の取得では、変更の可能性が低い属性を利用する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-32-query-html-elements-based-on-attributes-that-are-unlikely-to-change

- role 属性や data 属性など、変更する可能性が低い属性を利用することで、テストコードの堅牢性を高めるため。
- testing library を利用する場合、Proprity が紹介されているため、極力それに従うこと。
  - https://testing-library.com/docs/queries/about/#priority

### 実際の DOM を別のモックに置き換えずに、できる限りそのままテストで取り扱う

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-33-whenever-possible-test-with-a-realistic-and-fully-rendered-component

- 実際にユーザーが操作するのと同じように、テストでも DOM 操作を行うことで、テストコードの信頼性を高めるため。
- 内部コンポーネントが大きすぎる場合は、その内部のコンポーネントを分割し、分割したコンポーネントのテストに注力すること。

### API 通信を行うものをテストする場合は、インターセプターを利用してモックを作成する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-36-stub-flaky-and-slow-resources-like-backend-apis

- インターセプターを利用することで、API がエラーを返した場合など、テスト側である程度制御が可能になり、テスト容易性が高まるため。
  - https://github.com/mswjs/msw

### テストを BDD 形式で書き、テストをドキュメント化する

https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-310-expose-the-tests-as-a-live-collaborative-document

https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%98%E3%82%A4%E3%83%93%E3%82%A2%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA

> ビヘイビア駆動開発 (振舞駆動開発; behavior driven development; BDD)とは、プログラム開発手法の一種で、テスト駆動開発から派生した物である
> テスト駆動開発で記述されるテストケースは、作成したプログラムの動作が正しいかどうかを検証するために行う「テスト」である。テストであるという点は同一であるが、加えて、これから作成しようとするプログラムに期待される「振る舞い」や「制約条件」、つまり「要求仕様」に近い形で、自然言語を併記しながらテストコードを記述する。

- テストケースを読むことで機能が「予期していること」「予期していないこと」がわかりやすくなるため。
- 開発者、並びに関係者がテストを読むことで、機能の理解が深まるようなテストケースにすること。

## Interaction Test

WIP

## E2E

WIP

## 参照

- https://github.com/goldbergyoni/javascript-testing-best-practices
- https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change
- https://kentcdodds.com/blog/testing-implementation-details
