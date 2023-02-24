import * as React from 'react';
import './style.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Page1 } from './page-1';
import { Page2 } from './page-2';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page1 />,
  },
  {
    path: "/page-1",
    element: <Page1 />,
  },
  {
    path: "/page-2",
    element: <Page2 />,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}
