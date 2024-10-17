import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home/Home.jsx";
import Login from "./Authentication/Login.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/' , 
        element: <Home></Home>
      },
      {
        path: '/login' , 
        element: <Login></Login>
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
  <RouterProvider router={router} />

  </AuthProvider>
  </StrictMode>
);
