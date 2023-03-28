import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
// import MoodTracker from './components/MoodTracker';
// import GuidedMeditation from './components/GuidedMeditation';
// import SelfAssessment from './components/SelfAssessment';
// import CopingStrategies from './components/CopingStrategies';
// import GoalSetting from './components/GoalSetting';
// import SupportGroups from './components/SupportGroups';
// import Profile from './components/Profile';
import Login from './components/Profile/Login.js';
import Logout from './components/Profile/Logout.js';
import Join from './components/Profile/Join.js';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/features/auth/authSlice.js";
import firebase from 'firebase/compat/app';
import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';

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
      unsubscribe();
      // ...
      console.log(auth.currentUser);
    });
  }, [dispatch]);
  

  return (
    <Router>
      <Routes>
      <Route exact path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/join" Component={Join} />
        {/* <Route path="/mood-tracker" element={MoodTracker} />
        <Route path="/guided-meditation" element={GuidedMeditation} />
        <Route path="/self-assessment" element={SelfAssessment} />
        <Route path="/coping-strategies" element={CopingStrategies} />
        <Route path="/goal-setting" element={GoalSetting} />
        <Route path="/support-groups" element={SupportGroups} />
        <Route path="/profile" element={Profile} /> */}
      </Routes>
    </Router>
  );
}

export default App;
