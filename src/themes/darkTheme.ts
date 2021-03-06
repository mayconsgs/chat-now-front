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
      paper: "#2E2E2E",
      default: "#121212",
    },
    text: {
      primary: "#fff",
      secondary: "#949D9E",
    },
    action: {
      selected: "rgba(97, 218, 251, 0.26)",
    },
    divider: "#787878",
  },
  props: {
    MuiTextField: {
      fullWidth: true,
      variant: "outlined",
    },
    MuiButton: {
      size: "large",
    },
    MuiFab: {
      color: "secondary",
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
