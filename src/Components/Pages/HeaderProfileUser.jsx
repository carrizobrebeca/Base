import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeaderProfileUser = ({ user, myPosts }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [activeTab, setActiveTab] = useState("buttons");
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.login.token);
   const userlog = useSelector((state) => state.login.user);
  const sendFollowRequest = async (targetUserId) => {
    try {
      const token = localStorage.getItem("token"); // Token guardado tras login

      const response = await axios.post(
        `http://localhost:3001/request/${targetUserId}`,
        {}, // body vacío porque no se necesita enviar datos extra
        {
          headers: {
            Authorization: `Bearer ${token}`, // Aquí va el token para autenticación
          },
        }
      );

      alert(response.data.message); // Mensaje desde backend: "Solicitud enviada"
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error enviando solicitud");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3001/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const onlyRequestsToMe = res.data.filter((r) => r.targetId === user.id);
      const accepted = onlyRequestsToMe.filter((r) => r.status === "accepted");

      //requesterId del que me manda solicitud mis seguidores
      setRequests(accepted);
   console.log("seguidorrrrrrr:", accepted);
   const permiso = accepted.filter(
        (r) => r.requesterId === userlog.id
      );
   
      console.log("perrrmiisooo:", permiso);
      if (permiso.length === 0) {
        setActiveTab("private");
      }
     
      
      const follow = res.data.filter((r) => r.requesterId === user.id);
      const acceptedFollowed = follow.filter((r) => r.status === "accepted");
      //aca solo tengo el id del usuario a quien sigo tengo q mapear con users
   

      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      // Trae todos los usuarios que coinciden con los targetId de relaciones aceptadas
      const seguidos = acceptedFollowed.map((relacion) =>
        users.find((user) => user.id === relacion.targetId)
      ); // Filtra por si alguno no se encuentra
      setFollowed(seguidos);

      
      
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token, userlog]);

  return (
    <div>
      <header className="bg-white p-4">
        {activeTab === "private" && (
          <div className="text-sm font-semibold">
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              <div className="text-gray-600 flex items-center w-30 h-30">
                <img
                  src={user.image}
                  className="object-cover aspect-square rounded-full h-[100px]"
                />
              </div>
              <div className="text-gray-600 flex items-center ">
                <button
                  onClick={() => sendFollowRequest(user.id)}
                  className="cursor-pointer bg-red-400  text-white p-2 rounded-xl"
                >
                  Seguir
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "buttons" && (
          <div className="text-sm font-semibold">
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              <div className="text-gray-600 flex items-center w-30 h-30">
                <img
                  src={user.image}
                  className="object-cover aspect-square rounded-full h-[100px]"
                />
              </div>
              <div className="text-gray-600 flex items-center ">
                <button
                  onClick={() => sendFollowRequest(user.id)}
                  className="cursor-pointer bg-red-400  text-white p-2 rounded-xl"
                >
                 
                  Dejar de Seguir
                </button>
              </div>
              <div className="text-gray-600 flex items-center ">
                <button className="cursor-pointer bg-gray-300 p-2 rounded-xl">
                
                  Mensaje
                </button>
              </div>
            </div>
            <h2>{user.description}</h2>
          </div>
        )}
      </header>

      <header className=" bg-white p-4">
        {activeTab === "private" && (
          
          <div className="text-sm font-semibold ">
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              <div className="text-gray-600 flex items-center ">
                <h2 className="whitespace-nowrap">
                  <span className="font-bold">{followed.length}</span>
                  &nbsp;seguidos
                </h2>
              </div>
              <div className="text-gray-600 flex items-center">
                <h2 className="whitespace-nowrap">
                  <span className="font-bold">{requests.length}</span>
                  &nbsp;seguidores
                </h2>
              </div>
              <div className="text-gray-600 flex items-center">
                <h2 className="whitespace-nowrap">
                  <span className="font-bold">{myPosts.length}</span>
                  &nbsp;publicaciones
                </h2>
              </div>
            </div>
          </div>
        )}
        {activeTab === "buttons" && (
          <div className="text-sm font-semibold ">
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              <div className="text-gray-600 flex items-center ">
                <h2 className="whitespace-nowrap">
                  <span className="font-bold">{followed.length}</span>
                  &nbsp;seguidos
                </h2>
              </div>
              <div className="text-gray-600 flex items-center">
                <h2 className="whitespace-nowrap">
                  <span className="font-bold">{requests.length}</span>
                  &nbsp;seguidores
                </h2>
              </div>
              <div className="text-gray-600 flex items-center">
                <h2 className="whitespace-nowrap">
                  <span className="font-bold">{myPosts.length}</span>
                  &nbsp;publicaciones
                </h2>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
export default HeaderProfileUser;
