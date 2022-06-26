import React from "react";

function backBtn({ children, onClick }) {
  return (
    <button
      className="  bg-red-500  hover:bg-transparent text-white font-semibold hover:text-black py-2 px-4 border border-red-500 rounded sn:w-20 h-18 sn:text-xs"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default backBtn;
