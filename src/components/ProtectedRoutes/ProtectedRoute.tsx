import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthAdmin from "../../context/AdminAuthContext";
import useAuthUser from "../../context/UserAuthContext";

const ProtectedRoutes = (props: any) => {
  const { type, children } = props;
  let user: ADMIN | USER | undefined = undefined;
  console.log(type);
  if (type === "admin") {
    const { admin } = useAuthAdmin();
    console.log(admin);
    user = admin;
  } else {
    const User = useAuthUser();
    user = User.user;
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      if (type === "admin") {
        navigate("/admin/home");
        return;
      } else {
        navigate("/user/home");
        return;
      }
    }
  }, [user, type]);
  return children;
};

export default ProtectedRoutes;
