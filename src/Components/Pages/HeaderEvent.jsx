import { useNavigate } from "react-router-dom";
import post from "../../assets/post.PNG";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../store/postSlice";
const HeaderEvent = ({ event }) => {
  const idCreator = event.creatorId;
  const eventId = event.id;
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const [creatorName, setCreatorName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [followed, setFollowed] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
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
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/users`);
        const users = response.data;

        const creator = users.find((u) => u.id === idCreator);
        setCreatorName(creator);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log("usuarios cargados", selectedValues)
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

  const allPost = useSelector((state) => state.post.allpost);
  const status = useSelector((state) => state.post.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPost());
    }
  }, [dispatch, status]);


  const myPost = allPost.filter((post) => post.eventId === eventId);
  const handleOpenChat = async (eventId) => {

    navigate(`/invitados/${eventId}`);
  };
  const handleOpen = async (eventId) => {

    navigate(`/event/${eventId}`);
  };
  return (
    <div>
      <header className="bg-gray-100 ">
        <div className="text-sm font-semibold">
          <div className="flex justify-center items-center">
            <img
              src={event.image}
              className=" object-cover w-full h-[300px]"
            />
          </div>
          <div className="text-text flex justify-start lg:justify-center items-center">
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </h2>
            <h2>{event.location}</h2>
            
          </div>
<div className="text-text flex justify-between items-center p-2">
           
             <h2>{event.eventDate}</h2> <h2>{event.eventTime}</h2>
          </div>
          <div className="text-text flex justify-start lg:justify-center items-center">
     
          </div>
        </div>
      </header>
      <header className="bg-gray-100 p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">{creatorName.name}</span>&nbsp;
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">{event.name}</span>&nbsp;
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">{event.type}</span>&nbsp;
              </h2>
            </div>
          </div>
        </div>
      </header>
      <header className="bg-gray-100 p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">

            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span key={eventId} onClick={() => handleOpenChat(eventId)} className="font-bold">{attendees.length} </span>&nbsp;invitados
              </h2>
            </div>
             <div key={eventId} onClick={() => handleOpen(eventId)} className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </div>
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">{myPost.length} </span>&nbsp;publicaciones
              </h2>
            </div>
           
          </div>
        </div>
      </header>
    </div>

  );
}
export default HeaderEvent