import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Earning from "../pages/Earning";
import Claim from "../pages/Claim";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "earnings",
    element: <Earning />
  },
  {
    path: "claims",
    element: <Claim />
  }
]);