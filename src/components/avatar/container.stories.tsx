import type { Meta, StoryObj } from "@storybook/react";
import { AvatarContainer } from "./container";

const meta = {
  title: "Components/Avatar/Container",
  component: AvatarContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/32",
    alt: "Default avatar",
  },
};

export const WithFallback: Story = {
  args: {
    src: "invalid-image-url",
    fallbackSrc: "https://via.placeholder.com/32?text=Fallback",
    alt: "Avatar with fallback",
  },
};

export const Small: Story = {
  args: {
    src: "https://via.placeholder.com/24",
    size: "small",
    alt: "Small avatar",
  },
};

export const Large: Story = {
  args: {
    src: "https://via.placeholder.com/48",
    size: "large",
    alt: "Large avatar",
  },
};

export const WithErrorHandler: Story = {
  args: {
    src: "invalid-image-url",
    alt: "Avatar with error handler",
    onError: () => console.log("Avatar failed to load"),
  },
};
