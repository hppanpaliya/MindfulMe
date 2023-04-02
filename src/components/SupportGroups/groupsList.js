import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";



const GroupsList = ({ groups, handleSelectGroup }) => {
  const memoizedGroups = React.useMemo(() => groups, [groups]);

  return (
    <List>
      {memoizedGroups.map((group) => (
        <ListItem key={group.id} button onClick={() => handleSelectGroup(group.id)}>
          <ListItemText primary={group.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default GroupsList;
