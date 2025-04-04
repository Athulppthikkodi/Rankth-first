// import type { Meta, StoryObj } from '@storybook/react';
// import Modal from './Modal';
// import { useState } from 'react';

// const meta: Meta<typeof Modal> = {
//   title: 'Components/Modal',
//   component: Modal,
//   tags: ['autodocs'],
//   parameters: {
//     layout: 'centered',
//   },
// };

// export default meta;
// type Story = StoryObj<typeof Modal>;

// const ModalDemo = (args: any) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <button onClick={() => setOpen(true)}>Open Modal</button>
//       <Modal {...args} open={open} onClose={() => setOpen(false)}>
//         <h2>Modal Title</h2>
//         <p>This is the modal content. You can put anything here.</p>
//         <button onClick={() => setOpen(false)}>Close</button>
//       </Modal>
//     </>
//   );
// };

// export const Default: Story = {
//   render: (args) => <ModalDemo {...args} />
// };

// export const CustomStyle: Story = {
//   render: (args) => (
//     <ModalDemo
//       {...args}
//       sx={{
//         backgroundColor: '#f0f0f0',
//         width: '300px',
//         padding: '24px',
//       }}
//     />
//   ),
// };

// export const NestedModal: Story = {
//   render: (args) => {
//     const [firstOpen, setFirstOpen] = useState(false);
//     const [secondOpen, setSecondOpen] = useState(false);
//     const [thirdOpen, setThirdOpen] = useState(false);

//     return (
//       <>
//         <button onClick={() => setFirstOpen(true)}>Open First Modal</button>
//         <Modal 
//           open={firstOpen} 
//           onClose={() => setFirstOpen(false)}
//           sx={{ width: '500px' }}
//         >
//           <h2>First Modal</h2>
//           <p>This is the first level modal</p>
//           <button onClick={() => setSecondOpen(true)}>Open Second Modal</button>
//           <button 
//             onClick={() => setFirstOpen(false)}
//             style={{ marginLeft: '8px' }}
//           >
//             Close
//           </button>

//           <Modal
//             open={secondOpen}
//             onClose={() => setSecondOpen(false)}
//             parentModal={false}
//             sx={{ width: '400px' }}
//           >
//             <h3>Second Modal</h3>
//             <p>This is the second level modal</p>
//             <button onClick={() => setThirdOpen(true)}>Open Third Modal</button>
//             <button 
//               onClick={() => setSecondOpen(false)}
//               style={{ marginLeft: '8px' }}
//             >
//               Close
//             </button>

//             <Modal
//               open={thirdOpen}
//               onClose={() => setThirdOpen(false)}
//               parentModal={false}
//               sx={{ width: '300px' }}
//             >
//               <h3>Third Modal</h3>
//               <p>This is the third level modal</p>
//               <button onClick={() => setThirdOpen(false)}>Close</button>
//             </Modal>
//           </Modal>
//         </Modal>
//       </>
//     );
//   },
// };

// export const NonDismissible: Story = {
//   render: (args) => (
//     <ModalDemo
//       {...args}
//       disableBackdropClick={true}
//     />
//   ),
// };
