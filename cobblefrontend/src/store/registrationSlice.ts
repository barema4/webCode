import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  photos: FileList | null;
  password: string;
  role: string;
}

interface RegistrationState {
  formValues: FormValues;
  loading: boolean;
  error: string | null;
  registrationStatus: number;
}

const initialState: RegistrationState = {
  formValues: {
    firstName: "",
    lastName: "",
    email: "",
    photos: null,
    password: "",
    role: "",
  },
  loading: false,
  error: null,
  registrationStatus: 0,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setFormValues(state, action: PayloadAction<FormValues>) {
      state.formValues = action.payload;
    },
    setRegistrationSuccess(state, action: PayloadAction<number>) {
      state.registrationStatus = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setFormValues,
  setLoading,
  setError,
  setRegistrationSuccess,
  clearError,
} = registrationSlice.actions;
export default registrationSlice.reducer;
