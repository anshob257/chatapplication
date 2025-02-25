import React, { useState } from "react";
import ChatCard from "./ChatCard";
import axios from "axios";
const AllUsers = ({ users, onClick }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCreateGroup = async() => {
    console.log("Creating group with name:", groupName);
    console.log("Selected users:", selectedUsers);
    const response = await axios.post("/api/users/creategroup",{groupName,selectedUsers});
    console.log("response",response);
    setGroupName("");
    setSelectedUsers([]);
  };

  const handleSelectUser = (userId, username) => {
    // Check if user is already selected
    const alreadySelected = selectedUsers.some(user => user.id === userId);
    if (alreadySelected) {
      setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, { id: userId, username: username }]);
    }
  };

  return (
    <div className="relative w-[30%] ">
      <div className="flex flex-col px-[1vw]">
        <div className="pt-[1vw] px-[0.5vw] font-semibold text-[1.5vw]">
          Create Group
        </div>
        <div className="mt-[1.5vw]">
          <input
            type="text"
            className="peer w-full outline outline-0 focus:outline-0 transition-all duration-300 ease-in-out placeholder-shown:border focus:border-[1px] px-[0.5vw] py-[0.25vw] rounded-[0.3vw] focus:border-blue-600 border-[0.8px] border-zinc-700 bg-transparent"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[0.3vw] h-[83%] items-center pt-[1vw] overflow-y-scroll scrollbar-hide">
        {users &&
          users.map((item, index) => (
            <div key={index} className="flex items-center">
              <ChatCard
                key={index} // Assuming each user has a unique id
                user={item}
                onClick={() => onClick(item.username, item.mobileNo)}
              />
              <button
                className={`ml-2 px-3 py-1 rounded cursor-pointer ${selectedUsers.some(user => user.id === item._id) ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}
                onClick={() => handleSelectUser(item._id, item.username)}
              >
                {selectedUsers.some(user => user.id === item._id) ? (
                  <span>✓</span>
                ) : (
                  <span>+</span>
                )}
              </button>
            </div>
          ))}
      </div>

      <div className="mt-4 flex justify-center items-center">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="peer w-[50%] outline outline-0 focus:outline-0 transition-all duration-300 ease-in-out placeholder-shown:border focus:border-[1px] px-[0.5vw] py-[0.25vw] rounded-[0.3vw] focus:border-blue-600 border-[0.8px] border-zinc-700 bg-transparent mr-2"
          placeholder="Enter group name"
        />
        <button
          onClick={handleCreateGroup}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
