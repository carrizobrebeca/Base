import React, { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "./SidebarLeft";

import NavSmFooter from "./NavSmFooter";
import NavSearch from "./NavSearch";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function AddUserEvent({ event }) {
  const { eventId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "followers");
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [followed, setFollowed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);

const [attendees, setAttendees] = useState([]);
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleInvite = async () => {
    if (selectedValues.length === 0) return;

    try {
      await axios.post(
        `http://localhost:3001/event/${eventId}/invite`,
        { userIds: selectedValues },
       
        
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Usuarios invitados correctamente");
    } catch (err) {
      setError(err.message);
      console.error("Error al invitar:", err);
    }
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

      console.log("seguidos:", acceptedFollowed);

      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      const seguidos = acceptedFollowed.map((relacion) =>
        users.find((user) => user.id === relacion.targetId)
      )
      setFollowed(seguidos)
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token]);

  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };
 useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/event/${eventId}/attendees`);
        
            const attendees = res.data;

        setAttendees(attendees);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [eventId]);

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
            <div className="bg-white text-gray-600 w-full flex justify-between">
              <div className="mt-2 ml-4 mb-2 mr-4 bg-white flex w-full items-center">
                <svg onClick={() => navigate("/profile")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT     onClick={() => navigate("/profileuser")} */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <div className="flex justify-around border-b-2 border-gray-300">
            <h2 
              className={`text-gray-600 font-semibold cursor-pointer px-4 py-2`}>Participantes</h2>
          </div>

          <div className="h-[200vh] bg-white">

            <> <div className="w-full flex-1 overflow-y-auto pr-2 hide-scrollbar">
      <section>
                {attendees.length > 0 ? (
                  attendees.map((req) => {
                    // console.log("REQ ID:", req.id, "id:", req.requester?.id);
                    return (
                      <div key={req.id} className="w-full pt-7 pb-7">
                        <div className="flex justify-between items-center">
                          <img
                            src={req.image}
                            className="w-20 h-20 object-cover rounded-full"
                          />
                          <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                            <h2 className="whitespace-nowrap">
                              <span className="font-bold truncate">{req.name}</span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No tenés invitados aún</p>
                )}
              </section>
            
              
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

