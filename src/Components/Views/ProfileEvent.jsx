import { useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "../Pages/SidebarLeft";
import NavSmFooter from "../Pages/NavSmFooter";
import NavSmProfile from "../Pages/NavSmProfile";
import NavSmProfileSecond from "../Pages/NavSmProfileSecond";

import HeaderEvent from "../Pages/HeaderEvent";

export default function ProfileEvent() {
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
{/* Hacerlo section para deslizar a las publicaciones*/}
      <div className="flex-1 flex flex-col lg:ml-64 lg:mr-64 h-screen overflow-hidden">
        <header className="bg-gray-100 text-white sticky top-0 z-20">
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            <NavSmProfile />
          </div>
                <div className="max-w-4xl mx-auto text-center text-xl font-semibold">
            <HeaderEvent />
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <h1 className="text-2xl font-bold mt-2">Estado/Titulo</h1>
          <div className="h-[200vh] bg-white mt-8">
            <>
                  <div className="grid grid-cols-2 pt-2">
                    <div>
                      <img className="rounded-3xl p-1" src={post} alt="post" />
                      <h3 className="w-[50%] pl-3 text-sm truncate">Estadomuylasdsdsdasdadrgo</h3>
                    </div>
                     <div>
                       <h3 className="w-[50%] pl-3 text-sm truncate">Estadomuylasdsdsdasdadrgo</h3>
                      <img className="rounded-3xl p-1" src={post} alt="post" />
                    </div>
                     
                  </div>
                      <div className="grid grid-cols-2  pt-2">
                    <div>
                      <img className="rounded-3xl p-1" src={post} alt="post" />
                       <h3 className="w-[50%] pl-3 text-sm truncate">Estadomuylasdsdsdasdadrgo</h3>
                    </div>
                     <div>
                       <h3 className="w-[50%] pl-3 text-sm truncate">Estadomuylasdsdsdasdadrgo</h3>
                      <img className="rounded-3xl p-1" src={post} alt="post" />
                    </div>
                     
                  </div>
                </>
          </div>
        </main>
        <header className="bg-gray-100 text-white lg:shadow-md sticky bottom-0 z-20 pl-4">
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            <NavSmFooter /> 
          </div>
        </header>
      </div>
    </div>
  );
}
