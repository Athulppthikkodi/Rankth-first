import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from 'react';
import Button from "./Button";

const meta = {
  title: "Rankth/Inputs/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: "Contained Button",
    variant: "contained",
    size: "medium"
  }
};

export const Outlined: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
    size: "medium"
  }
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "medium"
  }
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "small"
  }
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "large"
  }
};

export const WithIcon: Story = {
  args: {
    children: "Icon Button",
    icon: React.createElement('span', null, '🔍'),
    size: "medium"
  }
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true
  }
};

export const CustomStyled: Story = {
  args: {
    children: "Custom Button",
    variant: "contained",
    size: "large",
    sx: {
      backgroundColor: "red",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "darkred",
      },
    }
  }
};

