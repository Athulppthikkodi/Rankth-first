// Navbar.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Navbar from "./Menu";

// Meta Configuration
export default {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {
    onIconClick: { action: "icon clicked" },
  },
} as Meta<typeof Navbar>;

// Template for Story
const Template: StoryFn<typeof Navbar> = (args) => <Navbar {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {};
