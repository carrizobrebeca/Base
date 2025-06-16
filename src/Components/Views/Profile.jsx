import { useEffect, useState } from "react";
import SidebarLeft from "../Pages/SidebarLeft";
import NavSmFooter from "../Pages/NavSmFooter";
import NavSmProfile from "../Pages/NavSmProfile";
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
  const [headerSection, setHeaderSection] = useState("default"); 
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
            <NavSmProfile setHeaderSection={setHeaderSection}/>
            <HeaderProfile headerSection={headerSection} myPosts={myPosts}/>
            <NavSmProfileSecond activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

        </header>
        {activeTab === "events" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
            <div className="min-h-screen bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {myEvents.length > 0 ? (myEvents.map((event) => (
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
                ))
                ) : (
                  <div >
                    <div className="flex justify-center items-center pt-10">
                      <div className="border-2 border-gray-400 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="flex justify-center items-center text-text text-2xl pt-2">
                      Sin eventos aun</h3>
                  </div>
                )}
              </div>
            </div>
          </main>
        )}


        {activeTab === "post" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white hide-scrollbar">
            <div className="h-[200vh] bg-white">
              <div className="grid grid-cols-2 lg:grid-cols-3 pt-2 ">
                <>
                  {myPosts.length > 0 ? (myPosts.map((post) => (
                    <>
                      <div>
                        <img className="rounded-3xl p-1 w-full aspect-square" src={post.image} alt="post" />
                        <h3 className="w-[50%] pl-3 text-sm truncate">{post.description}</h3>
                  
                      </div>
                    </>
                  ))
                ) : (
                  <div >
                    <div className="flex justify-center items-center pt-10">
                      <div className="border-2 border-gray-400 rounded-full p-4">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="flex justify-center items-center text-text text-2xl pt-2">
                      Sin eventos aun</h3>
                  </div>
                        
                    
                )}
                </>
              </div>
            </div>
          </main>
        )}

        {activeTab === "seved" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
            <div className="h-[200vh] bg-white">
              <div className="flex justify-center items-center pt-10">
                <div className="border-2 border-gray-400 rounded-full p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
                  </svg>
                </div>
              </div>
              <h3 className="flex justify-center items-center text-text text-2xl pt-2">Nada guardado aun</h3>
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
