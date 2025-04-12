# コンポーネント設計

コードを書く際のルールやガイドラインを以下に示します。これらのルールは、コードの可読性、保守性、拡張性を高めるために重要です。

## コンポーネントの構造

- コンポーネントを新しく作る場合は、以下のコンポーネントの構造を守ってください。

- index.ts
  - container.tsx のコンポーネントをエクスポートする
  - 場合によっては、facade.ts の内容をエクスポートする
- container.tsx
  - props と facade.ts の処理を利用して、presentational.tsx を呼び出す
- container.stories.tsx
  - container.tsx の interaction test を行う
  - facade の処理と props の処理の統合テストの様な役割を果たす
  - presentational.stories.tsx で行う UI の確認は行わない
    - play 関数を伴うコンポーネントのみ作成する
  - vitest を起動し、テストがパスするまで確認、修正を繰り返すこと
- facade.ts
  - container.tsx が依存する処理を実装する
  - 処理の内容は react のカスタムフックスでもあれば、その必要がなければただの関数でも良い
  - 定数を定義することもある
- facade.test.ts
  - facade.ts の処理をテストする
  - vitest を起動し、テストがパスするまで確認、修正を繰り返すこと
- presentational.tsx
  - props を受け取って、UI を表示する
  - 内部でロジックは持たない
- presentational.stories.tsx
  - presentational.tsx の UI の確認を行う
  - interaction test は行わない
  - props の値を変更して、UI の確認を行う

### 例 - Modal

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

## スタイリングは styled-components を使用する

