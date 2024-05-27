import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

export const unprotectedRoutes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
    title: "Login",
    description: "Login page for student",
  },
  {
    path: "*",
    element: <Navigate to="/" />,
    title: "Login",
    description: "Login page for Student",
  },
];
