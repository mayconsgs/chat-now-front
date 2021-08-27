import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./routes";
import darkTheme from "./themes/darkTheme";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
