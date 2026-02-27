import React, { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { RenderOptions, render } from '@testing-library/react';
import {
  AppStore, setupStore, PreloadedState,
} from '../store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState;
    store?: AppStore;
}

export default function renderWithProvider(
  ui: React.ReactElement,
  {
    preloadedState = { todos: [] },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
