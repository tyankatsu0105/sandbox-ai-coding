import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { Button } from "./container";
import { useState } from "react";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * ボタンのクリックインタラクションをテストするストーリー
 */
const TestClickButton = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Button
        label="Click Me"
        onClick={() => setClicked(true)}
        data-testid="test-button"
      />
      {clicked && <div data-testid="click-result">Clicked!</div>}
    </>
  );
};

export const ClickInteraction: Story = {
  args: {
    label: "Click Me",
    "data-testid": "test-button",
  },
  render: () => <TestClickButton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId("test-button");

    // ボタンが有効な状態であることを確認
    await expect(button).toBeEnabled();

    // ボタンをクリックする
    await userEvent.click(button);
    await sleep(300); // debounce待ち

    // クリック結果が表示されることを確認
    const result = canvas.getByTestId("click-result");
    await expect(result).toBeInTheDocument();
    await expect(result).toHaveTextContent("Clicked!");
  },
};

/**
 * ローディング状態のインタラクションをテストするストーリー
 */
const TestLoadingButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      label={isLoading ? "Loading..." : "Start Loading"}
      onClick={() => setIsLoading(true)}
      disabled={isLoading}
      data-testid="loading-button"
    />
  );
};

export const LoadingInteraction: Story = {
  args: {
    label: "Start Loading",
    "data-testid": "loading-button",
  },
  render: () => <TestLoadingButton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId("loading-button");

    // 初期状態で有効であることを確認
    await expect(button).toBeEnabled();
    await expect(button).toHaveTextContent("Start Loading");

    // クリックすると無効化されることを確認
    await userEvent.click(button);
    await expect(button).toBeDisabled();
    await expect(button).toHaveTextContent("Loading...");
  },
};

/**
 * 無効状態のインタラクションをテストするストーリー
 */
export const DisabledInteraction: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
    "data-testid": "disabled-button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId("disabled-button");

    // ボタンが無効な状態であることを確認
    await expect(button).toBeDisabled();

    // クリックイベントが発生しないことを確認
    await userEvent.click(button);
    // disabled状態なので、クリックイベントは発火しない
  },
};
