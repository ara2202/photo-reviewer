import React, {ReactNode} from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import imagesReducer, {initialState} from './store/imagesSlice';

function render(
  ui: React.ReactElement,
  {

    store = configureStore({ reducer: { images: imagesReducer }, preloadedState: {images: initialState} }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: {children?: ReactNode | undefined }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }