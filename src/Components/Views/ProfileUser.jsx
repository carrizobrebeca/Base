import { useState } from "react";
import Header from "../Pages/Header";
import Nav from "../Pages/Nav";
import SidebarLeft from "../Pages/SidebarLeft";
import SidebarRight from "../Pages/SidebarRight";
import NavSm from "../Pages/NavSm";
import NavSmFooter from "../Pages/NavSmFooter";
import NavSmProfile from "../Pages/NavSmProfile";
import NavProfile from "../Pages/NavProfile";
import NavSmProfileSecond from "../Pages/NavSmProfileSecond";
import HeaderProfile from "../Pages/HeaderProfile";
import HeaderProfileUser from "../Pages/HeaderProfileUser";
import NavSmProfileUser from "../Pages/NavSmProfileUser";

export default function ProfileUser() {
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
            <NavSmProfileUser />
            <HeaderProfileUser />
           <NavSmProfileSecond />
          </div>
             
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          
          <div className="h-[200vh] bg-gray-100 mt-8">Contenido de prueba largo</div>
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
