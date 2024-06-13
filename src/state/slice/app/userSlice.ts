import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInformation, UserRole } from '../../../types';
import { User } from '@jupyterlab/services';
import { RootState } from '../../store';

const initialState: UserInformation = {
  identity: null,
  userRole: 'student'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToStudent(state) {
      state.userRole = 'student';
    },
    setToInstructor(state) {
      state.userRole = 'instructor';
    },
    setIdentity(state, action: PayloadAction<User.IIdentity | null>) {
      state.identity = action.payload;
    }
  }
});
export const { setToStudent, setToInstructor, setIdentity } = userSlice.actions;

export const selectIdentity: (state: RootState) => User.IIdentity | null = (
  state: RootState
) => state.user.identity;
export const selectUserRole: (state: RootState) => UserRole = (
  state: RootState
) => state.user.userRole;

export default userSlice.reducer;
