import { Navigate } from "react-router";
import Home from "../pages/Home";
import Followup from "../pages/Admin/Followup/Followup";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import Leads from "../pages/Admin/Leads/Leads";

export const adminRoutes: RouteType[] = [
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
  // TODO
  // replace admin/home with dashboard
  {
    path: "/admin/home",
    element: <Home children={<>Welcome</>} />,
    title: "Home",
    description: "Home page for admin",
  },
  {
    path: "*",
    element: <Navigate to="/admin/home" replace />,
    title: "Home",
    description: "Home page for students",
  },
];
