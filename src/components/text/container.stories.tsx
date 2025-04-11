import type { Meta, StoryObj } from "@storybook/react";
import { TextContainer } from "./container";

const meta = {
  title: "Components/Text/Container",
  component: TextContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "デフォルトテキスト",
  },
};

export const Small: Story = {
  args: {
    children: "小さいテキスト",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "大きいテキスト",
    size: "large",
  },
};

export const Bold: Story = {
  args: {
    children: "太字テキスト",
    weight: "bold",
  },
};

export const Colored: Story = {
  args: {
    children: "色付きテキスト",
    color: "#FF0000",
  },
};

export const CustomClass: Story = {
  args: {
    children: "カスタムクラス",
    className: "italic underline",
  },
};
