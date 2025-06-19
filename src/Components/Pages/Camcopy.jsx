import React, { useEffect, useRef, useState } from "react";
import "./Camera.css"
import SidebarLeft from "./SidebarLeft";
import NavSmFooter from "./NavSmFooter";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Camcopy() {
  const video = useRef();
  const photo = useRef();
  const [photos, setPhotos] = useState(false);
  const [videos, setVideos] = useState(false);

  const cameraView = () => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 1080 , height: 1920 },
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
      const w= 414;
      const  h= w / (16 / 9);
      let vid = video.current;
      let ph = photo.current;

      ph.width = w;
      ph.height = h;
      let context = ph.getContext("2d");
      context.drawImage(vid, 0, 0, w, h);
      setPhotos(true);   
    } catch (error) {
      console.log(error);
    }
  };
  const closePhoto = () => {
    let ph = photo.current;
      let context = ph.getContext("2d");
      context.clearRect(0, 0, ph.width, ph.height);
      setPhotos(false);
  };
  useEffect(() => {
    cameraView();
  }, [video]);

  const [activePanel, setActivePanel] = useState(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto p-4 bg-white w-full">
          <div className="relative min-h-screen bg-black flex flex-col justify-center items-center gap-8 rounded-xl py-8">
            {/* Video y botón de captura */}

            <div className="flex flex-col items-center gap-4">
              <button className="bg-white rounded-full text-text font-bold">X</button>

              <video
                ref={video}
                className="bg-white object-cover h-[192px] w-[108px] rounded-xl"
                autoPlay
                playsInline
              ></video>

              <button
                className="w-[80px] h-[80px] rounded-full bg-gray-100 border-4 border-red-400 p-2"
                onClick={takePhoto}
              ></button>
            </div>

            {/* Canvas y botón (puede ser para guardar o volver a capturar) */}
          
            <div className="flex flex-col items-center gap-4 fixed">
              <button onClick={closePhoto} className="bg-white rounded-full text-text font-bold">X</button>
              <canvas
                ref={photo}
                className="bg-white object-cover h-[192px] w-[108px] w-auto rounded-xl"
              />

              <button className="w-[80px] h-[80px] rounded-full bg-gray-100 border-4 border-red-400 items-center">Continuar</button>
            </div>  
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
