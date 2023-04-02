import React, { useEffect, useState } from "react";
import { authSlice } from "../../store/features/auth/authSlice";
import firebase from "../../utils/firebase";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserList.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = firebase.firestore().collection("users");
      const snapshot = await usersRef.get();
      const usersData = snapshot.docs.filter((doc) => doc.id !== currentUser.uid).map((doc) => ({ ...doc.data(), uid: doc.id }));

      setUsers(usersData);
    };

    fetchUsers();
  }, [currentUser.uid]);

  return (
    <div className="users-list-container">
      <h1 className="users-list-title">Users List</h1>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.uid}>
            <Link to={`/chat/${user.uid}`} className="user-link">
              <div className="user-item">{user.username}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
