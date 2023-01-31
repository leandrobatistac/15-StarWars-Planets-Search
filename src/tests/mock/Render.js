import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import globalState from '../../redux/reducers/globalState';

export const renderWithRedux = (component, initialState={}) => {
  const store = configureStore({
    reducer: {
      globalState,
    },
    preloadedState: initialState,
  });

  return {
    ...render(
      <Provider store={ store }>
        {component}
      </Provider>,
    ),
    store,
  };
};

export default renderWithRedux;