- スタイリングは[styled-components](https://styled-components.com/docs)を使用してください。
- それ以外の方法は使用しないでください。

### 例

```tsx
import styled from "styled-components";

const StyledButton = styled.button``;
```

## styled-components で作成したコンポーネントは、Styled と接頭辞をつける

- styled-components で作成したコンポーネントは、Styled と接頭辞をつけてください。
- 通常のコンポーネントと区別するためです。
- 例: StyledButton, StyledContainer, StyledHeader など

## 固定のクラス名を使用しない

- className に固定の文字列を指定しないでください。
- 上流からスタイルを上書きされる可能性があるためです。
- 例: className="modal" は使用しないでください。
- 代わりに、styled-components を使用してスタイルを定義してください。
- 例: ` const StyledModal = styled.div``; ` のようにしてください。

## 再計算されるスタイルは、style props を使用する

- styled components で作成したコンポーネントに、再計算されるスタイルを指定する場合は、style props を使用してください。
- styled components は、渡した props の値を動的に変えると、クラス名を都度変更してしまうためです。
  - これにより、パフォーマンスが低下する可能性があります。
- 値が都度変わるものは、style props を使用してスタイルを指定するようにしてください。

### 例 - 良い例

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

### 例 - 悪い例

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

## 設計には複数のアーキテクチャを検討する

コンポーネントの設計には、以下のような異なるアーキテクチャパターンを状況に応じて検討してください。各パターンには特徴的なメリットと適用ケースがあり、要件や制約に応じて最適なパターンを選択することが重要です。

### Container/Presentational パターン

ロジックと UI を分離するための設計パターンです。コンポーネントを Container（ロジック）と Presentational（UI）の 2 つの役割に分けることで、責務を明確に分離し、コードの保守性と再利用性を高めることができます。

**構成要素：**

1. Container コンポーネント（container.tsx）

   - データの取得や状態管理などのロジックを担当
   - API との通信やデータの加工処理を行う
   - Presentational コンポーネントに必要なデータとコールバック関数を提供
   - Facade から提供される機能を利用してロジックを実装
   - ビジネスロジックに関するテストを実装（container.stories.tsx）

2. Presentational コンポーネント（presentational.tsx）
   - 受け取った props を使用して UI をレンダリング
   - 内部でロジックを持たない（ロジックは Container に委譲）
   - スタイリングや見た目の実装に注力
   - 再利用可能な UI コンポーネントとして機能
   - UI に関するテストを実装（presentational.stories.tsx）

#### メリット

1. **関心の分離**

   - ロジックと UI が分離されることで、それぞれの責務が明確になる
   - コードの見通しが良くなり、保守性が向上する

2. **テスタビリティの向上**

   - UI とロジックが分離されているため、それぞれを個別にテストできる
   - モックやスタブを使用したテストが容易になる

3. **再利用性の向上**

   - Presentational コンポーネントは純粋な UI コンポーネントとして再利用可能
   - 異なる Container から同じ Presentational コンポーネントを使用できる

4. **開発効率の向上**
   - UI デザイナーとロジック開発者の分業が容易になる
   - コンポーネントの役割が明確なため、チーム開発がスムーズになる

#### 実装例 - カウンターコンポーネント

シンプルなカウンターコンポーネントを例に、Container/Presentational パターンの実装方法を示します。

- presentational.tsx

```tsx
import { memo } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledCount = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const StyledButton = styled.button`
  padding: 4px 8px;
  margin: 0 4px;
`;

type Props = {
  readonly count: number;
  readonly onIncrement: () => void;
  readonly onDecrement: () => void;
};

export const Presentational = memo(function Presentational(props: Props) {
  return (
    <StyledContainer>
      <StyledCount>Count: {props.count}</StyledCount>
      <div>
        <StyledButton onClick={props.onDecrement}>-</StyledButton>
        <StyledButton onClick={props.onIncrement}>+</StyledButton>
      </div>
    </StyledContainer>
  );
});
```

- facade.ts

```tsx
import { useState } from "react";

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return {
    count,
    increment,
    decrement,
  };
};
```

- container.tsx

```tsx
import { memo } from "react";
import { Presentational } from "./presentational";
import { useCounter } from "./facade";

type Props = {
  readonly initialValue?: number;
};

export const Counter = memo(function Counter(props: Props) {
  const { count, increment, decrement } = useCounter(props.initialValue);

  return (
    <Presentational
      count={count}
      onIncrement={increment}
      onDecrement={decrement}
    />
  );
});
```

このパターンでは：

- Presentational コンポーネントは見た目とイベントハンドラーの受け取りのみを担当
- Facade はカウンターのロジックを提供するカスタムフックを実装
- Container コンポーネントはロジックとビューを接続する役割を果たす

以上を満たすことが可能です。

### Render Props パターン

コンポーネント間でコードを共有し、UI の柔軟性を高めるための設計パターンです。`render`または任意のプロップとして関数を渡し、その関数内でコンポーネントをレンダリングすることで、再利用性の高いコンポーネントを作成できます。

**構成要素：**

1. レンダリング関数

   - コンポーネントの表示内容を定義する関数
   - 親コンポーネントから渡される
   - 子コンポーネントの一部または全体の表示をカスタマイズ可能

2. コンポーネント本体 - レンダリング関数を受け取り、適切なタイミングで実行 - 共通のロジックやスタイリングを提供 - 必要に応じてコンテキストやコールバック関数を提供
   Render Props パターンは、コンポーネント間でコードを共有するためのテクニックで、`render`または任意のプロップとして関数を渡し、その関数内でコンポーネントをレンダリングする方法です。このパターンを使用することで、コンポーネントのロジックを分離しつつ、レンダリングの柔軟性を高めることができます。

#### メリット

1. **柔軟性**

   - 子コンポーネントのレンダリング方法を親コンポーネントが制御できる
   - UI の見た目を変更しやすく、再利用性が高い

2. **関心の分離**

   - ロジックと表示を明確に分離できる
   - コンポーネントの責務を明確にできる

3. **テスタビリティ**
   - レンダリングロジックとビジネスロジックを個別にテストできる
   - モックやスタブを使用したテストが容易

#### 実装例 - Modal コンポーネント

シンプルなモーダルコンポーネントを例に、Render Props パターンの実装方法を示します。

```tsx
type Props = {
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
    <StyledContainer>
      {props.renderHeader && (
        <StyledHeader>{props.renderHeader()}</StyledHeader>
      )}
      {props.renderBody && <StyledBody>{props.renderBody()}</StyledBody>}
      {props.renderFooter && (
        <StyledFooter>
          {props.renderFooter({ components: { Button: StyledCloseButton } })}
        </StyledFooter>
      )}
    </StyledContainer>
  );
});
```

使用例：

```tsx
<Modal
  renderHeader={() => <>タイトル</>}
  renderBody={() => <>本文</>}
  renderFooter={({ components }) => (
    <components.Button onClick={onClose}>閉じる</components.Button>
  )}
/>
```

このパターンを使用することで：

- ヘッダー、ボディ、フッターの内容を柔軟にカスタマイズ可能
- 各部分のレンダリングロジックを親コンポーネントで制御可能
- スタイル付きコンポーネント（Button）を子コンポーネントに提供可能
- 必要な部分のみを選択的にレンダリング可能

#### 使用するケース

以下のような場合に Render Props パターンの使用を検討してください：

1. コンポーネントの一部の表示内容を柔軟にカスタマイズしたい場合
2. 共通のロジックを持つが、表示内容が異なるコンポーネントを作成する場合
3. 子コンポーネントに親のコンテキストやデータを提供する必要がある場合
4. UI の一部を動的に差し替えたい場合

### Compound パターン

意味的に関連するコンポーネントをグループ化し、より直感的な API を提供するための設計パターンです。親コンポーネントと子コンポーネント間で状態を共有し、密接に連携する複数のコンポーネントを 1 つの使いやすいインターフェースとして提供します。

**構成要素：**

1. ルートコンポーネント

   - グループ全体のコンテキストを提供
   - 共有状態の管理を担当
   - 子コンポーネントの連携を制御

2. 子コンポーネント群
   - それぞれ特定の役割を持つ
   - コンテキストを通じて状態を共有
   - 互いに連携して動作
   - 単体でも使用可能だが、ルートコンポーネント配下で使用することを想定

#### メリット

1. **直感的な API**

   - コンポーネントの関係性が明確で理解しやすい
   - JSX で自然な階層構造を表現できる

2. **柔軟性**

   - 子コンポーネントの配置を自由に制御できる
   - 必要な子コンポーネントのみを使用可能

3. **カプセル化**
   - 関連するコンポーネントを 1 つの名前空間にまとめられる
   - 内部の状態管理を隠蔽できる

#### 実装例 - Tabs コンポーネント

シンプルなタブコンポーネントを例に、Compound パターンの実装方法を示します。

```tsx
// container.tsx
import { createContext, useContext, useState, memo } from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

type TabsProps = {
  children: React.ReactNode;
  defaultTab?: string;
};

const TabsRoot = memo(function TabsRoot({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
});

type TabListProps = {
  children: React.ReactNode;
};

const TabList = memo(function TabList({ children }: TabListProps) {
  return <div role="tablist">{children}</div>;
});

type TabProps = {
  children: React.ReactNode;
  id: string;
};

const Tab = memo(function Tab({ children, id }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
});

type TabPanelProps = {
  children: React.ReactNode;
  id: string;
};

const TabPanel = memo(function TabPanel({ children, id }: TabPanelProps) {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;

  return <div role="tabpanel">{children}</div>;
});

// コンポーネントを複合オブジェクトとしてエクスポート
export const Tabs = {
  Root: TabsRoot,
  List: TabList,
  Tab: Tab,
  Panel: TabPanel,
};
```

使用例：

```tsx
<Tabs.Root defaultTab="tab1">
  <Tabs.List>
    <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
    <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel id="tab1">Content for Tab 1</Tabs.Panel>
  <Tabs.Panel id="tab2">Content for Tab 2</Tabs.Panel>
  <Tabs.Panel id="tab3">Content for Tab 3</Tabs.Panel>
</Tabs.Root>
```

このパターンを使用することで：

- 関連するコンポーネントが明確にグループ化される
- 状態管理が親コンポーネントに集約される
- コンポーネント間の関係性が直感的に理解できる
- アクセシビリティの実装が容易になる

#### 使用するケース

以下のような場合に Compound パターンの使用を検討してください：

1. 複数の関連するコンポーネントをグループ化する必要がある場合

   - タブ
   - アコーディオン
   - メニュー
   - フォームコントロール

2. コンポーネント間で状態を共有する必要がある場合

   - 選択状態
   - 開閉状態
   - フォーカス状態

3. 直感的な API を提供したい場合

   - JSX の階層構造を活かした実装
   - セマンティックな関係性の表現

4. アクセシビリティを考慮した UI 実装が必要な場合
   - WAI-ARIA パターンの実装
   - キーボード操作のサポート
