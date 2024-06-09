import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { currState } from "../utils/helpers";

const RouteTypeContext = createContext<RouteTypeContextInterface>(
  {} as RouteTypeContextInterface
);

export const RouteTypeContextProvider = ({ children }: { children: any }) => {
  const location = useLocation();
  const [type, setType] = useState<number>(currState.UNPROTECTED);
  console.log(location.pathname);
  useEffect(() => {
    if (
      location.pathname.includes("/admin/") &&
      !location.pathname.includes("/auth")
    ) {
      setType(currState.ADMIN);
    } else if (
      location.pathname.includes("/user/") &&
      !location.pathname.includes("/auth/")
    ) {
      setType(currState.USER);
    }
  }, [location]);
  const cachedValue = useMemo(
    () => ({
      type: type,
      setType: setType,
    }),
    [type]
  );
  console.log(type);
  return (
    <RouteTypeContext.Provider value={cachedValue}>
      {type != currState.UNKNOWN && children}
    </RouteTypeContext.Provider>
  );
};

export default function useRouteTypeContext() {
  return useContext(RouteTypeContext);
}
