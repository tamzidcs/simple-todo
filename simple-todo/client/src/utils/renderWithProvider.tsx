import React, { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { RenderOptions, render } from '@testing-library/react';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import {
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
  function Wrapper({ children }: PropsWithChildren<{}>): React.ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
