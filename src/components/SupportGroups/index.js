import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "../../store/features/supportGroups/supportGroupsSlice";
import GroupsList from "./groupsList";
import Chats from "./chats";
import CreateGroup from "./createGroup";
import { useState } from "react";



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
    <div>
      <div style={{ display: "flex" }}>
        <GroupsList groups={groups} handleSelectGroup={handleSelectGroup} />
        {selectedGroup && <Chats groupId={selectedGroup} />}
      </div>
      <CreateGroup />
    </div>
  );
};

export default SupportGroups;
