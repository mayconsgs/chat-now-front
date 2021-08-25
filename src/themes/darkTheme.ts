import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#10A8C8",
      light: "#61dafb",
      dark: "#007997",
    },
    secondary: {
      main: "#A866E4",
      light: "#dc96ff",
      dark: "#7638b1",
    },
    background: {
      paper: "rgba(255, 255, 255, 0.12)",
    },
    text: {
      primary: "#fff",
      secondary: "#000",
    },
  },
  shape: {
    borderRadius: 20,
  },
});

const darkTheme = responsiveFontSizes(theme);

export default darkTheme;
