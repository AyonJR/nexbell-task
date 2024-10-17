import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from 'notistack';  // Import SnackbarProvider
import App from "./App.jsx";
import "./index.css";
import Home from "./Home/Home.jsx";
import Login from "./Authentication/Login.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import Signup from "./Authentication/Signup.jsx";
import Cart from "./UserCart/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>  
        <RouterProvider router={router} />
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>
);
