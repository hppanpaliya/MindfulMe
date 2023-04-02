import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import MoodTracker from './components/MoodTracker';
// import GuidedMeditation from './components/GuidedMeditation';
// import SelfAssessment from './components/SelfAssessment';
// import CopingStrategies from './components/CopingStrategies';
// import GoalSetting from './components/GoalSetting';
import SupportGroups from './components/SupportGroups';
// import Profile from './components/Profile';
import Login from "./components/Profile/Login.js";
import Logout from "./components/Profile/Logout.js";
import Join from "./components/Profile/Join.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/features/auth/authSlice.js";
import firebase from "firebase/compat/app";
import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import NavBar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import MemoryMatch from "./components/MemoryMatch";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
      console.log(auth.currentUser);
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/join" Component={Join} />
        <Route path="/memory-match" Component={MemoryMatch} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/mood-tracker" Component={MoodTracker} />
          <Route path="/support-groups" Component={SupportGroups} />
        {/* <Route path="/guided-meditation" Component={GuidedMeditation} />
        <Route path="/self-assessment" Component={SelfAssessment} />
        <Route path="/coping-strategies" Component={CopingStrategies} />
        <Route path="/goal-setting" Component={GoalSetting} />
        
        <Route path="/profile" Component={Profile} /> */}
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
