import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SidebarLeft from "./SidebarLeft";
import NavSmProfile from "./NavSmProfile";
import { fetchNewPost } from "../../store/postSlice";
const PostPost= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const postStatus = useSelector((state) => state.post.status);
  const postError = useSelector((state) => state.post.error);
 const location = useLocation();
const event = location.state?.event;
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
    image: "", 
    description: ""

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
      dispatch(fetchNewPost({
        ...state,
       userId: user?.id,
       eventId: event?.id
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
    if (name === "image") {
      if (state.image === "") {
        setError((prev) => ({ ...prev, image: "Imagen no puede estar vacía" }));
      } else {
        setError((prev) => ({ ...prev, image: "" }));
      }
    }
if (name === "description") {
  if (state.description === "") {
    setError((prev) => ({ ...prev, description: "Descripción no puede estar vacía" }));
  } else {
    setError((prev) => ({ ...prev, description: "" }));
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
                    <h2>Publicar en Evento</h2>
                    <div className="pb-4">
                      <input
                        className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                        type="text"
                        placeholder="Estado/Descripciòn"
                        required

                        name="description"
                        id="description"
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
                    </div> 
                    {/* state.image || */}
                    <img className='w-full aspect-square rounded-lg' src={ "https://i.pinimg.com/474x/75/01/5a/75015a19db67c5ca6f18ef7e000d0a61.jpg"}
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
        
        </div>
      </div>
    </div>
  );
};

export default PostPost;



