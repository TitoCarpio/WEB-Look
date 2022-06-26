import React from "react";
import Spinner from "../Spinner";

const AuthButton = ({ children, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full h-12 rounded-lg bg-gradient-to-tr from-pink-500 to-yellow-400  uppercase font-semibold hover:bg-gray-400 text-gray-100 transition mb-4 flex items-center justify-center"
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default AuthButton;