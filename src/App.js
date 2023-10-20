import React from "react";
import Users from "./components/Users";
import "./App.css";

function App() {
  return (
    <div className="App bg-gray-200 min-h-screen">
      <div className="container mx-auto max-w-xl p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
        <Users />
      </div>
    </div>
  );
}

export default App;
