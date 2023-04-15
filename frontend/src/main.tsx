import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Root } from "./routes/root";
import { Profile } from "./routes/profile"
import { Home } from "./routes/homepage"
//import { Nancy } from "./routes/nancy"
import Connect from './routes/connect';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Marketplace from './routes/marketplace';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "connectwallet",
        element: <Connect />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
