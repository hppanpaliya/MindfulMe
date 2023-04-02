import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "../../store/features/supportGroups/supportGroupsSlice";
import GroupsList from "./groupsList";
import Chats from "./chats";
import CreateGroup from "./createGroup";
import { useState } from "react";
import './SupportGroups.css';

const SupportGroups = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId);
  };

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
