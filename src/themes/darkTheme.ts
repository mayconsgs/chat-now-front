import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#10A8C8",
      light: "#3fb9d3",
      dark: "#0b758c",
    },
    secondary: {
      main: "#A866E4",
      light: "#b984e9",
      dark: "#75479f",
    },
    background: {
      paper: "rgba(255, 255, 255, 0.12)",
      default: "#121212",
    },
    text: {
      primary: "#fff",
      secondary: "#888",
    },
  },
  typography: {
    // h4: {
    //   color: "#A866E4",
    // },
    // caption: {
    //   color: "949D9E",
    // },
  },
  props: {
    MuiTextField: {
      fullWidth: true,
      variant: "outlined",
    },
    MuiButton: {
      size: "large",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "#10A8C8",
        border: "2px solid ",
        background: "rgba(255, 255, 255, 0.12)",
      },
    },
    MuiCssBaseline: {
      "@global": {
        "#root": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "#root, body, html": {
          minHeight: "100vh",
        },
      },
    },
  },
  shape: {
    borderRadius: 20,
  },
});

const darkTheme = responsiveFontSizes(theme);

export default darkTheme;
