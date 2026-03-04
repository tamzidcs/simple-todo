import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todo, todoState } from '../../interfaces/todo';

const initialState: todoState = { todos: [] };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setAllTodos(state, action: PayloadAction<todo[]>) {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
  },
});

export const { setAllTodos } = todosSlice.actions;
export default todosSlice.reducer;
