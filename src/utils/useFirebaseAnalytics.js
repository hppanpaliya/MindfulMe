import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { analytics } from "./firebase"; // Import analytics from the file where you initialized Firebase
import { getAnalytics } from "firebase/analytics";

const useFirebaseAnalytics = () => {
  // Get the current location and navigation functions from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Get the current user from the Redux store
  const currentUser = useSelector((state) => state.auth);

  // Set up Firebase Analytics tracking
  useEffect(() => {
    // Combine the path and query parameters into a single string
    const pagePath = location.pathname + location.search;

    // Set user ID and properties if a user is logged in
    if (currentUser && currentUser.user) {
      analytics.setUserId(currentUser.user.uid);
      analytics.setUserProperties({
        email: currentUser.user.email,
        uid: currentUser.user.uid,
        displayName: currentUser.user.displayName,
      });
    }

    // Log a page view event to Firebase Analytics
    // eslint-disable-next-line no-unused-vars
    const analyticss = getAnalytics();
    analytics.logEvent(analytics, "page_view", { page_path: pagePath });

    // Debugging output
    console.log("page_view", { page_path: pagePath });
  }, [location, currentUser, navigate]);
};

export default useFirebaseAnalytics;
