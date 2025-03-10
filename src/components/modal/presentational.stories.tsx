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
  },
};
