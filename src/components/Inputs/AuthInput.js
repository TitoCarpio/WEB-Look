import React from "react";

const AuthInput = ({ type = "text", name, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="w-full h-12 rounded-lg px-4 text-lg  focus:ring-gray-400-600 mb-4 shadow-2xl"
      placeholder={placeholder}
    />
  );
};

export default AuthInput;