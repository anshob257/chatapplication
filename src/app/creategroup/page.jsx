"use client"
import AllUsers from "@/Components/chats/AllUsers";
import { useEffect, useState } from "react";
import axios from "axios";
const Page = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/all");
        console.log(response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  },[]);

  return (
    <div className="flex justify-center">
       <AllUsers users={users} />
    </div>
 
  );
};
export default Page;