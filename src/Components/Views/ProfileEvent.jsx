import { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "../Pages/SidebarLeft";
import NavSmFooter from "../Pages/NavSmFooter";
import NavSmProfile from "../Pages/NavSmProfile";
import NavSmProfileSecond from "../Pages/NavSmProfileSecond";

import HeaderEvent from "../Pages/HeaderEvent";
import { useLocation } from "react-router-dom";
import { fetchPost } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileEvent() {
 const dispatch = useDispatch();
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

  const location = useLocation();
  const event = location.state?.event;


  const allPost = useSelector((state) => state.post.allpost);
  const status = useSelector((state) => state.post.status);




  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPost());
    }
  }, [dispatch, status]);

  if (!event) {
    return <p className="text-center mt-10 text-red-500">No se encontró el post.</p>;
  }

  const myPost = allPost.filter((post) => post.eventId === event.id);


  const groupedPosts = [];
  for (let i = 0; i < myPost.length; i += 2) {
    groupedPosts.push(myPost.slice(i, i + 2));
  }


   
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
            <HeaderEvent event={event} />
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <h1 className="text-2xl font-bold mt-2">{event.title}</h1>
          <div className="h-[200vh] bg-white mt-8">
            <>
      {groupedPosts.map((group, index) => (
        <div key={index} className="grid grid-cols-2 pt-2">
          {/* Primer post del grupo */}
          <div>
            {group[0] && (
              <>
                <img
                  className="rounded-3xl p-1"
                  src={group[0].image}
                  alt={`post-${index}-0`}
                />
                <h3 className="w-[50%] pl-3 text-sm truncate">
                  {group[0].description}
                </h3>
              </>
            )}
          </div>

          {/* Segundo post del grupo */}
          <div>
            {group[1] && (
              <>
                <h3 className="w-[50%] pl-3 text-sm truncate">
                  {group[1].description}
                </h3>
                <img
                  className="rounded-3xl p-1"
                  src={group[1].image}
                  alt={`post-${index}-1`}
                />
              </>
            )}
          </div>
        </div>
      ))}
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
