import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import darkTheme from "./themes/darkTheme";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <SignUp></SignUp>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
