import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth from "./components/authentication/auth.jsx";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Home from "./components/LandingPage/home.jsx";
import ProtectedPage from "./components/LandingPage/ProtectedPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/protectedPage",
    element: (
      <PrivateRoute>
        <ProtectedPage />
      </PrivateRoute>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
