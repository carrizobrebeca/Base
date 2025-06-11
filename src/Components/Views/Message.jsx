import { useEffect, useState } from "react";
import SidebarLeft from "../Pages/SidebarLeft";
import { useNavigate } from "react-router-dom";
import SidebarLeftMessage from "../Pages/SidebarLeftMessage";
import galery from "../../assets/galery_icon.png";
import send from "../../assets/send_icon.png";
import sendimg from "../../assets/sendmsg.PNG";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Message() {

  const { id: chatId } = useParams();
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const [messages, setMessages] = useState([]);
  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };

  useEffect(() => {
    // Acá podrías hacer un fetch del chat usando chatId
    console.log("ID del chat:", chatId);
  }, [chatId]);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/message/${chatId}`);
        setMessages(res.data); // Guardás todos los mensajes en el estado
      } catch (err) {
        console.error("Error al cargar mensajes", err);
      }
    };

    fetchMessages();
  }, [chatId]);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100 relative">
      {/* LEFT SIDEBAR */}
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

      {/* RIGHT SIDEBAR PEGADO AL LEFT */}
      <aside className="hidden lg:flex fixed left-64 top-0 h-screen w-64 flex-col bg-gray-100 p-4 border-r z-10">
        <SidebarLeftMessage />
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col lg:ml-[32rem] h-screen overflow-hidden">
        <header className="bg-gray-100 text-white py-4 shadow-md sticky top-0 z-20">
          <div className="flex items-center gap-4 max-w-4xl mx-auto text-left pl-4 text-text font-semibold">
            <button onClick={() => navigate("/home")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 lg:w-6 lg:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>

            <img className="rounded-full h-[50px] w-[50px]"
              src={user.image}
            />

            <div onClick={() => navigate("/profileuser")} className="flex flex-col ">
              <h2 className="text-sm lg:text-xl">{user.name} </h2>
              <h3 className="text-sm lg:text-sm">{user.userName} </h3>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-gray-100 w-full hide-scrollbar">
          <div className="h-[200vh] bg-gray-100">

            <div className='chat-box'>


              <div className="chat-msg hide-scrollbar">
                <div className="chat-msg hide-scrollbar">
                  {messages.map((msg) => {
                    const isMyMessage = msg.senderId === user.id;
                    const time = new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <div key={msg.id} className={isMyMessage ? "s-msg" : "r-msg"}>
                        {msg.content.includes("http") ? (
                          <img className="msg-img" src={msg.content} alt="sent content" />
                        ) : (
                          <p className="msg">{msg.content}</p>
                        )}
                        <div>
                          <img
                           src={msg.User?.image || "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"}
                            alt="profile"
                          />
                          <p>{time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>


              {/* <div className="chat-input">
                <input type="text" placeholder='Enviar un mensaje' />
                <input type="file" id="image" accept='image/png, image/jpeg' hidden />
                <label htmlFor="image">
                    <img src={galery} alt="" />
                </label>
                <img src={send} alt="" />
            </div> */}
            </div>

          </div>
        </main>
        <footer className="w-full flex justify-between items-center p-4 border-2 rounded-full">
          <button className="text-xl text-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 lg:w-6 lg:h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Enviar mensaje..."
            className="text-base lg:text-xl text-text w-full pl-2 ml-4 mr-4 rounded-full"
          />
          <input type="file" id="image" accept='image/png, image/jpeg' hidden />
          <label htmlFor="image">
            <img className="h-[35px]" src={galery} alt="" />
          </label>
          <button className="text-xl text-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 lg:w-6 lg:h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </footer>
      </div>
    </div>
  );
}
