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
