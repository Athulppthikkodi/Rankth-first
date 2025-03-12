import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';
import React from 'react';

const meta = {
  title: 'Rankth/Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'aside'],
      description: 'HTML element to render',
    },
    display: {
      control: 'select',
      options: ['block', 'flex', 'grid', 'inline', 'none'],
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the box (px, %, rem, etc.)',
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the box (px, %, rem, etc.)',
    },
    margin: {
      control: { type: 'text' },
      description: 'Margin around the box (px, rem, etc.)',
    },
    padding: {
      control: { type: 'text' },
      description: 'Padding inside the box (px, rem, etc.)',
    },
    bgcolor: {
      control: { type: 'color' },
      description: 'Background color of the box',
    },
    border: {
      control: { type: 'text' },
      description: 'CSS border property (e.g., "1px solid black")',
    },
    borderRadius: {
      control: { type: 'text' },
      description: 'Border radius of the box (px, rem, etc.)',
    },
    boxShadow: {
      control: { type: 'text' },
      description: 'CSS box-shadow property',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to render inside the box',
    }
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  args: {
    children: 'Basic Box',
    padding: '20px',
    bgcolor: '#f5f5f5',
    border: '1px solid #ddd',
  },
};

export const FlexContainer: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Box display="flex" padding="20px" bgcolor="#e3f2fd" sx={{ gap: '10px' }}>
      <Box padding="10px" bgcolor="#bbdefb">Item 1</Box>
      <Box padding="10px" bgcolor="#bbdefb">Item 2</Box>
      <Box padding="10px" bgcolor="#bbdefb">Item 3</Box>
    </Box>
  ),
};

export const WithSxProp: Story = {
  args: {
    children: 'Custom Styled Box',
    sx: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      padding: '20px',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
  },
};

export const ResponsiveBox: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box
      sx={{
        padding: ['10px', '20px', '30px'],
        width: ['100%', '80%', '60%'],
        bgcolor: '#f0f4c3',
        '@media (max-width: 600px)': {
          bgcolor: '#dcedc8',
        },
      }}
    >
      Responsive Box
    </Box>
  ),
};

export const NestedLayout: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        bgcolor: '#f5f5f5',
        minHeight: '200px',
      }}
    >
      <Box sx={{ padding: '10px', bgcolor: '#e0e0e0' }}>Header</Box>
      <Box sx={{ padding: '20px', bgcolor: '#ffffff', flex: 1 }}>Content</Box>
      <Box sx={{ padding: '10px', bgcolor: '#e0e0e0' }}>Footer</Box>
    </Box>
  ),
};
