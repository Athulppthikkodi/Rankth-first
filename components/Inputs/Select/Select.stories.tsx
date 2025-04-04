import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Select from "./Select";

export default {
  title: "Rankth/Inputs/Select",
  component: Select,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled"],
    },
   
    selectSize: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    fullWidth: { control: "boolean" },
    error: { control: "boolean" },
    required: { control: "boolean" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    showCheckmark: { control: "boolean" }, // ✅ New Prop
  },
  tags: ["autodocs"],
} as Meta;

const options = [
  { value: "apple", label: "Apple " },
  { value: "banana", label: "Banana 🍌" },
  { value: "grapes", label: "Grapes 🍇" },
  { value: "orange", label: "Orange 🍊" },
  { value: "mango", label: "Mango 🥭" },
];

// Base Template
const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

// Basic Select
export const Basic = Template.bind({});
Basic.args = {
  label: "Select a fruit",
  options,
  placeholder: "Choose one",
};

// Multi-select with Chips
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  label: "Select multiple fruits",
  options,
  multiple: true,
  placeholder: "Choose fruits",
};

// Multi-select with Checkmarks ✅
export const MultiSelectWithCheckmarks = Template.bind({});
MultiSelectWithCheckmarks.args = {
  label: "Select fruits with checkmarks",
  options,
  multiple: true,
  showCheckmark: true,
  placeholder: "Choose fruits",
};

// Outlined Variant
export const Outlined = Template.bind({});
Outlined.args = {
  label: "Outlined Select",
  variant: "outlined",
  options,
};

// Filled Variant
export const Filled = Template.bind({});
Filled.args = {
  label: "Filled Select",
  variant: "filled",
  options,
};

// Disabled Select
export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Select",
  options,
  disabled: true,
};

// Error State
export const ErrorState = Template.bind({});
ErrorState.args = {
  label: "Select with error",
  options,
  error: true,
  helperText: "This field is required",
};

// Full Width Select
export const FullWidth = Template.bind({});
FullWidth.args = {
  label: "Full Width Select",
  options,
  fullWidth: true,
};

// Required Select
export const Required = Template.bind({});
Required.args = {
  label: "Required Select",
  options,
  required: true,
};
