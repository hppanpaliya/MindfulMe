import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "../../../utils/firebase";
import { login } from "../../../store/features/auth/authSlice.js";
import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/images/logo.svg";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#F9FAFB",
});

const Logo = styled("img")({
  width: "200px",
  marginBottom: "48px",
});

const Form = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  padding: "32px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const StyledTextField = styled(TextField)({
  marginBottom: "24px",
});

const StyledButton = styled(Button)({
  width: "100%",
  marginTop: "24px",
  backgroundColor: "#1E86FF",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#145FB9",
  },
});

const ErrorMessage = styled(Typography)({
  color: "#FF4136",
  marginBottom: "24px",
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // navigate logged in users to home page

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Form component="form" onSubmit={handleLogin}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledTextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton variant="contained" type="submit">
          Login
        </StyledButton>
      </Form>
    </Container>
  );
};

export default Login;
