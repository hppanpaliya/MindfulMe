import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import MoodTracker from "./components/MoodTracker";
// import GuidedMeditation from './components/GuidedMeditation';
// import SelfAssessment from './components/SelfAssessment';
// import CopingStrategies from './components/CopingStrategies';
// import GoalSetting from './components/GoalSetting';
import SupportGroups from "./components/SupportGroups";
// import Profile from './components/Profile';
import Login from "./components/Profile/Login.js";
import Logout from "./components/Profile/Logout.js";
import Join from "./components/Profile/Join.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login, logout } from "./store/features/auth/authSlice.js";
import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import NavBar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import MemoryMatch from "./components/MemoryMatch";
import CopingStrategies from "./components/CopingStrategies";
import CBT from "./components/CBT";
import GoalSetting from "./components/GoalSetting";
import UsersList from "./components/Chat/UserList";
import ChatMessages from "./components/Chat/ChatMessages";
import SelfAssessment from "./components/SelfAssessment";
import firebase from "./utils/firebase";
import DrawingApp from "./components/DrawingApp";

import GuidedMeditation from "./components/GuidedMeditation";

function App() {
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  // useEffect(() => {
  //   if (currentUser) {
  //     const updateActiveChatAndStatus = async () => {
  //       const userStatusDatabaseRef = firebase.database().ref(`/status/${currentUser.user.uid}`);
  //       const isOfflineForDatabase = {
  //         isOnline: false,
  //         lastChanged: Date.now(),
  //       };
  
  //       const isOnlineForDatabase = {
  //         isOnline: true,
  //         lastChanged: Date.now(),
  //       };
  
  //       await userStatusDatabaseRef.set(isOnlineForDatabase);
  
  //       // Set up an interval to update the lastChanged field every 10 minutes
  //       const intervalId = setInterval(() => {
  //         userStatusDatabaseRef.update({ lastChanged: Date.now() });
  //       }, 10 * 60 * 1000);
  
  //       // Clean up: reset the online status when the user leaves the website
  //       userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase);
  
  //       return () => {
  //         clearInterval(intervalId);
  //       };
  //     };
  
  //     updateActiveChatAndStatus();
  //   }
  // }, [currentUser]);
  
  

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
        <Route path="/coping-strategies" Component={CopingStrategies} />
        <Route path="/cbt" Component={CBT} />
        <Route path="/guided-meditation" Component={GuidedMeditation} />
        <Route path="/self-assessment" Component={SelfAssessment} />
        <Route path="/Draw" Component={DrawingApp} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/mood-tracker" Component={MoodTracker} />
          <Route path="/support-groups" Component={SupportGroups} />
          <Route path="/goal-setting" Component={GoalSetting} />
          <Route path="/chat" Component={UsersList} />
          <Route path="/chat/:id" Component={ChatMessages} />

          {/* <Route path="/guided-meditation" Component={GuidedMeditation} />
        <Route path="/self-assessment" Component={SelfAssessment} />
        <Route path="/profile" Component={Profile} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
