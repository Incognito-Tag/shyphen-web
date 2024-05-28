import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Leads from "../pages/Admin/Leads/Leads";

export const unprotectedRoutes: RouteType[] = [
  {
    path: "/admin/leads",
    element: <Home children={<Leads />} />,
    title: "Login",
    description: "Login page for student",
  },
  {
    path: "/",
    element: <Home children={<>Welcome</>} />,
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
