import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { Input } from "../../src/components";
import { expect } from "@storybook/jest";

const meta = {
  title: "Example/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Email",
    placeholder: "example@mail.com",
    id: "email",
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.click(canvas.getByTestId("email"));
    expect(canvas.getByTestId("email")).toHaveFocus();

    // 👇 Simulate interactions with the component
    userEvent.type(canvas.getByTestId("email"), "email@provider.com", {
      delay: 50,
    });
  },
};
