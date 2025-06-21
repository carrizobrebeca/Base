import React, { useEffect, useRef, useState } from "react";

import SidebarLeft from "./SidebarLeft";
import NavSmFooter from "./NavSmFooter";

import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchNewPost } from "../../store/postSlice";

export default function Camera() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const postStatus = useSelector((state) => state.post.status);
  const postError = useSelector((state) => state.post.error);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
 const video = useRef();
  const photo = useRef();
  const [photos, setPhotos] = useState(false);
  const [videos, setVideos] = useState(false);
  const [image, setImage] = useState("");

  const cameraView = () => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 1920, height: 1080 },
        })
        .then((stream) => {
          let myVideo = video.current;
          myVideo.srcObject = stream;
          myVideo.play();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const takePhoto = () => {
    try {
      // const w= 414;
      // const  h= w / (16 / 9);
      let vid = video.current;
      let ph = photo.current;

      // ph.width = w;
      // ph.height = h;
      let context = ph.getContext("2d");
      context.drawImage(vid, 0, 0, ph.width, ph.height);
      setPhotos(true);
      const dataUrl = ph.toDataURL("image/png");
      console.log(dataUrl);
      setImage(dataUrl);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("imagen", image);

  const closePhoto = () => {
    let ph = photo.current;
    let context = ph.getContext("2d");
    context.clearRect(0, 0, ph.width, ph.height);
    setPhotos(false);
  };
  useEffect(() => {
    cameraView();
  }, [video]);
  const handlePanelOpen = (panel) => {
    setActivePanel(panel);
    setIsSidebarMinimized(true);
  };

  const handleResetSidebar = () => {
    setIsSidebarMinimized(false);
    setActivePanel(null);
  };
  

 

  const [state, setState] = useState({
    image: "",
    description: "",
  });
  const [error, setError] = useState({
    image: "*",
    description: "*",
  });

  useEffect(() => {
    if (postStatus === "succeeded" && formSubmitted) {
      navigate("/home");
    }
  }, [postStatus, formSubmitted, navigate]);

  useEffect(() => {
    if (postStatus === "failed" && postError) {
      alert(postError);
    }
  }, [postStatus, postError]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
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


    if (!disable()) {
      dispatch(
        fetchNewPost({
          ...state,
          image: image,
          userId: user?.id,
          eventId: "1b55801d-88f2-4245-90c3-7db65841daa7",
        })
      )
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

    if (name === "description") {
      if (state.description === "") {
        setError((prev) => ({
          ...prev,
          description: "Descripción no puede estar vacía",
        }));
      } else {
        setError((prev) => ({ ...prev, description: "" }));
      }
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
            <div className="bg-white text-gray-600 w-full flex justify-between">
              <div className="mt-2 ml-4 mb-2 mr-4 bg-white flex w-full items-center">
                <svg
                  onClick={() => navigate("/home")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT     onClick={() => navigate("/profileuser")} */}
        {/* <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full ">
          <div className="relative h-[97%] bg-black flex justify-center items-center rounded-xl">
            <>
           
              <video
                ref={video}
                className="bg-white object-cover h-[100%] w-[100%] rounded-xl"
                autoPlay
                playsInline
              ></video>

              <div className="absolute -bottom-8">
                <button onClick={takePhoto} className="w-[80px] h-[80px] rounded-full bg-gray-100 border-4 border-red-400" ></button>
              </div>
             
            </>
          </div>
           
        </main> */}
        <form  onSubmit={handleSubmit} className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full">
          <div className="relative h-[97%] bg-black flex justify-center items-center rounded-xl">
            {/* VIDEO CAPA - fondo */}
            <div
              className={`absolute inset-0 z-0 ${photos ? "hidden" : "block"}`}
            >
              <video
                ref={video}
                className="bg-white object-cover h-full w-full rounded-xl"
                autoPlay
                playsInline
              ></video>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                <button
                  onClick={takePhoto}
                  className="w-[80px] h-[80px] rounded-full bg-gray-100 border-double border-white"
                ></button>
              </div>
            </div>

            {/* FOTO CAPA - adelante */}
            <div
              className={`absolute inset-0 z-10 ${
                photos ? "flex" : "hidden"
              } items-center justify-center`}
            >
              <canvas
                ref={photo}
                full
                className="bg-white object-cover h-full w-full rounded-xl"
              ></canvas>

              {/* Botón cerrar (arriba a la derecha) */}
              <button
                onClick={closePhoto}
                className="absolute top-4 text-white left-2 w-[40px] h-[40px] rounded-full bg-black/50 text-sm font-bold z-20 items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-10 items-center"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {/* Botón continuar (abajo centrado) */}
              <div className="absolute bottom-2 right-2 transform -translate-x-1/2 z-2 items-center">
                <div className="flex justify-between">
                  <input
                 type="text"
                        placeholder="Estado/Descripciòn"
                        required
                        name="description"
                        id="description"
                        onChange={handleChange}
                    className="w-full p-2 rounded-full text-gray-400"
                  />
                  <button disabled={disable()}  type="submit" className="w-[40px] h-[40px] rounded-full bg-white/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-10 items-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <header className="bg-gray-100 text-white lg:shadow-md sticky top-0 z-20 pl-4">
          <div className="max-w-4xl mx-auto lg:hidden text-center text-xl font-semibold">
            <NavSmFooter />
          </div>
        </header>
      </div>
    </div>
  );
}
