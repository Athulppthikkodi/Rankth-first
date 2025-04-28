// Avatar.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Rankth/Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["circular", "rounded", "square"],
    },
    fallback: {
      control: "text",
    },
    src: {
      control: "text",
    },
    sx: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Default Avatar
export const Default: Story = {
  args: {
    fallback: "A",
    size: "medium",
    variant: "circular",
  },
};

// Avatar with Image
export const WithImage: Story = {
  args: {
    src: "",
    alt: "User Avatar",
    size: "medium",
  },
};

// Small Avatar
export const Small: Story = {
  args: {
    fallback: "S",
    size: "small",
  },
};

// Large Avatar
export const Large: Story = {
  args: {
    fallback: "L",
    size: "large",
  },
};

// Rounded Avatar
export const Rounded: Story = {
  args: {
    fallback: "R",
    variant: "rounded",
  },
};

// Square Avatar
export const Square: Story = {
  args: {
    fallback: "SQ",
    variant: "square",
  },
};

// Custom Styles Avatar
export const CustomStyles: Story = {
  args: {
    fallback: "CS",
    size: "large",
    sx: {
      backgroundColor: "#00BC74",
      color: "#fff",
      border: "2px solid #09090B",
    },
  },
};
