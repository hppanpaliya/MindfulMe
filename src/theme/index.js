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
    button: {
        borderRadius: "50px",
        textTransform: "none",
        padding: "10px 20px",
        fontSize: "1rem",
        fontWeight: 700,
        boxShadow: "none",
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: "#008579",
                color: "#fff",
                "&:hover": {
                    backgroundColor: "#008579",
                },
            },
            textPrimary: {
                color: "#fff",
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
});

export default theme;
