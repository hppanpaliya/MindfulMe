import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import "./GroupsList.css";

const GroupsList = ({ groups, handleSelectGroup }) => {
  // Use React memoization to avoid unnecessary re-renders
  const memoizedGroups = React.useMemo(() => groups, [groups]);

  // Render a list of groups as clickable items
  return (
    <List className="groups-list">
      {memoizedGroups.map((group) => (
        <ListItem
          key={group.id}
          button
          onClick={() => handleSelectGroup(group.id)}
        >
          <ListItemText primary={group.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default GroupsList;
