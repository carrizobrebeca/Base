import React from "react";
import { useNavigate } from "react-router-dom";

const NavSearch = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-600 w-full flex justify-between">
      <div className="mt-2 ml-4 mb-2 mr-4 bg-white flex w-full items-center">
        <svg onClick={()=> navigate("/home")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

        <input
          type="text"
          className="flex-grow rounded-full bg-gray-100 pl-4 py-2 mr-2 ml-2"
          placeholder="Buscar..."
        />
        <svg onClick={()=> navigate("/profileuser")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default NavSearch;
