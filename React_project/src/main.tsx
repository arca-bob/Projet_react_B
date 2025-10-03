import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {HOME, Userdetails} from "./constant/route.ts"
import Userdetail from "./pages/UserDetails.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: Userdetails,
        element: <Userdetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <RouterProvider router={router} />
  </StrictMode>
);
