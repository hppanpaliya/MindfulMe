import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import MoodTracker from "../components/MoodTracker";
import SupportGroups from "../components/SupportGroups";
import Login from "../components/Profile/Login/Login";
import Logout from "../components/Profile/Logout/Logout";
import Join from "../components/Profile/Join";
import PrivateRoute from "../components/PrivateRoute";
import MemoryMatch from "../components/MemoryMatch";
import CopingStrategies from "../components/CopingStrategies";
import CBT from "../components/CBT";
import GoalSetting from "../components/GoalSetting";
import UsersList from "../components/Chat/UserList/UserList";
import ChatMessages from "../components/Chat/ChatMessages/ChatMessages";
import SelfAssessment from "../components/SelfAssessment";
import DrawingApp from "../components/DrawingApp";
import GuidedMeditation from "../components/GuidedMeditation";
import Survey from "../components/Survey";
import AdminSurveyReplies from "../components/Survey/AdminSurveyReplies.js";
import HabitTracker from "../components/HabitTracker";
import Chatbot from "../components/Chatbot";
import Profile from "../components/Profile";
import ChangePassword from "../components/Profile/ChangePassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route path="/:slide" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/logout" Component={Logout} />
      <Route path="/join" Component={Join} />
      <Route path="/memory-match" Component={MemoryMatch} />
      <Route path="/coping-strategies" Component={CopingStrategies} />
      <Route path="/cbt" Component={CBT} />
      <Route path="/guided-meditation" Component={GuidedMeditation} />
      <Route path="/self-assessment" Component={SelfAssessment} />
      <Route path="/Draw" Component={DrawingApp} />
      <Route path="/profile" Component={Profile} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/mood-tracker" Component={MoodTracker} />
        <Route path="/support-groups" Component={SupportGroups} />
        <Route path="/goal-setting" Component={GoalSetting} />
        <Route path="/chat" Component={UsersList} />
        <Route path="/chat/:id" Component={ChatMessages} />
        <Route path="/survey" Component={Survey} />
        <Route path="/survey-list" Component={AdminSurveyReplies} />
        <Route path="/habit-tracker" Component={HabitTracker} />
        <Route path="/chatbot" Component={Chatbot} />
        <Route path="/change-password" Component={ChangePassword} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
