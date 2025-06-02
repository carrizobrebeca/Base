import { useState } from "react";
import post from "../../assets/post.PNG";
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
import { useSelector } from "react-redux";

export default function Profile() {
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  
   const user = useSelector((state) => state.login.user);

  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white relative">
 
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
   
        <header className="bg-white text-white sticky top-0 z-20">
        
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            <NavSmProfile />
            <HeaderProfile />
        
           <NavSmProfileSecond />
          </div>
             
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <div className="h-[200vh] bg-white">
             <>
                  <div className="grid grid-cols-3 gap-0">
                    <div>
                      <img className="" src={post} alt="post" />
                    </div>
                    <div>
                      <img className="" src={post} alt="post" />
                    </div>
                    <div>
                      <img className="" src={post} alt="post" />
                    </div>
                  </div>
                   <div className="grid grid-cols-3 gap-0">
                    <div>
                      <img className="" src={post} alt="post" />
                    </div>
                    <div>
                      <img className="" src={post} alt="post" />
                    </div>
                    <div>
                      <img className="" src={post} alt="post" />
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
