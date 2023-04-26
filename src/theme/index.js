import { createTheme } from "@mui/material/styles";
import { teal, green } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      color: teal[500],
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.00833em",
      color: teal[700],
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: green[700],
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.00938em",
      color: "#333",
    },
    body2: {
      fontSize: "0.675rem",
      fontWeight: 400,
      letterSpacing: "0.01071em",
      color: "#333",
    },
  },
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: green[700],
    },
    text: {
      primary: "#333",
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
          color: teal[500],
        },
        containedSecondary: {
          backgroundColor: "#008579",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#008579",
          },
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

export default theme;
