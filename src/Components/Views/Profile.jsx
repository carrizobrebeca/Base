import { useState } from "react";
import Header from "../Pages/Header";
import Nav from "../Pages/Nav";
import SidebarLeft from "../Pages/SidebarLeft";
import SidebarRight from "../Pages/SidebarRight";

export default function Profile() {
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
      {/* LEFT SIDEBAR */}
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

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col lg:ml-64 lg:mr-64 h-screen overflow-hidden">
        {/* NAVBAR */}
        <header className="bg-blue-600 text-white py-4 shadow-md sticky top-0 z-20">
          <div className="max-w-4xl mx-auto text-center text-xl font-semibold">
            <Nav />
          </div>
          <div className="hidden lg:block max-w-4xl mx-auto text-center text-xl font-semibold">
            <Header />
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <h1 className="text-2xl font-bold mb-4">Contenido principal</h1>
          <p>Este contenido se muestra entre los sidebars.</p>
          <div className="h-[200vh] bg-gray-100 mt-8">Contenido de prueba largo</div>
        </main>
      </div>
    </div>
  );
}
