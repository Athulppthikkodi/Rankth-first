import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Input from "./Input";

export default {
  title: "Rankth/Inputs/Input",
  component: Input,
  argTypes: {
    type: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    error: { control: "boolean" },
    success: { control: "boolean" },
    statusText: { control: "text" },
    size: { control: "radio", options: ["small", "medium", "large"] },
    multiline: { control: "boolean" },
    rows: { control: "number" },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState("");
  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Default Input",
  placeholder: "Type something...",
};

export const Small = Template.bind({});
Small.args = {
  label: "Small Input",
  size: "small",
  placeholder: "Small size",
};

export const Medium = Template.bind({});
Medium.args = {
  label: "Medium Input",
  size: "medium",
  placeholder: "Medium size",
};

export const Large = Template.bind({});
Large.args = {
  label: "Large Input",
  size: "large",
  placeholder: "Large size",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Error Input",
  error: true,
  statusText: "Error message",
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  label: "Success Input",
  success: true,
  statusText: "Success message",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Input",
  disabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  label: "Full Width Input",
  fullWidth: true,
};

export const Multiline = Template.bind({});
Multiline.args = {
  label: "Multiline Input",
  multiline: true,
  rows: 4,
  placeholder: "Type multiple lines...",
};
