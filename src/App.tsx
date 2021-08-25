import { ThemeProvider } from "@material-ui/core";
import SignUp from "./pages/SignUp";
import darkTheme from "./themes/darkTheme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <SignUp></SignUp>
    </ThemeProvider>
  );
};

export default App;
