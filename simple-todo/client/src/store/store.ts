import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todosSlice';
// import { todoState } from '../interfaces/todoState';

const rootReducer = combineReducers({
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type PreloadedState = Parameters<typeof rootReducer>[0];

export function setupStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
