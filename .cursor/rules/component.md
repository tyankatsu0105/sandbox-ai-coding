<!-- このファイルはai-instructions/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、ai-instructions/rules以下のファイルを編集し、scriptを実行してください。 -->

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
