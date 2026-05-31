// src/App.jsx
import { createHashRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Library from './pages/Library';
import CustomPage from './pages/CustomPage';
import customPagesConfig from './siteconfig/pages.json';

const dynamicRoutes = customPagesConfig.map(page => ({
  path: page.slug,
  element: <CustomPage />,
}));

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'games/:slug',
        element: <GameDetail />,
      },
      {
        path: 'library',
        element: <Library />,
      },
        ...dynamicRoutes
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}