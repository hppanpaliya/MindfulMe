import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./UserList.css";
import useFetchUsers from "./useFetchUsers";
import { TextField, Typography } from "@mui/material";
import UsersListItems from "./UsersListItems";
import UsersListSkeleton from "./UsersListItems/Skeleton";

const UsersList = () => {
  // State for search input value and loading indicator
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Get current user from Redux state
  const currentUser = useSelector((state) => state.auth.user);
  // Custom hook for fetching users and their chats/messages
  const { users, filterChat } = useFetchUsers(currentUser.uid, setLoading);

  // Update search input value
  const handleSearch = (e) => setSearchValue(e.target.value);

  // Filter users based on search input value and current user's chats/messages
  const filteredUsers = getFilteredUsers(users, filterChat, searchValue, currentUser.uid);

  return (
    <div className="users-list-container">
      <Typography variant="h4" fontWeight="bold" className="users-list-title">
        Users List
      </Typography>
      {/* Search input */}
      <SearchBox searchValue={searchValue} handleSearch={handleSearch} />
      {/* Loading indicator */}
      {loading ? <UsersListSkeleton /> : ""}
      {/* List of filtered users */}
      {!loading && filteredUsers.length > 0 ? (
        <UsersListItems users={filteredUsers} />
      ) : (
        !loading && (
          <Typography variant="body1" className="no-users-message" paddingTop={5}>
            Search a username to send message
          </Typography>
        )
      )}
    </div>
  );
};

// Function to filter users based on search input value and current user's chats/messages
const getFilteredUsers = (users, filterChat, searchValue, currentUserUid) => {
  // Helper function to get user data by UID
  const getUserByUid = (uid) => users.find((user) => user.uid === uid);

  // If search input is empty, filter users based on current user's chats/messages
  console.log("filterChat", filterChat);
  if (searchValue.trim() === "") {
    return filterChat
      .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp) // sort filterChat array in descending order based on lastMessage.timestamp
      .map((chat) => ({
        ...getUserByUid(chat.id.replace(currentUserUid, "").replace("-", "")),
        lastMessage: chat.lastMessage,
      }));
  }
  // If search input has value, filter users based on username
  else {
    return users.filter((user) => user.username.toLowerCase().includes(searchValue.toLowerCase()));
  }
};

// Search input component
const SearchBox = ({ searchValue, handleSearch }) => (
  <TextField value={searchValue} onChange={handleSearch} placeholder="Search for users..." className="search-box" sx={{ mt: 2 }} />
);

export default UsersList;
