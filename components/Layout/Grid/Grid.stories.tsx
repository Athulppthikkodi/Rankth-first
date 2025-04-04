import type { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';
import Box from '../Box/Box';

const meta = {
  title: 'Rankth/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive grid system component that supports container and item layouts with customizable spacing and breakpoints.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    container: {
      control: 'boolean',
      description: 'Defines the element as a grid container',
    },
    item: {
      control: 'boolean',
      description: 'Defines the element as a grid item',
    },
    spacing: {
      control: 'number',
      description: 'Spacing between grid items in pixels',
    },
    rowSpacing: {
      control: 'number',
      description: 'Spacing between rows in pixels',
    },
    columnSpacing: {
      control: 'number',
      description: 'Spacing between columns in pixels',
    },
    cols: {
      control: 'number',
      description: 'Number of columns in the grid',
    },
    rows: {
      control: 'number',
      description: 'Number of rows in the grid',
    },
    size: {
      control: 'object',
      description: 'Responsive breakpoint sizes',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

// Helper component for grid items
const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Box
    bgcolor="#e3f2fd"
    padding="20px"
    border="1px solid #90caf9"
    borderRadius="4px"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </Box>
);

export const Basic: Story = {
  args: {
    container: true,
    cols: 3,
    spacing: 2,
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic 3-column grid with equal spacing',
      },
    },
  },
};

export const DifferentSpacing: Story = {
  args: {
    container: true,
    cols: 2,
    rowSpacing: 4,
    columnSpacing: 2,
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with different row and column spacing',
      },
    },
  },
};

export const ResponsiveGrid: Story = {
  args: {
    container: true,
    spacing: 2,
    size: {
      xs: { cols: 1 },
      sm: { cols: 2 },
      md: { cols: 3 },
      lg: { cols: 4 },
    },
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
        <GridItem>Item 7</GridItem>
        <GridItem>Item 8</GridItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid that adapts to different screen sizes',
      },
    },
  },
};

export const NestedGrid: Story = {
  args: {
    container: true,
    cols: 2,
    spacing: 2,
    children: (
      <>
        <Grid container cols={2} spacing={1}>
          <GridItem>Nested 1</GridItem>
          <GridItem>Nested 2</GridItem>
        </Grid>
        <Grid container cols={2} spacing={1}>
          <GridItem>Nested 3</GridItem>
          <GridItem>Nested 4</GridItem>
        </Grid>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with nested grid containers',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    container: true,
    cols: 2,
    spacing: 2,
    sx: {
      backgroundColor: '#f5f5f5',
      padding: '24px',
      borderRadius: '8px',
    },
    children: (
      <>
        <GridItem>Custom Styled 1</GridItem>
        <GridItem>Custom Styled 2</GridItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with custom styling using the sx prop',
      },
    },
  },
};

export const AutoRows: Story = {
  args: {
    container: true,
    cols: 3,
    rows: 2,
    spacing: 2,
    children: Array.from({ length: 6 }, (_, i) => (
      <GridItem key={i}>Auto Row Item {i + 1}</GridItem>
    )),
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with automatic row generation based on content',
      },
    },
  },
};

export const DenseGrid: Story = {
  args: {
    container: true,
    cols: 4,
    spacing: 1,
    sx: { width: '100%' },
    children: Array.from({ length: 12 }, (_, i) => (
      <GridItem key={i}>{i + 1}</GridItem>
    )),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dense grid layout with minimal spacing',
      },
    },
  },
};

export const ComplexLayout: Story = {
  args: {
    container: true,
    spacing: 2,
    size: {
      xs: { cols: 1 },
      sm: { cols: 2 },
      md: { cols: 4 },
    },
    children: (
      <>
        <Grid item sx={{ gridColumn: 'span 2' }}>
          <GridItem>Featured Item</GridItem>
        </Grid>
        {Array.from({ length: 6 }, (_, i) => (
          <GridItem key={i}>Regular Item {i + 1}</GridItem>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex grid layout with featured items and responsive behavior',
      },
    },
  },
};
