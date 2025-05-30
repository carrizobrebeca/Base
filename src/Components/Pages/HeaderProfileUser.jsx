import { useNavigate } from "react-router-dom";

const HeaderProfileUser = () => {
  const navigate = useNavigate();
  return (
     <div>
      <header className="bg-white p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center w-30 h-30">
                  <img
              src=
              "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
              className=" object-cover rounded-full "
            />
            </div>
            <div className="text-gray-600 flex items-center ">
              
              
              <button className="cursor-pointer bg-red-300 p-2 rounded-xl"> Seguir
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