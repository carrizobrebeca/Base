import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../store/eventSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchPost } from "../../store/postSlice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("events");
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const user = useSelector((state) => state.login.user);
  const allEvents = useSelector((state) => state.event.allEvent);
  const status = useSelector((state) => state.event.status);

  const allPosts = useSelector((state) => state.post.allpost);


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvent());
      dispatch(fetchPost());
    }
  }, [dispatch, status]);

  const myEvents = user ? allEvents.filter(event => event.creatorId === user.id) : [];
  const myPosts = user ? allPosts.filter(post => post.userId === user.id) : [];
 
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
            <NavSmProfileSecond activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

        </header>
        {activeTab === "events" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
            <div className="min-h-screen bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {myEvents.map((event) => (
                  <div key={event.id} onClick={() => navigate("/profileevent", { state: { event } })} className="border rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {activeTab === "post" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white hide-scrollbar">
            <div className="h-[200vh] bg-white">
              <div className="grid grid-cols-2 lg:grid-cols-3 pt-2 ">
                <>
                  {myPosts.map((post) => (
                    <>
                      <div>
                        <img className="rounded-3xl p-1 w-full aspect-square" src={post.image} alt="post" />
                        <h3 className="w-[50%] pl-3 text-sm truncate">{post.description}</h3>
                  
                      </div>
                    </>
                  ))}
                </>
              </div>
            </div>
          </main>
        )}
        {activeTab === "seved" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
            <div className="h-[200vh] bg-white">
              <>
                <h3 className="flex justify-center items-center text-text font-bold">Parece que no guardaste nada aùn</h3>
                <div className="flex justify-center items-center">
                  <img className="rounded-xl " src=" https://cdn3.iconfinder.com/data/icons/calendar-107/64/Calendar-22-512.png" alt="post" />
                </div>

              </>
            </div>
          </main>
        )}
        <header className="bg-gray-100 text-white lg:shadow-md sticky top-0 z-20 pl-4">
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            <NavSmFooter />
          </div>
        </header>
      </div>
    </div>
  );
}
