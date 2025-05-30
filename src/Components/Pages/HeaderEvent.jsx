import { useNavigate } from "react-router-dom";
import post from "../../assets/post.PNG";
const HeaderEvent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="bg-gray-100 ">
        <div className="text-sm font-semibold">
          <div className="flex justify-center items-center">
            <img
              src={post}
              className=" object-cover"
            />
          </div>
          <div className="text-text flex justify-start lg:justify-center items-center">
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          </h2>
          <h2>12 de abril 1523, colòn, Entre Rìos, Argentina</h2>
          </div>

        </div>
      </header>
      <header className="bg-gray-100 p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center">
              <h2 className="whitespace-nowrap">
                <span className="font-bold">Creador</span>&nbsp;
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
               <h2 className="whitespace-nowrap">
                <span className="font-bold">La Festi</span>&nbsp;
              </h2>
            </div>
            <div className="text-gray-600 flex items-center">
               <h2 className="whitespace-nowrap">
                <span className="font-bold">Cumpleaños</span>&nbsp;
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