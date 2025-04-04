import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import store from './services/store';

/**
 * Контейнер, в который React будет монтировать приложение.
 */
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);

/**
 * Монтируем корневой компонент App в DOM,
 * оборачивая его в провайдеры Router и Redux store.
 */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
