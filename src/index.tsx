import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';

import { Header, NotFoundBlock } from './components';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import App from './App';
import { store } from './redux/store';

// const router = createBrowserRouter([
// GitHub Pages Fix
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundBlock />,
    children: [
      {
        path: '/',
        element: <Header />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: '*',
        element: <NotFoundBlock />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
