import { Route, Routes } from "react-router-dom";
import { AppWrapper, MetaDecoratedPage } from "../components";
import { unprotectedRoutes } from "./routes";
import useRouteTypeContext from "../context/RouteTypeContext";
import { currState } from "../utils/helpers";

const Router = () => {
  const { type } = useRouteTypeContext();
  return (
    <>
      {/* {type === currState.STUDENT && (
        <AuthContextProviderStudent>
          <ProtectedRoutes type="student">
            <Routes>
              <Route element={<AppWrapper />}>
                {studentRoutes.map((route) => {
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
        </AuthContextProviderStudent>
      )} */}
      {type === currState.UNPROTECTED && (
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
      )}
    </>
  );
};

export default Router;
