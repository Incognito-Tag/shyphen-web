import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Leads from "../pages/Admin/Leads/Leads";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import Followup from "../pages/Admin/Followup/Followup";

export const unprotectedRoutes: RouteType[] = [
  {
    path: "/admin/followup",
    element: <Home children={<Followup />} />,
    title: "Follow Up",
    description: "Follow up page for admin",
  },
  {
    path: "/admin/userManagement",
    element: <Home children={<UserManagement />} />,
    title: "User Management",
    description: "User Management for admin",
  },
  {
    path: "/admin/leads",
    element: <Home children={<Leads />} />,
    title: "Leads",
    description: "Leads page for admin",
  },
  {
    path: "/",
    element: <Home children={<>Welcome</>} />,
    title: "Home",
    description: "Home page for admin",
  },
  {
    path: "*",
    element: <Navigate to="/" />,
    title: "Login",
    description: "Login page for Student",
  },
];
