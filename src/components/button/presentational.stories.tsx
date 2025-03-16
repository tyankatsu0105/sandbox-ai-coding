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

export const Default: Story = {
  args: {
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    label: "Danger Button",
    variant: "danger",
  },
};

export const Small: Story = {
  args: {
    label: "Small Button",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
};

export const WithOnClick: Story = {
  args: {
    label: "Click Me",
    onClick: () => console.log("Button clicked"),
  },
};
