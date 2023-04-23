import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout, setLoading } from "./store/features/auth/authSlice.js";
import { getAuth } from "firebase/auth";
import NavigationBar from "./components/NavigationBar";
import useFirebaseAnalytics from "./utils/useFirebaseAnalytics";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./utils/AppRoutes";
import NotificationPermissionModal from "./utils/NotificationPermissionModal";
import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useFirebaseAnalytics(); // Hook for Firebase Analytics

  useEffect(() => {
    const auth = getAuth(); // Firebase authentication object
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is logged in, dispatch login action
        dispatch(login(user));
      } else {
        // Otherwise, dispatch logout action and setLoading(false) action
        dispatch(logout());
        dispatch(setLoading(false));
      }
    });

    return unsubscribe; // Unsubscribe from onAuthStateChanged listener
  }, [dispatch]); // Dependency array

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar /> {/* Navbar component */}
      <TransitionGroup>
    <CSSTransition
      key={location.key}
      classNames="fade"
        timeout={1000}
    >
      <AppRoutes />
    </CSSTransition>
  </TransitionGroup>      <NotificationPermissionModal />{" "}
      {/* Notification permission modal component */}
    </ThemeProvider>
  );
}

export default App;
