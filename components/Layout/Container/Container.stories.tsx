import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Container from "./Container";

const meta: Meta<typeof Container> = {
  title: "Rankth/Layout/Container",
  component: Container,
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "fullWidth"],
    },
    disableGutters: {
      control: "boolean",
    },
    sx: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: <div style={{ backgroundColor: "lightgray", padding: "20px" }}>Content inside Container</div>,
  },
};

export const WithMaxWidth: Story = {
  args: {
    maxWidth: "md",
    children: <div style={{ backgroundColor: "lightblue", padding: "20px" }}>Medium Container</div>,
  },
};

export const WithoutGutters: Story = {
  args: {
    disableGutters: true,
    children: <div style={{ backgroundColor: "lightcoral", padding: "20px" }}>No Gutters</div>,
  },
};

export const CustomStyles: Story = {
  args: {
    sx: { backgroundColor: "lightyellow", padding: "30px", border: "2px solid black" },
    children: <div>Custom Styled Container</div>,
  },
};
