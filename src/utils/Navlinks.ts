import Dashboard from "../assets/imgs/Dashboard.svg";
import FollowUp from "../assets/imgs/FollowUp.svg";
import Leads from "../assets/imgs/Leads.svg";
import Attendance from "../assets/imgs/Attendance.svg";
import UserManagement from "../assets/imgs/UserManagement.svg";
import Calender from "../assets/imgs/Calender.svg";
import Setting from "../assets/imgs/Setting.svg";
import SignOut from "../assets/imgs/SignOut.svg";
export const NavLinks = [
  {
    label: "Dashboard",
    icon: Dashboard,
    route: "/",
  },
  {
    label: "Follow Up",
    icon: FollowUp,
    route: "/admin/followup",
  },
  {
    label: "Leads",
    icon: Leads,
    route: "/admin/leads",
  },
  {
    label: "Attendance",
    icon: Attendance,
    route: "/",
  },
  {
    label: "User Management",
    icon: UserManagement,
    route: "/admin/userManagement",
  },
  {
    label: "Calender",
    icon: Calender,
    route: "/",
  },
  {
    label: "Setting",
    icon: Setting,
    route: "/",
  },
  {
    label: "Sign Out",
    icon: SignOut,
    route: "/",
  },
];
