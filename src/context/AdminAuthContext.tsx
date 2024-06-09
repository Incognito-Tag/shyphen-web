import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRouteTypeContext from "./RouteTypeContext";
import { requestUserDetails } from "../utils/apiCalls";
import Cookies from "js-cookie";
import { currState } from "../utils/helpers";

const AuthContextAdmin = createContext<AuthContextTypeAdmin>(
  {} as AuthContextTypeAdmin
);

export const AuthContextProviderAdmin = ({ children }: { children: any }) => {
  const [admin, setAdmin] = useState<ADMIN | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();
  const getLoggedIn = async () => {
    try {
      const jwtToken = Cookies.get("token");
      console.log(jwtToken);
      if (jwtToken !== undefined) {
        setLoading(true);
        const loggedInResponse = await requestUserDetails(jwtToken);
        console.log(loggedInResponse);
        setLoading(false);
        setError(false);
        if (loggedInResponse.status === 200) {
          setLoggedIn(true);
          setAdmin(loggedInResponse.data);
        } else {
          setLoggedIn(false);
          setAdmin(undefined);
        }
        setFetched(true);
      } else {
        setType(currState.UNPROTECTED);
        navigate("/");
      }
    } catch (e) {
      setLoggedIn(false);
      setLoading(false);
      setAdmin(undefined);
      setError(true);
      setFetched(true);
    }
  };

  const location = useLocation();

  // If we change page, reset the error state.
  useEffect(() => {
    if (location.pathname.includes("/student/")) {
      if (error) setError(false);
      setFetched(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname.includes("/admin/") &&
      !location.pathname.includes("/student/")
    ) {
      getLoggedIn();
    }
  }, []);

  const cachedValue = useMemo(
    () => ({
      admin: admin,
      isLoggedIn: loggedIn,
      isLoading: loading,
      error: error,
      isFetched: fetched,
    }),
    [admin, loggedIn, loading, error]
  );
  return (
    <AuthContextAdmin.Provider value={cachedValue}>
      {!loading && children}
    </AuthContextAdmin.Provider>
  );
};

export default function useAuthAdmin() {
  return useContext(AuthContextAdmin);
}
