import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://corsproxy.io/?https://crud-server-three.vercel.app/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://corsproxy.io/?https://crud-server-three.vercel.app/users/${userId}`
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = async (updatedUser) => {
    try {
      await axios.put(
        `https://corsproxy.io/?https://crud-server-three.vercel.app/users/${updatedUser.id}`,
        updatedUser
      );
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(
        "https://corsproxy.io/?https://crud-server-three.vercel.app/users",
        newUser
      );
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <CreateUser addUser={addUser} />
      <UserList
        users={users}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default UserManagement;
