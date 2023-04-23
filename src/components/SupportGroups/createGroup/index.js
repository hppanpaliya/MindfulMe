import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../../store/features/supportGroups/supportGroupsSlice";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputAdornment,
    TextField,
} from "@mui/material";

const CreateGroup = () => {
    // Define state variable for the group name
    const [groupName, setGroupName] = useState("");

    // Get the Redux dispatch function
    const dispatch = useDispatch();

    // Handle creation of a new group
    const handleCreateGroup = () => {
        // Check if group name is not empty
        if (groupName.trim() !== "") {
            // Dispatch the createGroup action with the group name
            dispatch(createGroup({ name: groupName }));

            // Clear the group name input
            setGroupName("");
        }
    };

    // Render the form for creating a new group
    return (
        <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <FormControl fullWidth>
                <TextField
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleCreateGroup}
                                    size="large"
                                >
                                    Create
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
        </Container>
    );
};

export default CreateGroup;
