
import React, { useState } from "react";
import Conversation from "./Conversation";

// Dummy user list; in production, fetch from API
const MOCK_USERS = [
  // Example: { id: 'uuid', name: 'John Doe' }
];

const Inbox = () => {
  const [selectedUser, setSelectedUser] = useState<{ id: string; name?: string } | null>(null);

  // TODO: Replace with actual inbox data (list of users messaged with)
  const users = MOCK_USERS;

  if (selectedUser) {
    return <Conversation otherUserId={selectedUser.id} otherUserName={selectedUser.name} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow border p-4 h-[60vh]">
      <h2 className="font-bold text-primary text-xl mb-4">Direct Messages</h2>
      {users.length === 0 && <div className="text-gray-500">No messages yet.</div>}
      <ul className="divide-y">
        {users.map((user) => (
          <li key={user.id} className="py-2 flex items-center justify-between">
            <span>{user.name}</span>
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setSelectedUser(user)}
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;

