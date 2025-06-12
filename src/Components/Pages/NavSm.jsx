import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavSm = () => {
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
  
  
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:3001/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Respuesta API requests:", res.data);
        console.log("Usuario actual:", user);
  
        const onlyRequestsToMe = res.data.filter(
          (r) => r.targetId === user.id
        );
  const pending = onlyRequestsToMe.filter(
          (r) => r.status === 'pending'
        );
  
        console.log("Solicitudes pendientes para mí:", pending);
  
        setRequests(pending);
          const follow = res.data.filter(
        (r) => r.requesterId === user.id
      );
      //cuando aceptaron pero ver como desapareceer una vez de hacer clic
      // const acceptedFollowed = follow.filter(
      //   (r) => r.status === 'accepted'
      // );
      
      //   setRequests(acceptedFollowed);
  
      } catch (err) {
        // console.error(err);
        setError(err.message);
         console.log(error);
          
      }
    };
  
    useEffect(() => {
      fetchRequests();
    }, [token]);
  
  
const navigate = useNavigate()
  return (
    <div>
      <header className="bg-gray-100 ">
        <div className="max-w-4xl mx-auto text-center text-xl font-semibold">
          <div className="flex justify-between">

            <div class="relative text-gray-600 flex items-center ">
              <h2 className="text-4xl">
                Evently
              </h2>
              <div class="absolute -top-1 -right-1 size-14 text-white">
                <h3 className="rounded-full"></h3>
              </div>
            </div>

            <div class="relative size-16 text-gray-600 flex items-center ">
              <h2 className=" ">
                <svg onClick={()=> navigate("/notification")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>

              </h2>
              {requests.length > 0 && (
              <div class="absolute -bottom-2 -left-2 size-10 text-white">
                <h3 className=" text-red-400 text-2xl">●</h3>
              </div>
                  )}
                  
            </div>
            <div class="relative size-16 text-gray-600 flex items-center ">
              <h2 className=" ">
                <svg onClick={()=> navigate("/messagesm")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                </svg>

              </h2>
              <div class="absolute -top-1 -right-1 size-10 text-white">
                <h3 className="bg-red-400 rounded-full">9+</h3>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
export default NavSm