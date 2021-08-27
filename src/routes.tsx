import { Box, CircularProgress } from "@material-ui/core";
import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

const Progress = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

const Routes = () => {
  return (
    <Suspense fallback={<Progress />}>
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
