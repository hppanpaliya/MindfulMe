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
import "./SupportGroups.css";

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
    <div className="support-groups-container">
      <div className="groups-list-container">
        <GroupsList groups={groups} handleSelectGroup={handleSelectGroup} />
        <CreateGroup />
      </div>
      <div className="chats-container">
        {selectedGroup && <Chats groupId={selectedGroup} />}
      </div>
    </div>
  );
};

export default SupportGroups;
