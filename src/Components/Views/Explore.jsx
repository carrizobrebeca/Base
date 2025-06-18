import React, { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "../Pages/SidebarLeft";
import NavSmFooter from "../Pages/NavSmFooter";
import NavSearch from "../Pages/NavSearch";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../store/eventSlice";
import { fetchPost } from "../../store/postSlice";

export default function Explore() {

  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [publicUsers, setPublicUsers] = useState([]);
  const [error, setError] = useState(null);
  const allEvents = useSelector((state) => state.event.allEvent);
  const status = useSelector((state) => state.event.status);
  const allPosts = useSelector((state) => state.post.allpost);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvent());
      dispatch(fetchPost());
    }
  }, [dispatch, status]);

  const allEvent = user ? allEvents.filter(event => event.creatorId !== user.id) : [];
  const allPost = user ? allPosts.filter(post => post.userId !== user.id) : [];
console.log("estos son postpublicos", allPost);

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

      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;
      console.log("Usuarios Publicos:", users);
      const onlyPublicUsers = users.filter(
        (r) => r.isPrivate ===
          false
      );

      setPublicUsers(onlyPublicUsers);
      console.log("Usuarios Publicos:", onlyPublicUsers);

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
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

        <header className="bg-gray-100 text-white sticky top-0 z-20">

          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            {/* <NavSearch /> */}


 <div className="bg-white text-gray-600 w-full flex justify-between">
      <div className="mt-2 ml-4 mb-2 mr-4 bg-white flex w-full items-center">
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

        <input
          type="text"
          className="flex-grow rounded-full bg-gray-100 pl-4 py-2 mr-2 ml-2"
          placeholder="Buscar evento..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
          </div>

        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <h2 className="text-gray-600 font-semibold">Sugerencias para ti...</h2>
          <div className="h-[200vh] bg-white mt-2">
            <>
              <div className="grid grid-cols-2 gap-4">
                {allPost.filter((post) =>
              publicUsers.some((f) => f.id === post.userId)
            )
              .map((post) => (
                <div>
                  <img className="rounded-xl w-[100%]" src={post.image} alt="post" />
                  <div className="flex justify-end intems-center truncate">
                    <h2 className="truncate">{post.description}</h2>
                  </div>
                </div>
                 ))}
                {/* <div>
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
                </div> */}
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

