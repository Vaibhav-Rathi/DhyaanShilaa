import React, { useState } from "react";

type User = {
  name: string;
  role: string;
};

type SettingsProps = {
  user: User;
  setUser: (user: User) => void;
};

const Settings: React.FC<SettingsProps> = ({ user, setUser }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name, role });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block font-semibold text-gray-600 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block font-semibold text-gray-600 mb-2">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-lg bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
