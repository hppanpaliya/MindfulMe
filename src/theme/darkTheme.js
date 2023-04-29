import { createTheme } from "@mui/material/styles";
import { teal, green } from "@mui/material/colors";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      color: teal[300],
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.00833em",
      color: teal[200],
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: green[200],
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "0.00735em",
      color: "#fff",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: "#fff",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      letterSpacing: "0.00938em",
      color: "#fff",
    },

    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.00938em",
      color: "#fff",
    },
    body2: {
      fontSize: "0.675rem",
      fontWeight: 400,
      letterSpacing: "0.01071em",
      color: "#fff",
    },
  },
  palette: {
    primary: {
      main: teal[300],
    },
    secondary: {
      main: green[200],
    },
    text: {
      primary: "#fff",
    },
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
      box: "#1e1e1e",
    },
    error: {
      main: "#ff0000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "",
          },
        },
        textPrimary: {
          color: teal[300],
        },
        containedSecondary: {
          backgroundColor: "#008579",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#008579",
          },
        },
        error: {
          main: "#f44336",
          light: "#fce4ec",
          dark: "#c62828",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {},
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // color: "#6D83B2",
          // "&.Mui-selected": {
          //   backgroundColor: "#9BC1BC",
          //   color: "#fff",
          //   "&:hover": {
          //     backgroundColor: "#8EB3B0",
          //   },
          // },
        },
      },
    },
  },
});

export default darkTheme;
