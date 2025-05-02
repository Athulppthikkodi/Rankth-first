import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userId: string; // Add userId as optional property
  agencyId: string; // Add userId as optional propertyId
}

const initialState: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  userId: "",
  role: "SYSTEM_ADMIN",
  agencyId: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    setNameData: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        userId?: string;
      }>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      if (action.payload.userId) {
        state.userId = action.payload.userId;
      }
    },
    setAgencyId: (state, action: PayloadAction<{ agencyId: string }>) => {
      state.agencyId = action.payload.agencyId;
    },
  },
});

export const { setRegisterData, setNameData, setAgencyId } = formSlice.actions;
export default formSlice.reducer;
