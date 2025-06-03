import axios from "axios";
import { useNavigate } from "react-router-dom";

const HeaderProfileUser = ({ user }) => {

 const sendFollowRequest = async (targetUserId) => {
  try {
    const token = localStorage.getItem('token'); // Token guardado tras login

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
    alert(error.response?.data?.message || 'Error enviando solicitud');
  }
};
  const navigate = useNavigate();
  return (
    <div>
      <header className="bg-white p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center w-30 h-30">
              <img
                src={user.image}
                className=" object-cover rounded-full h-[100px]"
               
              />
            </div>
            <div className="text-gray-600 flex items-center ">


              <button onClick={() => sendFollowRequest(user.id)} className="cursor-pointer bg-red-300 p-2 rounded-xl"> Seguir
              </button>
            </div>
            <div className="text-gray-600 flex items-center ">
              <button className="cursor-pointer bg-gray-300 p-2 rounded-xl"> Mensaje
              </button>

            </div>
          </div>
        </div>
      </header>
      <header className=" bg-white p-4">
        <div className="text-sm font-semibold ">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center ">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">256</span>&nbsp;seguidos
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">256</span>&nbsp;seguidores
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
export default HeaderProfileUser