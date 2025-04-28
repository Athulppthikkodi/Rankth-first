import type { Meta, StoryObj } from '@storybook/react';
import Chip from '@/components/DataDisplay/Chip/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Rankth/Data Display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chip component is used to display small information blocks or tags.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['high', 'medium', 'low', 'link-building'],
      description: 'Type of the chip which determines its appearance'
    },
    text: {
      control: 'text',
      description: 'Text to be displayed in the chip'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const High: Story = {
  args: {
    type: 'high',
    text: 'High Priority'
  }
};

export const Low: Story = {
  args: {
    type: 'low',
    text: 'Low Priority'
  }
};

export const Medium: Story = {
  args: {
    type: 'medium',
    text: 'Medium Priority'
  }
};

export const LinkBuilding: Story = {
  args: {
    type: 'link-building',
    text: 'Link Building'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Chip type="high" text="High Priority" />
      <Chip type="medium" text="Medium Priority" />
      <Chip type="low" text="Low Priority" />
      <Chip type="link-building" text="Link Building" />
    </div>
  )
};
