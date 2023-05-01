import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setLoading } from "./store/features/auth/authSlice.js";
import { getAuth } from "firebase/auth";
import NavigationBar from "./components/NavigationBar";
import useFirebaseAnalytics from "./utils/useFirebaseAnalytics";
import theme from "./theme";
import darkTheme from "./theme/darkTheme.js";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./utils/AppRoutes";
import NotificationPermissionModal from "./utils/NotificationPermissionModal";
import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";
import { styled } from "@mui/material/styles";
import pathJson from "./utils/path.json";
import FAQButton from "./components/utils/FAQButton";





function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useFirebaseAnalytics(); // Hook for Firebase Analytics

  useEffect(() => {
    const page = pathJson.find((path) => path.path === location.pathname);
    if (page) {
      document.title = page.text;
    }
  }, [location.pathname]);

  useEffect(() => {
    const auth = getAuth(); // Firebase authentication object
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is logged in, dispatch login action
        dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName }));
      } else {
        // Otherwise, dispatch logout action and setLoading(false) action
        dispatch(logout());
        dispatch(setLoading(false));
      }
    });

    return unsubscribe; // Unsubscribe from onAuthStateChanged listener
  }, [dispatch]); // Dependency array

  const Wrapper = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    minHeight: window.innerHeight, // 100svh --
  }));

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <Wrapper>
        <NavigationBar /> {/* Navbar component */}
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={1000}>
            <AppRoutes />
          </CSSTransition>
        </TransitionGroup>
        <NotificationPermissionModal /> {/* Notification permission modal component */}
        <FAQButton />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
