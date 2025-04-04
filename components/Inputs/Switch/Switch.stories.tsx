// import React, { useState } from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import Switch, { SwitchProps } from './Switch';

// const meta: Meta<typeof Switch> = {
//   title: 'Rankth/Inputs/Switch',
//   component: Switch,
//   parameters: {
//     layout: 'centered',
//   },
//   tags: ['autodocs'],
//   argTypes: {
//     checked: { control: 'boolean' },
//     disabled: { control: 'boolean' },
//     color: { 
//       control: { type: 'select' }, 
//       options: ['primary', 'secondary', 'error'] 
//     },
//     size: { 
//       control: { type: 'select' }, 
//       options: ['small', 'medium', 'large'] 
//     },
//     onChange: { action: 'changed' },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof Switch>;

// // Default story
// export const Default: Story = {
//   args: {
//     checked: false,
//     disabled: false,
//     color: 'primary',
//     size: 'medium',
//   },
// };

// // Different colors
// export const Primary: Story = {
//   args: {
//     checked: true,
//     color: 'primary',
//   },
// };

// export const Secondary: Story = {
//   args: {
//     checked: true,
//     color: 'secondary',
//   },
// };

// export const Error: Story = {
//   args: {
//     checked: true,
//     color: 'error',
//   },
// };

// // Different sizes
// export const Small: Story = {
//   args: {
//     checked: true,
//     size: 'small',
//   },
// };

// export const Medium: Story = {
//   args: {
//     checked: true,
//     size: 'medium',
//   },
// };

// export const Large: Story = {
//   args: {
//     checked: true,
//     size: 'large',
//   },
// };

// // Disabled states
// export const DisabledUnchecked: Story = {
//   args: {
//     checked: false,
//     disabled: true,
//   },
// };

// export const DisabledChecked: Story = {
//   args: {
//     checked: true,
//     disabled: true,
//   },
// };

// // Interactive example
// const InteractiveSwitch: React.FC<SwitchProps> = (args) => {
//   const [isChecked, setIsChecked] = useState(false);
  
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsChecked(event.target.checked);
//     args.onChange?.(event);
//   };
  
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
//       <Switch {...args} checked={isChecked} onChange={handleChange} />
//       <p>Switch is {isChecked ? 'ON' : 'OFF'}</p>
//     </div>
//   );
// };

// export const Interactive: Story = {
//   render: (args) => <InteractiveSwitch {...args} />,
// };

// // Custom styling
// export const CustomStyling: Story = {
//   args: {
//     checked: true,
//     sx: {
//       boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
//       ['& > span' as any]: {
//         backgroundColor: '#9c27b0',
//       },
//       ['& > span::before' as any]: {
//         backgroundColor: '#ffeb3b',
//       },
//     },
//   },
// };

// // A group of switches 
// interface SwitchStates {
//   switch1: boolean;
//   switch2: boolean;
//   switch3: boolean;
// }

// const SwitchGroupComponent: React.FC = () => {
//   const [states, setStates] = useState<SwitchStates>({
//     switch1: true,
//     switch2: false,
//     switch3: true,
//   });
  
//   const handleChange = (name: keyof SwitchStates) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     setStates({
//       ...states,
//       [name]: event.target.checked,
//     });
//   };
  
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//         <Switch checked={states.switch1} onChange={handleChange('switch1')} color="primary" />
//         <span>Notifications</span>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//         <Switch checked={states.switch2} onChange={handleChange('switch2')} color="secondary" />
//         <span>Dark Mode</span>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//         <Switch checked={states.switch3} onChange={handleChange('switch3')} color="error" />
//         <span>Do Not Disturb</span>
//       </div>
//     </div>
//   );
// };

// export const SwitchGroup: Story = {
//   render: () => <SwitchGroupComponent />,
// };