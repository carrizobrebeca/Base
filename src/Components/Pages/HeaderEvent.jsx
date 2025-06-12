import { useNavigate } from "react-router-dom";
import post from "../../assets/post.PNG";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
          <div className="grid grid-cols-2 gap-6 justify-items-center">

            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <h2 className="whitespace-nowrap">
                 <div>
 <h2>Invitados al evento: {event.title}</h2>
      {attendees.length === 0 ? (
        <p>No hay usuarios invitados aún.</p>
      ) : (
        <ul>
          {attendees.map((user) => (
            <li key={user.id}>{user.name} ({user.userName})</li>
          ))}
        </ul>
      )}
</div>
                </h2>
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">256</span>&nbsp;publicaciones
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
              {/* <h2 className="whitespace-nowrap"> */}
                <label>
                  Agregà participantes al evento:
                  <select multiple value={selectedValues} onChange={(e) =>
                    setSelectedValues(Array.from(e.target.selectedOptions, opt => opt.value))
                  }>
                    {followed.length === 0 ? (
                      <option disabled>No seguís a nadie aún</option>
                    ) : (
                      followed.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <button onClick={handleInvite} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                  Invitar
                </button>
              {/* </h2> */}
            </div>
          </div>
        </div>
      </header>
    </div>

  );
}
export default HeaderEvent