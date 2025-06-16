import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthButtons() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4">
      {!user ? (
        <>
          <Link
            to="/login"
            className="text-gray-600 hover:text-indigo-600 font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            className="text-gray-600 hover:text-indigo-600 font-medium"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 font-medium hover:underline"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
