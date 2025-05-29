import { useState } from "react";
import Header from "../Pages/Header";
import Nav from "../Pages/Nav";
import SidebarLeft from "../Pages/SidebarLeft";
import SidebarRight from "../Pages/SidebarRight";
import SidebarLeftMessage from "../Pages/SidebarLeftMessage";
import SidebarLeftNotification from "../Pages/SidebarLeftNotification";
import SidebarLeftSearch from "../Pages/SidebarLeftSearch";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
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
    <div className="flex min-h-screen overflow-hidden bg-gray-100 ">
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col p-4 z-30">
        <SidebarLeft
          minimized={isSidebarMinimized}
          setMinimized={setIsSidebarMinimized}
          onMessagesClick={() => handlePanelOpen("messages")}
          onNotificationsClick={() => handlePanelOpen("notifications")}
          onSearchClick={() => handlePanelOpen("search")}
          onDefaultClick={handleResetSidebar}
        />
        
      </aside>
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col p-4 z-20">
        <SidebarLeft
          minimized={isSidebarMinimized}
          setMinimized={setIsSidebarMinimized}
          onMessagesClick={() => {
    handlePanelOpen("message");
    navigate("/message"); 
  }}
  onProfileClick={() => {
    handlePanelOpen("profile");
    navigate("/profile"); 
  }}
          onNotificationsClick={() => handlePanelOpen("notifications")}
          onSearchClick={() => handlePanelOpen("search")}
          onDefaultClick={handleResetSidebar}
        />
        {activePanel && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              {/* {activePanel === "messages" && <SidebarLeftMessage />} */}
               {activePanel === 'notifications' && <SidebarLeftNotification />} 
              {activePanel === 'search' && <SidebarLeftSearch />} 
            </div>
          </div>
        )}
      </aside>

      {/* RIGHT SIDEBAR */}
      <aside className="hidden lg:flex fixed right-0 top-0 h-screen w-64 flex-col bg-gray-200 p-4 border-l z-1">
        <SidebarRight />
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col lg:ml-64 lg:mr-64 h-screen overflow-hidden">
        {/* NAVBAR */}
        <header className="bg-blue-600 text-white py-4 shadow-md sticky top-0 z-10">
          <div className="max-w-4xl mx-auto text-center text-xl font-semibold">
            <Nav />
          </div>
          <div className="hidden lg:block max-w-4xl mx-auto text-center text-xl font-semibold">
            <Header />
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-gray-100 w-full hide-scrollbar">
          <div className="h-[200vh] bg-gray-100 ">
            Contenido de prueba largo
          </div>
        </main>
      </div>
    </div>
  );
}
