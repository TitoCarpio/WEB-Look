import React from "react";

function Navigationbuttons({ children, onClick }) {
  return (
    <button
      // className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-1 rounded "
      className="bg-gray-500 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-600 rounded m-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Navigationbuttons;
