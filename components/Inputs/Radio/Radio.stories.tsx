import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Radio, { RadioProps } from "./Radio";
import { css } from "@emotion/react";
import RadioGroup from "../RadioGroup/RadioGroup";

export default {
  title: "Rankth/Inputs/Radio",
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable radio button component that supports both controlled and uncontrolled modes. Features different sizes, disabled state, and custom styling options.",
      },
    },
  },
  tags: ["autodocs"],
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
      description: "Disables the radio button when set to true",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Text label to display next to the radio button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    value: {
      control: "text",
      description: "Value associated with the radio button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "required" },
      },
    },
    name: {
      control: "text",
      description: "Name attribute for the radio button group",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Sets the size of the radio button",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    onChange: {
      description:
        "Callback function triggered when radio button state changes",
      table: {
        type: {
          summary: "(event: React.ChangeEvent<HTMLInputElement>) => void",
        },
      },
    },
  },
} as Meta;

const Template: StoryFn<RadioProps> = (args) => <Radio {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default Radio",
  value: "default",
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: "Checked Radio",
  value: "checked",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: "Disabled Radio",
  value: "disabled",
};

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Radio size="small" label="Small Radio" value="small" />
    <Radio size="medium" label="Medium Radio" value="medium" />
    <Radio size="large" label="Large Radio" value="large" />
  </div>
);

export const Group = () => (
  <RadioGroup name="group">
    <Radio name="group" label="Option 1" value="1" />
    <Radio name="group" label="Option 2" value="2" />
    <Radio name="group" label="Option 3" value="3" />
  </RadioGroup>
);

export const CustomStyled = Template.bind({});
CustomStyled.args = {
  label: "Custom Styled Radio",
  value: "custom",
  sx: css`
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 4px;
    &:hover {
      background-color: #e0e0e0;
    }
  `,
};
