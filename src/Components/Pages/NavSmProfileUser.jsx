import { useNavigate } from "react-router-dom";

const NavSmProfileUser = () => {
  const navigate = useNavigate();
  return (
    <div>

      <header className="bg-gray-100 p-4 flex justify-between">
        <div className="text-xl font-semibold">
          <div className="grid grid-cols-2 ">
            <div className="text-gray-600 flex items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </div>
            <div className="text-gray-600 flex items-center">
              <h2>Usuario</h2>
            </div>
          </div>
        </div>
      </header>
    </div>


  );
}
export default NavSmProfileUser