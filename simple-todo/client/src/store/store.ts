import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todosSlice';

const rootReducer = combineReducers({
  todos: todoReducer,
});

export type PreloadedState = Parameters<typeof rootReducer>[0];

export function setupStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
