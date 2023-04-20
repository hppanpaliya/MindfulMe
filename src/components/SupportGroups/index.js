import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchGroups,
    selectGroups,
} from "../../store/features/supportGroups/supportGroupsSlice";
import GroupsList from "./groupsList";
import Chats from "./chats";
import CreateGroup from "./createGroup";
import { useState } from "react";
import { Container, Box } from "@mui/material";

const SupportGroups = () => {
    // Define state variable for the selected group
    const [selectedGroup, setSelectedGroup] = useState(null);

    // Get the groups array from the Redux store
    const groups = useSelector(selectGroups);

    // Get the Redux dispatch function
    const dispatch = useDispatch();

    // Fetch the groups from the server when the component mounts
    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    // Handle selection of a group from the list
    const handleSelectGroup = (groupId) => {
        setSelectedGroup(groupId);
    };

    // Render the support groups interface
    return (
        <Container
            sx={{
                display: "flex",
                margin: 0,
                minWidth: "100%",
                height: "calc(100vh - 64px)",
            }}
        >
            <Box
                sx={{
                    width: "30%",
                    borderRight: 1,
                    borderColor: "lightgray",
                }}
            >
                <Box
                    sx={{ maxHeight: "calc(100vh - 174px)", overflowY: "auto" }}
                >
                    <GroupsList
                        groups={groups}
                        handleSelectGroup={handleSelectGroup}
                    />
                </Box>
                <CreateGroup style={{ position: "fixed" }} />
            </Box>
            <Box
                sx={{
                    width: "70%",
                }}
            >
                {selectedGroup && <Chats groupId={selectedGroup} />}
            </Box>
        </Container>
    );
};

export default SupportGroups;
