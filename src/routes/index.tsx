import { Route, Routes } from "react-router-dom";
import { AppWrapper, MetaDecoratedPage, ProtectedRoutes } from "../components";
import { unprotectedRoutes } from "./routes";
import useRouteTypeContext from "../context/RouteTypeContext";
import { currState } from "../utils/helpers";
import { AuthContextProviderAdmin } from "../context/AdminAuthContext";
import { adminRoutes } from "./admin.routes";

const Router = () => {
  const { type } = useRouteTypeContext();
  console.log(type, currState);
  return (
    <>
      {type === currState.ADMIN && (
        <AuthContextProviderAdmin>
          <ProtectedRoutes type="admin">
            <Routes>
              <Route element={<AppWrapper />}>
                {adminRoutes.map((route) => {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <MetaDecoratedPage
                          title={route.title}
                          description={route.description}
                          element={route.element}
                        />
                      }
                    >
                      {route.children}
                    </Route>
                  );
                })}
              </Route>
            </Routes>
          </ProtectedRoutes>
        </AuthContextProviderAdmin>
      )}
      {type === currState.UNPROTECTED ? (
        <Routes>
          <Route element={<AppWrapper />}>
            {unprotectedRoutes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <MetaDecoratedPage
                      title={route.title}
                      description={route.description}
                      element={route.element}
                    />
                  }
                >
                  {route.children}
                </Route>
              );
            })}
          </Route>
        </Routes>
      ) : null}
    </>
  );
};

export default Router;
