import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList({ users, handleDelete, handleEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  console.log("userList", users);

  async function handleEdit(userId) {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  }

  async function saveEdit() {
    try {
      await axios.put(
        `https://corsproxy.io/?https://crud-server-three.vercel.app/users/${editingUser.id}`,
        editingUser
      );
      alert("User updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <>
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="flex">
        <table className="min-w-full bg-white border rounded overflow-x-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-1/4 break-words">
                First Name
              </th>
              <th className="py-3 px-6 text-left w-1/4 break-words">
                Last Name
              </th>
              <th className="py-3 px-6 text-left w-1/4 break-words">Email</th>
              <th className="py-3 px-6 text-left w-1/4 break-words">
                Phone Number
              </th>
              <th className="py-3 px-6 text-center">Edit</th>
              <th className="py-3 px-6 text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap break-words">
                  <div className="flex items-center">
                    <span className="font-medium">{user.firstName}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left break-words">
                  {user.lastName}
                </td>
                <td className="py-3 px-6 text-left break-words">
                  {user.email}
                </td>
                <td className="py-3 px-6 text-left break-words">
                  {user.phone}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-xl mb-4">Edit User</h3>
              <input
                value={editingUser?.firstName}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, firstName: e.target.value })
                }
                placeholder="First Name"
                className="p-2 border rounded w-full mb-4"
              />
              <input
                value={editingUser?.lastName}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, lastName: e.target.value })
                }
                placeholder="Last Name"
                className="p-2 border rounded w-full mb-4"
              />
              <input
                value={editingUser?.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                placeholder="Email"
                className="p-2 border rounded w-full mb-4"
              />
              <input
                value={editingUser?.phone}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, phone: e.target.value })
                }
                placeholder="Phone Number"
                className="p-2 border rounded w-full mb-4"
              />
              <button
                onClick={saveEdit}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button onClick={() => setIsModalOpen(false)} className="ml-4">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserList;
