import type { Meta, StoryObj } from "@storybook/react";
import { AvatarPresentational } from "./presentational";

const meta = {
  title: "Components/Avatar/Presentational",
  component: AvatarPresentational,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    src: "https://via.placeholder.com/24",
    currentSrc: "https://via.placeholder.com/24",
    size: "small",
    alt: "Small avatar",
  },
};

export const Medium: Story = {
  args: {
    src: "https://via.placeholder.com/32",
    currentSrc: "https://via.placeholder.com/32",
    size: "medium",
    alt: "Medium avatar",
  },
};

export const Large: Story = {
  args: {
    src: "https://via.placeholder.com/48",
    currentSrc: "https://via.placeholder.com/48",
    size: "large",
    alt: "Large avatar",
  },
};

export const WithError: Story = {
  args: {
    src: "invalid-image-url",
    currentSrc: "invalid-image-url",
    size: "medium",
    alt: "Invalid image",
    onError: () => console.log("Image failed to load"),
  },
};
