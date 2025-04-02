import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch (err) {
      setError("Failed to log out: " + err.message);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex flex-col items-center mb-6">
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-600">
              {currentUser?.email?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>
        )}
        <strong className="text-xl mb-1">
          {currentUser?.displayName || "User"}
        </strong>
        <p className="text-gray-500">{currentUser?.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Log Out
      </button>
    </div>
  );
}
