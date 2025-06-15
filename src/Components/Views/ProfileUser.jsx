import { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "../Pages/SidebarLeft";
import NavSmFooter from "../Pages/NavSmFooter";

import HeaderProfileUser from "../Pages/HeaderProfileUser";
import NavSmProfileUser from "../Pages/NavSmProfileUser";
import { useLocation, useNavigate } from "react-router-dom";
import NavSmProfileSecondUser from "../Pages/NavSmProfileSecondUser";
import { fetchEvent } from "../../store/eventSlice";
import { fetchPost } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedUser = location.state?.selectedUser;
  const [activeTab, setActiveTab] = useState("events");
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const allEvents = useSelector((state) => state.event.allEvent);
  const status = useSelector((state) => state.event.status);

  const allPosts = useSelector((state) => state.post.allpost);


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

  console.log("post selec: ", myPosts);
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
            <NavSmProfileUser user={selectedUser} />
            <HeaderProfileUser user={selectedUser} myPosts={myPosts} />
            <NavSmProfileSecondUser user={selectedUser} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

        </header>


        {activeTab === "post" && (
          <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">

            <div className="h-[200vh] bg-white mt-2">
              <>
                {groupedPosts.map((group, index) => (
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
                ))}
              </>
            </div>
          </main>
        )}

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
            <NavSmFooter user={selectedUser} />

          </div>
        </header>
      </div>
    </div>
  );
}
