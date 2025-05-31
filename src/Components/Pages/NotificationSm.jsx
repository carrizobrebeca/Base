import React, { useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "./SidebarLeft";

import NavSmFooter from "./NavSmFooter";
import NavSearch from "./NavSearch";
import { useNavigate } from "react-router-dom";

export default function NotificationSm() {
  const navigate = useNavigate()
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

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
               <h2 className="text-text text-xl font-bold pl-4">Notificaciones</h2>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <h2 className="text-gray-600 font-semibold">Recientes</h2>
          <div className="h-[200vh] bg-white">
            <>
              <div className="w-full flex-1 overflow-y-auto pr-2 hide-scrollbar">
                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">A&nbsp;
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">le gustò tu publicaciòn</span>
                    </div>
                    <img className="size-20 rounded-xl" src={post} alt="post" />
                  </div>
                </div>

                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">A&nbsp;
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">le gustò tu publicaciòn</span>
                    </div>
                    <img className="size-20 rounded-xl" src={post} alt="post" />
                  </div>
                </div>

                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">Comenzó a seguirte</span>
                    </div>
                    <button className="rounded-xl bg-red-300 p-2">Follow</button>
                  </div>
                </div>

                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">A&nbsp;
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">le gustò tu publicaciòn</span>
                    </div>
                    <img className="size-20 rounded-xl" src={post} alt="post" />
                  </div>
                </div>


                <h2 className="text-gray-600 font-semibold">Esta semana </h2>

                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>

                      <span className="text-[1rem] text-gray-600 truncate">Comenzó a seguirte</span>
                    </div>
                    <button className="rounded-xl bg-gray-200 p-2">Unfollow</button>
                  </div>
                </div>
                <h2 className="text-gray-600 font-semibold">Este Mes </h2>

                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">A&nbsp;
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">le gustò tu publicaciòn</span>
                    </div>
                    <img className="size-20 rounded-xl" src={post} alt="post" />
                  </div>
                </div>
                <h2 className="text-gray-600 font-semibold">Sugerencias para ti</h2>
                 <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">NombreDeUsuario</span>
                    </div>
                    <button className="rounded-xl bg-red-300 p-2">Follow</button>
                  </div>
                </div>
                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">NombreDeUsuario</span>
                    </div>
                    <button className="rounded-xl bg-red-300 p-2">Follow</button>
                  </div>
                </div>
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

