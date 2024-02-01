import { Suspense, useContext, lazy } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isUserLoggedIn } from "../utility/Utils";
import { useLayout } from "../utility/hooks/useLayout";
import { AbilityContext } from "../utility/context/Can";
import { useRouterTransition } from "../utility/hooks/useRouterTransition";
import LayoutWrapper from "../@core/layouts/components/layout-wrapper/index";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "./routes.js";
import BlankLayout from "../@core/layouts/BlankLayout";
import VerticalLayout from "../layouts/VerticalLayout";
import HorizontalLayout from "../@core/layouts/HorizontalLayout";
import { selectCurrentUserRole } from "../redux/index.selectors";
import { defaultRoute } from "../redux/auth/auth.ability";

const Router = ({ currentUserRole }) => {
  const [layout, setLayout] = useLayout();
  const [transition, setTransition] = useRouterTransition();

  const ability = useContext(AbilityContext);

  const DefaultLayout =
    layout === "horizont  al" ? "HorizontalLayout" : "VerticalLayout";

  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout };

  const currentActiveItem = null;

  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];

    if (Routes) {
      Routes.filter((route) => {
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route);
          LayoutPaths.push(route.path);
        }
      });
    }

    return { LayoutRoutes, LayoutPaths };
  };

  const NotAuthorized = lazy(() => import("./components/NotAuthorized.js"));
  const Error = lazy(() => import("./components/Error.js"));
  const FinalRoute = (props) => {
    const route = props.route;
    let action, resource;

    if (route.meta) {
      action = route.meta.action ? route.meta.action : null;
      resource = route.meta.resource ? route.meta.resource : null;
    }

    if (
      (!isUserLoggedIn() && route.meta === undefined) ||
      (!isUserLoggedIn() &&
        route.meta &&
        !route.meta.authRoute &&
        !route.meta.publicRoute)
    ) {
      return <Redirect to="/login" />;
    } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
      return <Redirect to="/" />;
    } else if (isUserLoggedIn() && !ability.can(action, resource)) {
      return <Redirect to="/notauthorized" />;
    } else {
      return <route.component {...props} />;
    }
  };

  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      const LayoutTag = Layouts[layout];
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);
      const routerProps = {};

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      });

                      return (
                        <Suspense fallback={null}>
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            {...(route.appLayout
                              ? {
                                  appLayout: route.appLayout,
                                }
                              : {})}
                            {...(route.meta
                              ? {
                                  routeMeta: route.meta,
                                }
                              : {})}
                            {...(route.className
                              ? {
                                  wrapperClass: route.className,
                                }
                              : {})}
                          >
                            <FinalRoute route={route} {...props} />
                          </LayoutWrapper>
                        </Suspense>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return isUserLoggedIn() ? (
            <Redirect to={defaultRoute[currentUserRole]} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        exact
        path="/notauthorized"
        render={(props) => (
          <Layouts.BlankLayout>
            <NotAuthorized />
          </Layouts.BlankLayout>
        )}
      />
      {ResolveRoutes()}
      <Route path="*" component={Error} />
    </Switch>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserRole: selectCurrentUserRole,
});

export default connect(mapStateToProps)(Router);
