import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersStateType, UserType } from "../types/types";

const usersInitialState: UsersStateType = {
  user: {
    data: null,
    isLoading: false,
    errors: '',
  }
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {
    
    getUserAction: (state: UsersStateType) => {
      state.user.isLoading = true;
      state.user.errors = '';
    },
    getUserSuccessAction: (state: UsersStateType, { payload: user }: PayloadAction<UserType>) => {
      state.user.isLoading = false;
      state.user.data = user;
    },
    getUserErrorAction: (state: UsersStateType, { payload: error }: PayloadAction<string>) => {
      state.user.isLoading = false;
      state.user.errors = error;
    },
  }
})

export const {getUserAction, getUserSuccessAction, getUserErrorAction} = usersSlice.actions;

export default usersSlice.reducer;