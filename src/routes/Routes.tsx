import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScreenLayout from "../layout/ScreenLayout";
import { routeInterface, screens } from ".";




const childRoutes = (Layout: any, routes: Array<any>) =>
  routes.map(
    (
      { children, path, component: Component, name, breadcrumb}: routeInterface,
      index: number
    ) =>
      children ? (
        // Route item with children
        children.map(
          (
            { path, component: Component, name, breadcrumb }: routeInterface,
            index: number
          ) => (
            <Route
              key={index}
              path={path}
              element={
                <Layout breadcrumb={breadcrumb}>
                  <Component ComponentName={name} />
                </Layout>
              }
            />
          )
        )
      ) : (
        // Route item without children
        <Route
          key={index}
          path={path}
          element={
            <Layout breadcrumb={breadcrumb}>
              <Component ComponentName={name} />
            </Layout>
          }
        />
      )
  );

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          {childRoutes(ScreenLayout, screens)}
        </Routes>
    </Router>
  );
};



export default AppRoutes;
