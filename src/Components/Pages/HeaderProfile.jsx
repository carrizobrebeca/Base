import { useNavigate } from "react-router-dom";

const HeaderProfile = () => {
  const navigate = useNavigate();
  return (
     <div>
      <header className="bg-gray-100 p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center w-30 h-30">
                  <img
              src=
              "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
              className=" object-cover rounded-full "
            />
            </div>
            <div className="text-gray-600 flex items-center">
              
              <h2> At, quidem voluptas. Perferendis, quidem.</h2>
            </div>
            <div className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>

            </div>
          </div>
        </div>
      </header>
      <header className="bg-gray-100 p-4">
        <div className="text-sm font-semibold">
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            <div className="text-gray-600 flex items-center">
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
export default HeaderProfile