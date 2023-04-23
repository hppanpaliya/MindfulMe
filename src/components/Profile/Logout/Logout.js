import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import firebase from "../../../utils/firebase";
import { logout } from "../../../store/features/auth/authSlice.js";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
};

export default Logout;
