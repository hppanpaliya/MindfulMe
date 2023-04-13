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
import { login, logout, setLoading } from "./store/features/auth/authSlice.js";
import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
//import NavBar from "./components/utils/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import MemoryMatch from "./components/MemoryMatch";
import CopingStrategies from "./components/CopingStrategies";
import CBT from "./components/CBT";
import GoalSetting from "./components/GoalSetting";
import UsersList from "./components/Chat/UserList/UserList";
import ChatMessages from "./components/Chat/ChatMessages/ChatMessages";
import SelfAssessment from "./components/SelfAssessment";
// eslint-disable-next-line no-unused-vars
//import firebase from "./utils/firebase";
import DrawingApp from "./components/DrawingApp";
//import useNotificationPermission from "./utils/useNotificationPermission";
import NotificationPermissionModal from "./utils/NotificationPermissionModal";
import GuidedMeditation from "./components/GuidedMeditation";
import Survey from "./components/Survey";
import AdminSurveyReplies from "./components/Survey/AdminSurveyReplies.js";
import HabitTracker from "./components/HabitTracker";
import NavigationBar from "./components/NavigationBar";

function App() {
  // eslint-disable-next-line no-unused-vars
  const currentUser = useSelector((state) => state.auth);
    //console.log(user.user.uid);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
        dispatch(setLoading(false));
      }
      console.log(auth.currentUser);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Router>
        <NavigationBar />
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
            <Route path="/survey" Component={Survey} />
            <Route path="/survey-list" Component={AdminSurveyReplies} />
            <Route path="/habit-tracker" Component={HabitTracker} />

            {/* <Route path="/guided-meditation" Component={GuidedMeditation} />
        <Route path="/self-assessment" Component={SelfAssessment} />
        <Route path="/profile" Component={Profile} /> */}
          </Route>
        </Routes>
      </Router>
      <NotificationPermissionModal />
    </>
  );
}

export default App;
