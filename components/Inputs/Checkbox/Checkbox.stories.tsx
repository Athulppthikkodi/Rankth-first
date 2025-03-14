import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Checkbox from "./Checkbox";
import { css } from "@emotion/react";

export default {
  title: "Rankth/Inputs/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'A customizable checkbox component that supports both controlled and uncontrolled modes. It can be styled using Emotion CSS and supports different sizes.',
      },
    },
  },
  tags:["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controls the checked state in controlled mode",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox when set to true",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Text label to display next to the checkbox",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Sets the size of the checkbox",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    onChange: {
      description: "Callback function triggered when checkbox state changes",
      table: {
        type: { summary: "(event: React.ChangeEvent<HTMLInputElement>) => void" },
        defaultValue: { summary: "undefined" },
      },
    },
    sx: {
      description: "Emotion CSS styles to customize the checkbox container",
      table: {
        type: { summary: "SerializedStyles" },
        defaultValue: { summary: "{}" },
      },
    },
  },
} as Meta;

const Template: StoryFn = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default Checkbox",
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: "Checked Checkbox",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: "Disabled Checkbox",
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  size: "large",
  label: "Large Checkbox",
};

export const CustomStyled = Template.bind({});
CustomStyled.args = {
  label: "Custom Styled Checkbox",
  sx: css({ border: "2px solid red", padding: "4px" }),
};
