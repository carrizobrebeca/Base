import { useNavigate } from "react-router-dom";
import post from "../../assets/post.PNG";
import { useEffect, useState } from "react";
import axios from "axios";
const HeaderEvent = ({event}) => {
  const idCreator = event.creatorId;
  const navigate = useNavigate();

    const [creatorName, setCreatorName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
                <span className="font-bold">256</span>&nbsp;participantes
              </h2>
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">256</span>&nbsp;publicaciones
              </h2>
            </div>
          </div>
        </div>
      </header>
    </div>

  );
}
export default HeaderEvent