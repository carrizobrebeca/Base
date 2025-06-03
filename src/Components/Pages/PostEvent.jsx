import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import SidebarLeft from "./SidebarLeft";
import NavSmProfile from "./NavSmProfile";
import NavSmFooter from "./NavSmFooter";
import post from "../../assets/post.PNG";
import { fetchNewEvent } from "../../store/eventSlice";
const PostEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  // const { status } = useSelector((state) => state.login);

  const eventStatus = useSelector((state) => state.event.status);
  const eventError = useSelector((state) => state.event.error);
  const [formSubmitted, setFormSubmitted] = useState(false);
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


  const [state, setState] = useState({
    name: "",
    title: "",
    image: "https://i.pinimg.com/474x/75/01/5a/75015a19db67c5ca6f18ef7e000d0a61.jpg",
    type: "",
    location: "",
    eventDate:"",
    eventTime:"",

  });
  const [error, setError] = useState({
    name: "*",
    title: "*",
    type: "*",
    location: "*",
  // eventDate:"*",
  //   eventTime:"*",
  });



  useEffect(() => {
    if (eventStatus === "succeeded" && formSubmitted) {
      navigate("/home");
    }
  }, [eventStatus, formSubmitted, navigate]);

  useEffect(() => {
    if (eventStatus === "failed" && eventError) {
      alert(eventError);
    }
  }, [eventStatus, eventError]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: name === "image" && value.trim() === ""
        ? "https://i.pinimg.com/474x/75/01/5a/75015a19db67c5ca6f18ef7e000d0a61.jpg"
        : value,
    }));

    validate(
      {
        ...state,
        [name]: value,
      },
      name
    );
  };


  const disable = () => {
    if (formSubmitted) return true;
    return Object.values(error).some((error) => error !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(false);
const trimmedTime = moment(state.eventTime, 'HH:mm').format('HH:mm');
const formattedDate = moment(state.eventDate, ['DD-MM-YYYY', 'DD/MM/YYYY']).format('YYYY-MM-DD');
    if (!disable()) {
      dispatch(fetchNewEvent({
        ...state,
        eventTime: trimmedTime,
        eventDate: formattedDate,
        creatorId: user?.id
      }))
        .unwrap()
        .then((response) => {
          navigate("/home");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };



  const validate = (state, name) => {
    if (name === "name") {
      if (state.name === "") {
        setError((prev) => ({ ...prev, name: "Nombre no puede estar vacío" }));
      } else {
        setError((prev) => ({ ...prev, name: "" }));
      }
    }
    if (name === "title") {
      if (state.title === "") {
        setError((prev) => ({ ...prev, title: "Título no puede estar vacío" }));
      } else {
        setError((prev) => ({ ...prev, title: "" }));
      }
    }
    if (name === "location") {
      if (state.location === "") {
        setError((prev) => ({ ...prev, location: "Lugar no puede estar vacío" }));
      } else {
        setError((prev) => ({ ...prev, location: "" }));
      }
    }
    if (name === "type") {
      if (state.type === "") {
        setError((prev) => ({ ...prev, type: "Tipo no puede estar vacío" }));
      } else {
        setError((prev) => ({ ...prev, type: "" }));
      }
    }
  };

  return (
    <div>
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
            </div>
          </header>

          {/* MAIN SCROLLABLE CONTENT */}
          <main className="flex-1 max-w-4xl mx-auto p-4 bg-white w-full ">
            <div className="h-full bg-white">
              <>
                <form
                  className="w-full h-full pb-4 flex items-center bg-white font-momo rounded-xl"
                  onSubmit={handleSubmit}
                >
                  <div className="p-14">
                    <div className="pb-4">
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="text"
                        placeholder="Nombre del evento"
                        required
                        name="name"
                        id="name"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pb-4 relative">
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="text"
                        placeholder="Tipo de evento"
                        required
                        name="type"
                        id="type"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pb-4 relative"> {/* <- AGREGÁ ESTO */}
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="text"
                        placeholder="Tìtulo"
                        required
                        name="title"
                        id="title"
                        onChange={handleChange}
                      />
                    </div>
                      <div className="pb-4">
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="date"
                        placeholder="12-03-2025"
                        required

                        name="eventDate"
                        id="eventDate"
                        onChange={handleChange}
                      />
                    </div>
                      <div className="pb-4">
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="time"
                        placeholder="22:30"
                        required

                        name="eventTime"
                        id="eventTime"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="text"
                        placeholder="Ciudad, Provincia, Pais"
                        required

                        name="location"
                        id="location"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="text"
                        placeholder="URL de la imagen"

                        name="image"
                        id="image"
                        onChange={handleChange}
                      />
                    </div> <img className='w-full aspect-square rounded-lg' src={state.image || "https://i.pinimg.com/474x/75/01/5a/75015a19db67c5ca6f18ef7e000d0a61.jpg"}
                      alt="Vista previa"
                    />
                    <div className="pt-2 pb-4 flex justify-center">
                      <button
                        type="submit"
                        className="bg-red-400 rounded-xl text-white p-2 disabled:opacity-50"
                        disabled={disable()}
                      >
                        Publicar
                      </button>
                    </div>


                  </div>
                </form>

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








    </div>
  );
};

export default PostEvent;



