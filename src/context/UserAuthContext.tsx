import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRouteTypeContext from "./RouteTypeContext";
import { requestUserDetails } from "../utils/apiCalls";
import Cookies from "js-cookie";
import { currState } from "../utils/helpers";

const AuthContextUser = createContext<AuthContextTypeUser>(
  {} as AuthContextTypeUser
);

export const AuthContextProviderUser = ({ children }: { children: any }) => {
  const [user, setUser] = useState<USER | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const { setType } = useRouteTypeContext();
  const navigate = useNavigate();
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
          setUser(loggedInResponse.data);
        } else {
          setLoggedIn(false);
          setUser(undefined);
        }
        setFetched(true);
      } else {
        setType(currState.UNPROTECTED);
        navigate("/");
      }
    } catch (e) {
      setLoggedIn(false);
      setLoading(false);
      setUser(undefined);
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
      location.pathname.includes("/user/") &&
      !location.pathname.includes("/student/")
    ) {
      getLoggedIn();
    }
  }, []);

  const cachedValue = useMemo(
    () => ({
      user: user,
      isLoggedIn: loggedIn,
      isLoading: loading,
      error: error,
      isFetched: fetched,
    }),
    [user, loggedIn, loading, error]
  );
  return (
    <AuthContextUser.Provider value={cachedValue}>
      {!loading && children}
    </AuthContextUser.Provider>
  );
};

export default function useAuthUser() {
  return useContext(AuthContextUser);
}
