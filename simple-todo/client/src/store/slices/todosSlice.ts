import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todo } from '../../interfaces/todo';

const initialState: todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setAllTodos(state, action: PayloadAction<todo[]>) {
      // eslint-disable-next-line no-param-reassign
      state = action.payload;
    },
  },
});

export const { setAllTodos } = todosSlice.actions;
export default todosSlice.reducer;
