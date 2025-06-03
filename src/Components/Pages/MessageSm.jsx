import React, { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "./SidebarLeft";

import NavSmFooter from "./NavSmFooter";
import NavSearch from "./NavSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function MessageSm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/users`);
        const users = response.data;
        setAllUsers(users);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100 relative">

      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col p-4 border-r z-10">
        <SidebarLeft
          minimized={isSidebarMinimized}
          setMinimized={setIsSidebarMinimized}
          onMessagesClick={() => handlePanelOpen("messages")}
          onNotificationsClick={() => handlePanelOpen("notifications")}
          onSearchClick={() => handlePanelOpen("search")}
          onDefaultClick={handleResetSidebar}
        />
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64 lg:mr-64 h-screen overflow-hidden">
        <header className="bg-gray-100 text-white sticky top-0 z-20">
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            <div className="bg-white text-gray-600 w-full flex justify-between">
              <div className="mt-2 ml-4 mb-2 mr-4 bg-white flex w-full items-center">
                <svg onClick={() => navigate("/home")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <h2 className="text-text text-xl font-bold pl-4">Mensajes</h2>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">

          <div className="h-[200vh] bg-white">
            <>
              <div className="ls-list hide-scrollbar">
                {allUsers.map((user) => (
                  <div key={user.id} onClick={() => navigate("/message", { state: { selectedUser: user } })} className="friends">
                    <img src={user.image} alt="profileimage" />
                    <div>
                      <p>{user.name}</p>
                      <span>{user.userName}</span>

                    </div>
{/* 
                    
                    <h2 className="text-green-600 text-4xl">•</h2> */}
                  </div>
                ))}
              </div>
            </>
          </div>
        </main>
        <header className="bg-gray-100 text-white lg:shadow-md sticky top-0 z-20 pl-4">
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            <NavSmFooter />

          </div>
        </header>
      </div>
    </div>
  );
}

