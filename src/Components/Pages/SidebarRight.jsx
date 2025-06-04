import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../store/usersSlice";
import axios from "axios";


const SidebarRight = ({
  minimized,
  setMinimized,
  onMessagesClick,
  onNotificationsClick,
  onSearchClick,
  onDefaultClick,
}) => {

  const [allUsers, setAllUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/users`);
        const users = response.data;
        setAllUsers(users);
        
      // console.log("Usuario logueado:", user); // 👀
      // console.log("Usuarios obtenidos:", users);
        const recents = users
          .filter((u) => u.id !== user.id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setRecentUsers(recents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  

  const handleToggle = (e) => {
    e.preventDefault();
    setMinimized((prev) => !prev);
  };
  return (
    <>
      <div
        className={`bg-bg flex flex-col items-center w-full h-[100%] border br-2 border-border py-[1.4rem] px-[1rem] transition-all duration-500 ease-in-out`}
      >
        <div className="w-full flex items-center pb-8">
          <div
            onClick={() => {
              navigate("/profile");
            }}
            className="w-full flex items-center pt-4"
          >
            <img className="  h-[60px] w-auto  rounded-full" src={user.image} />
            <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
              <span className="text-[1rem] text-text font-bold truncate">
                {user.name}
              </span>
              <span className="text-[1rem] text-gray-600 truncate">
                {user.userName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-col pt-7 pb-12 font-bold text-text items-center h-[2rem] w-full">
          Sugerencias
        </div>
        {recentUsers.length > 0 ? (
          recentUsers.map((user) => (
            <div className="w-full flex-1 overflow-y-auto pr-2" onClick={() => navigate("/profileuser", { state: { selectedUser: user } })} key={user.id}>
              <div className="w-full flex items-center pt-4 pb-4">
                <img src={user.image}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                  <span className="text-[1rem] text-text font-bold truncate">
                    {user.name}
                  </span>
                  <span className="text-[1rem] text-gray-600 truncate">
                    {user.userName}
                  </span>
                </div>
                {/* <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                </button> */}
              </div>
            </div>
          ))
        ) : (

          <div className="flex-col pt-7 pb-12 text-text items-center h-[2rem] w-full">
            Parece que no hay usuarios nuevos
          </div>
        )}



      </div>
    </>
  );
};

export default SidebarRight;
