## コーディングガイドライン

### コーディングルール

#### TypeScript

- コメントは JSDocs 形式で記述してください。
- ただし、TS の型から引数や返却値が推測できる場合は、それをコメントに含まないでください。

### デザインパターン

#### TypeScript、JavaScript

以下のデザインパターンを選択、組み合わせて実装してください。また、なぜそのデザインパターンを選択したのか、その理由を説明してください。

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
