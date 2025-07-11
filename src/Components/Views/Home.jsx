import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Pages/Header";
import Nav from "../Pages/Nav";
import SidebarLeft from "../Pages/SidebarLeft";
import SidebarRight from "../Pages/SidebarRight";
import SidebarLeftNotification from "../Pages/SidebarLeftNotification";
import SidebarLeftSearch from "../Pages/SidebarLeftSearch";
import NavSmFooter from "../Pages/NavSmFooter";
import NavSm from "../Pages/NavSm";
import Post from "../Pages/Post";
import Event from "../Pages/Event";
import { fetchEvent } from "../../store/eventSlice";
import { fetchPost } from "../../store/postSlice";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const token = useSelector((state) => state.login.token);
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [followed, setFollowed] = useState([]);
  const allEvents = useSelector((state) => state.event.allEvent);
  const status = useSelector((state) => state.event.status);
  const allPosts = useSelector((state) => state.post.allpost);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvent());
      dispatch(fetchPost());
    }
  }, [dispatch, status]);

  const allEvent = user ? allEvents.filter(event => event.creatorId !== user.id) : [];
  const allPost = user ? allPosts.filter(post => post.userId !== user.id) : [];
  console.log(allPost);

  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };

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
      //aca solo tengo el id del usuario a quien sigo tengo q mapear con users
      console.log("seguidos?:", acceptedFollowed);


      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      // Trae todos los usuarios que coinciden con los targetId de relaciones aceptadas
      const seguidos = acceptedFollowed.map((relacion) =>
        users.find((user) => user.id === relacion.targetId)
      ) // Filtra por si alguno no se encuentra
      setFollowed(seguidos);
      console.log("que es estio:", seguidos);

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token]);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100 ">
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col p-4 z-30 ">
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
        <header className="bg-gray-100 text-white sticky top-0 z-10">
          <div className="max-w-4xl hidden lg:block mx-auto text-center text-xl font-semibold">
            <Nav />
          </div>
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold pl-4 p-4">
            <NavSm />
          </div>
          <div className="hidden lg:block max-w-4xl text-center text-xl font-semibold">
            <Header />
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-gray-100 w-full hide-scrollbar">
          <div className="h-[200vh] bg-gray-100">
            {allPost.filter((post) =>
              followed.some((f) => f.id === post.userId)
            )
              .map((post) => (
                <div className="pb-4">
                  <Post
                    key={post.id}
                    id={post.id}
                    description={post.description}
                    userId={post.userId}
                    eventId={post.eventId}
                    image={post.image}
                  />
                </div>
              ))}
            <div className="pb-4">
              <Event allEvent={allEvent} />
            </div>

          </div>
        </main>
        <header className="bg-gray-100 text-white lg:shadow-md sticky top-0 z-20">
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold pl-4">
            <NavSmFooter />
          </div>
        </header>
      </div>
    </div>
  );
}
