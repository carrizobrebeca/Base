import { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "../Pages/SidebarLeft";
import NavSmFooter from "../Pages/NavSmFooter";

import HeaderProfileUser from "../Pages/HeaderProfileUser";
import NavSmProfileUser from "../Pages/NavSmProfileUser";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchEvent } from "../../store/eventSlice";
import { fetchPost } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import NavSmProfileSecond from "../Pages/NavSmProfileSecond";
import axios from "axios";

export default function ProfileUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const selectedUser = location.state?.selectedUser;
  const [activeTab, setActiveTab] = useState("events");
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [permitido, setPermitido] = useState([]);
  const allEvents = useSelector((state) => state.event.allEvent);
  const status = useSelector((state) => state.event.status);
  const [error, setError] = useState(null);
  const allPosts = useSelector((state) => state.post.allpost);

const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3001/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const follow = res.data.filter(
        (r) => r.requesterId === user.id
      );
      const acceptedFollowed = follow.filter(
        (r) => r.status === 'accepted'
      );

      const seguidos = acceptedFollowed.filter(
        (r) => r.targetId === selectedUser.id
      );
      setPermitido(seguidos);
      console.log("seguidos:", seguidos);
      if (seguidos.length === 0) {
        setActiveTab("private");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token && selectedUser) {
      fetchRequests();
    }
  }, [token, selectedUser]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvent());
      dispatch(fetchPost());
    }
  }, [dispatch, status]);

  const myEvents = selectedUser ? allEvents.filter(event => event.creatorId === selectedUser.id) : [];
  const myPosts = selectedUser ? allPosts.filter(post => post.userId === selectedUser.id) : [];

  const groupedPosts = [];
  for (let i = 0; i < myPosts.length; i += 2) {
    groupedPosts.push(myPosts.slice(i, i + 2));
  }


  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };

  

  const handleTabChange = (tab) => {
    if (permitido.length === 0) {
      setActiveTab("private");
    } else {
      setActiveTab(tab);
    }
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
            <NavSmProfileUser user={selectedUser} />
            <HeaderProfileUser user={selectedUser} myPosts={myPosts} />
            <NavSmProfileSecond user={selectedUser} activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>

        </header>


        {/* cuenta privada */}

        {activeTab === "private" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
            <div className="h-[200vh] bg-white">
              <>

                <div className="flex justify-center items-center pt-10">
                  <div className="border-2 border-gray-400 rounded-full p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                </div>
                <h3 className="flex justify-center items-center text-text text-2xl  pt-2">Esta cuenta es privada</h3>
                <h3 className="flex justify-center items-center text-text">Debes seguirla para ver sus eventos y publicaciones</h3>
              </>
            </div>
          </main>
        )}


        {activeTab === "post" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">

            <div className="h-[200vh] bg-white mt-2">
              <>
                {groupedPosts.length > 0 ? groupedPosts.map((group, index) => (
                  <div key={index} className="grid grid-cols-2 pt-2">

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
                )
                ) : (
                  < div>
                    <div className="flex justify-center items-center pt-10">
                      <div className="border-2 border-gray-400 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>

                      </div>
                    </div>
                    <h3 className="flex justify-center items-center text-text text-2xl pt-2">Sin publicaciones aun</h3>
                  </div>
                )}
              </>
            </div>
          </main>
        )}

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
            <NavSmFooter user={selectedUser} />

          </div>
        </header>
      </div>
    </div>
  );
}
