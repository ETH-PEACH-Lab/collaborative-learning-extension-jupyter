import { configureStore } from '@reduxjs/toolkit';
import fieldSlice from './slice/yjs/fieldSlice';
import cellsSlice from './slice/yjs/cellsSlice';
import userSlice from './slice/app/userSlice';
import kernelExecutionResultSlice from './slice/app/kernelExecutionResultSlice';
import kernelTestResultSlice from './slice/app/kernelTestResultSlice';

export const store = configureStore({
  reducer: {
    fields: fieldSlice,
    cells: cellsSlice,
    user: userSlice,
    kernelExecutionResult: kernelExecutionResultSlice,
    kernelTestResult: kernelTestResultSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
