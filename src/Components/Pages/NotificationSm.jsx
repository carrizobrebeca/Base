import React, { useEffect, useState } from "react";
import post from "../../assets/post.PNG";
import SidebarLeft from "./SidebarLeft";
import NavSmFooter from "./NavSmFooter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchPost } from "../../store/postSlice";

export default function NotificationSm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [recentUsers, setRecentUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const [requests, setRequests] = useState([]);
  const [followed, setFollowed] = useState([]);
  const allPosts = useSelector((state) => state.post.allpost);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);



  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/notifications/${user.id}`);
        setNotifications(res.data);


      } catch (err) {
        console.error('Error al obtener notificaciones:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchNotifications();
  }, [user]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3001/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const onlyRequestsToMe = res.data.filter(
        (r) => r.targetId === user.id
      );
      setRequests(onlyRequestsToMe);
      const follow = res.data.filter(
        (r) => r.requesterId === user.id
      );
      const acceptedFollowed = follow.filter(
        (r) => r.status === 'accepted'
      );

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


  const handleAccept = async (requesterId,
    targetId) => {
    try {
      await axios.put('http://localhost:3001/accept', {
        requesterId,
        targetId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchRequests(); // Actualizá la lista
    } catch (error) {
      console.error("❌ Error al aceptar solicitud:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.put(`http://localhost:3001/reject/${requestId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRequests(); // vuelve a traer los requests
    } catch (error) {
      console.error(error);
    }
  };
console.log("seguidos", followed);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/users`);
        const users = response.data;
        const followedIds = followed.map((f) => f.id);

const final = users.filter((u) => !followedIds.includes(u.id));
        const recents = final
          .filter((u) => u.id !== user.id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setRecentUsers(recents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [followed]);

  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };
  console.log("me gustaaaasss", notifications);

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
                <svg onClick={() => navigate("/home")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <h2 className="text-text text-xl font-bold pl-4">Notificaciones</h2>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full hide-scrollbar">
          <h2 className="text-gray-600 font-semibold">Recientes</h2>
          <div className="h-[200vh] bg-white">
            <>
              <div className="w-full flex-1 overflow-y-auto pr-2 hide-scrollbar">

                {requests.length > 0 ? (
                  requests.map((req) => {

                    return (
                      <div key={req.id} className="w-full pt-7 pb-7">
                        <div className="flex justify-between items-center">
                          <img
                            src={req.requester.image}
                            className="w-20 h-20 object-cover rounded-full"
                          />
                          <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                            <h2 className="whitespace-nowrap">
                              <span className="font-bold truncate">{req.requester.name}</span>
                            </h2>

                            {req.status === "pending" && (

                              <span className="text-[1rem] text-gray-600 truncate">quiere seguirte</span>
                            )}

                            {req.status === "accepted" && (
                              <span className="text-[1rem] text-gray-600 truncate">comenzó a seguirte</span>
                            )}

                          </div>

                          {req.status === "pending" && (

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleReject(req.id)}
                                className="rounded-xl bg-gray-200 px-3 py-2"
                              >
                                Rechazar
                              </button>
                              <button
                                onClick={() => handleAccept(req.requesterId, req.targetId)}
                                className="rounded-xl bg-bg-red-400 px-3 py-2"
                              >
                                Aceptar
                              </button>

                            </div>
                          )}

                          {req.status === "accepted" && (
                            //aun no hace nada
                            <button className="rounded-xl bg-red-400 p-2">Perfil</button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No tenés solicitudes.</p>
                )}
                {followed.length > 0 ? (
                  followed.map((req) => {
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
                            <span className="text-[1rem] text-gray-600 truncate">aceptó tu solicitud</span>
                          </div>
                          <button className="rounded-xl bg-red-400 p-2">Mensaje</button>

                        </div>
                      </div>
                    );
                  })
                ) : (

                  <p className="text-sm text-gray-500"></p>
                )}

                {notifications.map((n) => {
                  const post = allPosts.find(p => p.id === n.postId);
                  return (
                    <div key={n.id} className="w-full pt-7 pb-7">
                      <div className="flex justify-between  flex items-center">
                        <img
                          src={n.actor?.image}
                          className="w-20 h-20 object-cover rounded-full"
                        />
                        <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                          <h2 className="whitespace-nowrap">A&nbsp;
                            <span className="font-bold truncate">{n.actor?.name}</span>
                          </h2>
                          <span className="text-[1rem] text-gray-600 truncate">le gustò tu publicaciòn</span>
                        </div>
                        {post ? (
                          <img
                            className="size-20 rounded-xl object-cover"
                            src={post.image}
                            alt="post"
                          />
                        ) : (
                          <div className="size-20 flex items-center justify-center text-gray-400">
                            
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                <div className="w-full pt-7 pb-7">
                  <div className="flex justify-between  flex items-center">
                    <img
                      src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                      <h2 className="whitespace-nowrap">A&nbsp;
                        <span className="font-bold truncate">NombreMuyLargoDeEjemplo</span>
                      </h2>
                      <span className="text-[1rem] text-gray-600 truncate">te invito a un evento</span>
                    </div>
                    <img className="size-20 rounded-xl" src={post} alt="post" />
                  </div>
                </div>


                <h2 className="text-gray-600 font-semibold">Esta semana </h2>


                <h2 className="text-gray-600 font-semibold">Este Mes </h2>


                <h2 className="text-gray-600 font-semibold">Sugerencias para ti</h2>
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                   
                    <div key={user.id} className="w-full pt-7 pb-7" onClick={() => navigate("/profileuser", { state: { selectedUser: user } })}>
                      <div className="flex justify-between  flex items-center">
                        <img
                          src={user.image}
                          className="w-20 h-20 object-cover rounded-full"
                        />
                        <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                          <h2 className="whitespace-nowrap">
                            <span className="font-bold truncate">{user.name}</span>
                          </h2>
                          <span className="text-[1rem] text-gray-600 truncate">{user.userName}</span>
                        </div>
                        <button className="rounded-xl bg-red-400 p-2">Perfil</button>
                      </div>
                    </div>
                  ))
                ) : (

                  <div className="flex-col pt-7 pb-12 text-text items-center h-[2rem] w-full">
                    Parece que no hay usuarios nuevos
                  </div>
                )}
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

