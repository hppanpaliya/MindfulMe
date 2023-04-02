import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../store/features/supportGroups/supportGroupsSlice";
import "./CreateGroup.css";

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
    <div className="create-group-container">
      <h3 className="create-group-title">Create New Group:</h3>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="create-group-input"
      />
      <button onClick={handleCreateGroup} className="create-group-button">
        Create
      </button>
    </div>
  );
};

export default CreateGroup;
