import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typography";

const meta = {
  title: "Rankth/Data Display/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle",
        "body1",
        "body2",
      ],
      description: "The typography variant to display",
    },
    component: {
      control: { type: "text" },
      description: "Override the default HTML element",
    },
    color: {
      control: { type: "select" },
      options: [
        "initial",
        "inherit",
        "primary",
        "secondary",
        "textPrimary",
        "textSecondary",
        "error",
        "warning",
        "info",
        "success",
      ],
      description: "The color of the text",
    },
    align: {
      control: { type: "select" },
      options: ["inherit", "left", "center", "right", "justify"],
      description: "Text alignment",
    },
    fontWeight: {
      control: { type: "select" },
      options: ["light", "regular", "medium", "bold"],
      description: "Font weight",
    },
    fontStyle: {
      control: { type: "select" },
      options: ["normal", "italic"],
      description: "Font style",
    },
    noWrap: {
      control: { type: "boolean" },
      description: "Prevent text wrapping",
    },
    gutterBottom: {
      control: { type: "boolean" },
      description: "Add bottom margin",
    },
    paragraph: {
      control: { type: "boolean" },
      description: "Render as paragraph with margins",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
    children: {
      control: { type: "text" },
      description: "The text content",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="h3">h3. Heading</Typography>
      <Typography variant="h4">h4. Heading</Typography>
      <Typography variant="h5">h5. Heading</Typography>
      <Typography variant="h6">h6. Heading</Typography>
      <Typography variant="subtitle1">subtitle. Text</Typography>
      <Typography variant="body1">body1. Lorem ipsum dolor sit amet.</Typography>
      <Typography variant="body2">body2. Lorem ipsum dolor sit amet.</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available typography variants.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="primary">Primary Color</Typography>
      <Typography color="secondary">Secondary Color</Typography>
      <Typography color="error">Error Color</Typography>
      <Typography color="warning">Warning Color</Typography>
      <Typography color="info">Info Color</Typography>
      <Typography color="success">Success Color</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">
        Justified text with multiple lines. Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography fontWeight="light">Light text</Typography>
      <Typography fontWeight="regular">Regular text</Typography>
      <Typography fontWeight="medium">Medium text</Typography>
      <Typography fontWeight="bold">Bold text</Typography>
    </div>
  ),
};

export const FontStyles: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography fontStyle="normal">Normal text</Typography>
      <Typography fontStyle="italic">Italic text</Typography>
    </div>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <div className="space-y-2" style={{ width: "200px" }}>
      <Typography noWrap>
        This is a very long text that will not wrap and will be truncated with an ellipsis.
      </Typography>
      <Typography>
        This is a very long text that will wrap normally without truncation.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the `noWrap` property to prevent text wrapping.',
      },
    },
  },
};