import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Stack from "./Stack"; // Adjust path as needed

export default {
  title: "Rankth/Layout/Stack",
  component: Stack,
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    spacing: { control: { type: "number", min: 0, max: 50, step: 2 } },
    alignItems: {
      control: { type: "radio" },
      options: ["flex-start", "center", "flex-end", "stretch", "baseline"],
    },
    justifyContent: {
      control: { type: "radio" },
      options: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
    },
    wrap: {
      control: { type: "radio" },
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
    sx: { control: "object" },
  },
} as Meta<typeof Stack>;

const Template: StoryFn<typeof Stack> = (args) => (
  <Stack {...args}>
    <div style={{ padding: "10px", background: "lightblue" }}>Item 1</div>
    <div style={{ padding: "10px", background: "lightcoral" }}>Item 2</div>
    <div style={{ padding: "10px", background: "lightgreen" }}>Item 3</div>
  </Stack>
);

export const Default = Template.bind({});
Default.args = {
  direction: "row",
  spacing: 10,
  alignItems: "center",
  justifyContent: "center",
  wrap: "nowrap",
};

export const ColumnStack = Template.bind({});
ColumnStack.args = {
  ...Default.args,
  direction: "column",
};

export const WrappedStack = Template.bind({});
WrappedStack.args = {
  ...Default.args,
  wrap: "wrap",
  spacing: 20,
};

export const CustomStyledStack = Template.bind({});
CustomStyledStack.args = {
  ...Default.args,
  sx: { backgroundColor: "lightgray", padding: "20px", borderRadius: "8px" },
};
