import React, { type PropsWithChildren, type ReactElement } from 'react';
import { Provider } from 'react-redux';
import { type RenderOptions, render } from '@testing-library/react';
import { configureStore, type PreloadedState } from '@reduxjs/toolkit';
import type {
  AppStore,
  RootState,
} from '../store/store';
import todoReducer from '../store/slices/todosSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export default function renderWithProvider(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: todoReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
