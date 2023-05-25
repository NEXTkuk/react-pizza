import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Header from './components/Header';
import NotFoundBlock from './components/NotFoundBlock';

import App from './App';

import { store } from './redux/store';

const router = createBrowserRouter([
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
        path: '*',
        element: <NotFoundBlock />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* <Router>
      <App />
    </Router> */}
  </React.StrictMode>
);
