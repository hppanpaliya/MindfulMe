import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../store/features/supportGroups/supportGroupsSlice";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();

  const handleCreateGroup = () => {
    if (groupName.trim() !== "") {
        dispatch(createGroup({ name: groupName })); 
      setGroupName("");
    }
  };

  return (
    <div>
      <h3>Create New Group:</h3>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Create</button>
    </div>
  );
};

export default CreateGroup;
