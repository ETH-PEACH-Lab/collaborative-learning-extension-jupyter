import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InstructorsGroupName, UserInformation } from '../../../types';
import { User } from '@jupyterlab/services';
import { RootState } from '../../store';

const initialState: UserInformation = {
  identity: null,
  groups: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToStudent(state) {
      state.groups = state.groups.filter(
        group => group !== InstructorsGroupName
      );
    },
    setToInstructor(state) {
      state.groups = [...state.groups, InstructorsGroupName];
    },
    setUserInformation(state, action: PayloadAction<UserInformation>) {
      state.identity = action.payload.identity;
      state.groups = action.payload.groups;
    }
  }
});
export const { setToStudent, setToInstructor, setUserInformation } =
  userSlice.actions;

export const selectIdentity: (state: RootState) => User.IIdentity | null = (
  state: RootState
) => state.user.identity;
export const selectGroups: (state: RootState) => string[] = (
  state: RootState
) => state.user.groups;

export default userSlice.reducer;
