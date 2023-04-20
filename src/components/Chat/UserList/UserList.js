import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./UserList.css";
import useFetchUsers from "./useFetchUsers";
import { TextField, Typography } from "@mui/material";

const UsersList = () => {
    // State for search input value
    const [searchValue, setSearchValue] = useState("");
    // Get current user from Redux state
    const currentUser = useSelector((state) => state.auth.user);
    // Custom hook for fetching users and their chats/messages
    const { users, filterChat } = useFetchUsers(currentUser.uid);

    // Update search input value
    const handleSearch = (e) => setSearchValue(e.target.value);

    // Filter users based on search input value and current user's chats/messages
    const filteredUsers = getFilteredUsers(
        users,
        filterChat,
        searchValue,
        currentUser.uid
    );

    return (
        <div className="users-list-container">
            <Typography
                variant="h4"
                fontWeight="bold"
                className="users-list-title"
            >
                Users List
            </Typography>
            {/* Search input */}
            <SearchBox searchValue={searchValue} handleSearch={handleSearch} />
            {/* List of filtered users */}
            <UsersListItems users={filteredUsers} />
        </div>
    );
};

// Function to filter users based on search input value and current user's chats/messages
const getFilteredUsers = (users, filterChat, searchValue, currentUserUid) => {
    // Helper function to get user data by UID
    const getUserByUid = (uid) => users.find((user) => user.uid === uid);

    // If search input is empty, filter users based on current user's chats/messages
    if (searchValue.trim() === "") {
        return filterChat.map((chat) =>
            getUserByUid(chat.id.replace(currentUserUid, "").replace("-", ""))
        );
    }
    // If search input has value, filter users based on username
    else {
        return users.filter((user) =>
            user.username.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
};

// Search input component
const SearchBox = ({ searchValue, handleSearch }) => (
    <TextField
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search for users..."
        className="search-box"
        sx={{ mt: 2 }}
    />
);

// List of filtered users component
const UsersListItems = ({ users }) => (
    <ul className="users-list">
        {users.map((user) => (
            <li key={user.uid}>
                <Link to={`/chat/${user.uid}`} className="user-link">
                    <div className="user-item">{user.username}</div>
                </Link>
            </li>
        ))}
    </ul>
);

export default UsersList;
