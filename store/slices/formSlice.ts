import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  userId: string;  // Add userId as optional property
}

const initialState: FormState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  userId: '',
  role: 'SYSTEM_ADMIN',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setNameData: (state, action: PayloadAction<{ firstName: string; lastName: string; userId?: string }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      if (action.payload.userId) {
        state.userId = action.payload.userId;
      }
    }
  }
});

export const { setRegisterData, setNameData } = formSlice.actions;
export default formSlice.reducer;