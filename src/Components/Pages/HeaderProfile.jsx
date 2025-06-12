import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// activeTab={activeTab} setActiveTab={setActiveTab}
const HeaderProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const [requests, setRequests] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [error, setError] = useState(null);
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3001/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("Respuesta API requests:", res.data);
      // console.log("Usuario actual:", user);

      const onlyRequestsToMe = res.data.filter(
        (r) => r.targetId === user.id
      );
 const accepted = onlyRequestsToMe.filter(
          (r) => r.status === 'accepted'
        );
      console.log("Solicitudes para miiii:", onlyRequestsToMe);
//requesterId del que me manda solicitud mis seguidores
      setRequests(accepted);
const follow = res.data.filter(
        (r) => r.requesterId === user.id
      );
      const acceptedFollowed = follow.filter(
          (r) => r.status === 'accepted'
        );
        //aca solo tengo el id del usuario a quien sigo tengo q mapear con users
          console.log("seguidos:", acceptedFollowed);
           
          
    const response = await axios.get("http://localhost:3001/users");
const users = response.data;

// Trae todos los usuarios que coinciden con los targetId de relaciones aceptadas
const seguidos = acceptedFollowed.map((relacion) =>
  users.find((user) => user.id === relacion.targetId)
) // Filtra por si alguno no se encuentra
setFollowed(seguidos)
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token]);

  return (
    <div>
      <header className="bg-white p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center w-30 h-30">
              <img
                src={user?.image}
                className=" object-cover rounded-full h-[100px]"
              />
            </div>
            <div className="text-gray-600 flex items-center ">
              <h2> At, quidem voluptas. Perferendis, quidem.</h2>
              <button className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
            <div className="text-gray-600 flex items-center">
              <svg
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
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
      <header className="bg-white p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-2 gap-2 justify-items-center">
            <div className="text-gray-600 flex items-center cursor-pointer" onClick={() => navigate("/follow", { state: { tab: "followed" } })} >
              <h2 className="whitespace-nowrap">
                <span
                  className="font-bold"

                >
                  {followed.length
 }
                </span>
                &nbsp;seguidos
              </h2>
            </div>

            <div className="text-gray-600 flex items-center cursor-pointer" onClick={() => navigate("/follow", { state: { tab: "followers" } })}>
              <h2 className="whitespace-nowrap">
                <span
                  className="font-bold"

                >
                   {requests.length}
                </span>
                &nbsp;seguidores
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
              {/* <h2 className="whitespace-nowrap">
                <span className="font-bold">256</span>&nbsp;publicaciones
              </h2> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default HeaderProfile;
