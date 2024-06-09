import { Navigate } from "react-router";
import { StudentHome } from "../pages";

export const usersRoutes: RouteType[] = [
  {
    path: "/user/home",
    element: <StudentHome />,
    title: "Home",
    description: "Home page for student",
  },
  {
    path: "*",
    element: <Navigate to="/user/home" />,
    title: "Home",
    description: "Home page for students",
  },
];
