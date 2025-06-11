import React, { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "./SidebarLeft";

import NavSmFooter from "./NavSmFooter";
import NavSearch from "./NavSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Search() {
  const [clickedUserIds, setClickedUserIds] = useState(() => {
    // Intenta recuperar el array desde localStorage
    const stored = localStorage.getItem("clickedUserIds");
    return stored ? JSON.parse(stored) : [];
  });
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [nameUser, setNameUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUserClick = (user) => {
    navigate("/profileuser", { state: { selectedUser: user } });

    setClickedUserIds((prevIds) => {
      if (prevIds.includes(user.id)) return prevIds;
      const updated = [...prevIds, user];
      localStorage.setItem("clickedUserIds", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveUserId = (id) => {
  setClickedUserIds((prevIds) => {
    const updated = prevIds.filter((userId) => userId.id !== id);
    localStorage.setItem("clickedUserIds", JSON.stringify(updated));
    return updated;
  });
};

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchValue.trim() === "") {
        setNameUsers([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/users`);
        const users = response.data;
        // const filteredUser = users
        // .filter((u) => u.name === searchValue)
        const filteredUser = users.filter((u) =>
          u.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setNameUsers(filteredUser);
        console.log(filteredUser);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchValue]);


  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };
  console.log("buscados", clickedUserIds);

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

                <input
                  type="search"
                  className="flex-grow rounded-full bg-gray-100 pl-4 py-2 mr-2 ml-2"
                  placeholder="Buscar..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}

                />
                <svg
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
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT     onClick={() => navigate("/profileuser")} */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <h2 className="text-gray-600 font-semibold">Recientes</h2>
          {clickedUserIds?.length ? (


            clickedUserIds.map(user => (
              <div>

                <div key={user.id}
                  onClick={() => { navigate("/profileuser", { state: { selectedUser: user } }) }}
                  className="w-full pt-7 pb-7" >


                  <div className="flex justify-between  flex items-center">
                    <img
                      src={user.image}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <span className="text-[1.35rem] text-text font-bold truncate">{user.name}</span>
                      <span className="text-[1rem] text-gray-600 truncate">{user.userName}</span>
                    </div>
                    <svg onClick={(e) => {
                      e.stopPropagation(); // Evita que también navegue al perfil
                      handleRemoveUserId(user.id);
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <div className="flex-col pt-7 pb-12 text-text items-center h-[2rem] w-full">

            </div>
          )}
          <div className="h-[200vh] bg-white">
            <> <div className="w-full flex-1 overflow-y-auto pr-2 hide-scrollbar">
              {nameUser?.length ? (
                nameUser.map(user => (
                  <div key={user.id}
                    onClick={() => {
                      // Navegar al perfil
                      navigate("/profileuser", { state: { selectedUser: user } }, handleUserClick(user));

                      // Guardar el ID solo si aún no está en el array

                    }}
                    className="w-full pt-7 pb-7" >


                    <div className="flex justify-between  flex items-center">
                      <img
                        src={user.image}
                        className="w-20 h-20 object-cover rounded-full"
                        
                      />
                      <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">{user.name}</span>
                        <span className="text-[1rem] text-gray-600 truncate">{user.userName}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-col pt-7 pb-12 text-text items-center h-[2rem] w-full">

                </div>
              )}

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

