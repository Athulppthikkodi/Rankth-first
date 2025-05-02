/** @jsxImportSource @emotion/react */
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Avatar from "../Avatar/Avatar";
import AvatarGroup from "./AvatarGroup";

export default {
  title: "Rankth/Datadisplay/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  argTypes: {
    max: {
      control: { type: "number" },
      description: "Max number of avatars to display before showing +X.",
    },
    spacing: {
      control: { type: "number" },
      description: "Spacing between avatars.",
    },
    sx: {
      control: "object",
      description: "Custom styles using Emotion's CSSObject.",
    },
  },
} as Meta;

const avatars = [
  { src: "https://via.placeholder.com/150", alt: "User 1" },
  { src: "https://via.placeholder.com/150", alt: "User 2" },
  { src: "https://via.placeholder.com/150", alt: "User 3" },
  { src: "https://via.placeholder.com/150", alt: "User 4" },
  { src: "https://via.placeholder.com/150", alt: "User 5" },
];

const Template: StoryFn<typeof AvatarGroup> = (args) => (
  <AvatarGroup {...args}>
    {avatars.map((avatar, index) => (
      <Avatar key={index} src={avatar.src} alt={avatar.alt} size="medium" />
    ))}
  </AvatarGroup>
);

export const Default = Template.bind({});
Default.args = {
  max: 3,
  spacing: -8,
};

export const NoLimit = Template.bind({});
NoLimit.args = {
  max: undefined,
  spacing: -8,
};

export const CustomSpacing = Template.bind({});
CustomSpacing.args = {
  max: 4,
  spacing: -4,
};

export const NoAvatars = Template.bind({});
NoAvatars.args = {
  max: 0,
  spacing: -8,
};
