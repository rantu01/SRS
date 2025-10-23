import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseServices";
import { ref, onValue } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseServices";
import ChatPage from "./ChatPage";

const UsersList = () => {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const usersRef = ref(db, "users"); // store users list in DB
    return onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const parsedUsers = data
        ? Object.entries(data)
            .map(([uid, u]) => ({ uid, ...u }))
            .filter((u) => u.uid !== user.uid) // exclude self
        : [];
      setUsers(parsedUsers);
    });
  }, [user]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Users list */}
      <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow space-y-2">
        <h2 className="font-bold text-lg mb-2">Users</h2>
        {users.map((u) => (
          <button
            key={u.uid}
            className={`w-full text-left p-2 rounded hover:bg-amber-100 ${
              selectedUser?.uid === u.uid ? "bg-amber-200" : ""
            }`}
            onClick={() => setSelectedUser(u)}
          >
            {u.displayName || u.email}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatPage selectedUser={selectedUser} />
        ) : (
          <p className="text-center text-gray-500 mt-10">Select a user to start chat</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
