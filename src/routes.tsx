import { CircularProgress } from "@material-ui/core";
import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const Chat = lazy(() => import("./pages/Chat"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

const Routes = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/" exact component={Chat} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
