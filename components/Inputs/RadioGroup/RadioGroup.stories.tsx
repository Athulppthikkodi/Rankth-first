import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import RadioGroup from "./RadioGroup";
import Radio from "../Radio/Radio"; // Assuming you have a Radio component

export default {
  title: "Rankth/Inputs/RadioGroup",
  component: RadioGroup,
  tags:["autodocs"],
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["row", "column"],
      description: "Layout direction of radio buttons - horizontal or vertical",
    },
    value: {
      description: "Selected value for controlled component",
    },
    name: {
      description: "Name attribute for the radio group",
    },
    onChange: {
      description: "Callback function triggered when selection changes",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A RadioGroup component that manages a group of Radio buttons.

## Usage

- Use for exclusive selection from a list of options
- Can be used in both controlled and uncontrolled forms
- Supports vertical and horizontal layouts

## Accessibility
- Uses native radio inputs for keyboard navigation
- Maintains proper ARIA attributes
        `,
      },
    },
  },
} as Meta<typeof RadioGroup>;

// Template for uncontrolled RadioGroup
const TemplateUncontrolled: StoryFn<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} name="exampleUncontrolled">
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" disabled />
  </RadioGroup>
);

// Template for controlled RadioGroup
const TemplateControlled: StoryFn<typeof RadioGroup> = (args) => {
  const [selected, setSelected] = useState("option1");

  return (
    <RadioGroup
      {...args}
      name="exampleControlled"
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" disabled />
    </RadioGroup>
  );
};

export const Uncontrolled = TemplateUncontrolled.bind({});
Uncontrolled.args = {
  direction: "column",
};
Uncontrolled.parameters = {
  docs: {
    description: {
      story: "Uncontrolled version where the component manages its own state internally.",
    },
  },
};

export const Controlled = TemplateControlled.bind({});
Controlled.args = {
  direction: "row",
};
Controlled.parameters = {
  docs: {
    description: {
      story: "Controlled version where the parent component manages the state.",
    },
  },
};
