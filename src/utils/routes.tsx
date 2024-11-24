import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Investments from "../pages/Investments";
import Register from "../pages/Register";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  // {
  //   path: "login",
  //   element: <Login />
  // },
  {
    path: "investments",
    element: <Investments />
  },
  {
    path: "register",
    element: <Register />
  },
  // {
  //   path: "claims",
  //   element: <Claim />
  // }
]);