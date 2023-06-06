import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { LoginForm } from "../../src/components";
import { expect } from "@storybook/jest";

const meta = {
  title: "Example/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    title: 'Login',
    onSubmit: undefined
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.click(canvas.getByTestId("email"));
    expect(canvas.getByTestId("email")).toHaveFocus();

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId("email"), "email@provider.com", {
      delay: 50,
    });

    userEvent.tab();
    expect(canvas.getByTestId("password")).toHaveFocus();

    await userEvent.type(canvas.getByTestId("password"), "password123", {
      delay: 50,
    });

    await userEvent.click(canvas.getByTestId('submit'));

    expect(canvas.getByText('Login Successful')).toBeInTheDocument();
  },
};


export const Error: Story = {
  args: {
    title: 'Login',
    onSubmit: undefined
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('submit'));

    // validation texts
    expect(canvas.getByText('Email Required')).toBeInTheDocument();
    expect(canvas.getByText('Password Required')).toBeInTheDocument();
    // login error
    expect(canvas.getByText('Login Failed')).toBeInTheDocument();
  },
};
