import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const GroupsList = ({ groups, handleSelectGroup, selectedGroup }) => {
  // Use React memoization to avoid unnecessary re-renders
  const memoizedGroups = React.useMemo(() => groups, [groups]);

  // Render a list of groups as clickable items
  return (
    <List className="groups-list">
      {memoizedGroups.map(({ id, name }) => (
        <ListItem key={id} button selected={id === selectedGroup} onClick={() => handleSelectGroup(id)}>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default GroupsList;
