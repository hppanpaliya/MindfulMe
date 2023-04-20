import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../utils/firebase";
import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../../assets/images/logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice.js";

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

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      // Check if username already exists
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();
      if (!userSnapshot.empty) {
        throw new Error("Username already exists");
      }
      // Create user in Firebase auth
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      // Add user info to Firestore
      await user.updateProfile({
        displayName: username,
      });

      await firebase.firestore().collection("users").doc(user.uid).set({
        email,
        username,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Form component="form" onSubmit={handleJoin}>
        <Typography variant="h5" gutterBottom>
          Join
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
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <StyledTextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <StyledButton variant="contained" type="submit">
          Join
        </StyledButton>
      </Form>
    </Container>
  );
};

export default Join;
