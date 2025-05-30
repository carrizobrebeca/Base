import { useNavigate } from "react-router-dom";

const NavSmProfile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="bg-gray-100 ">
        <div className="max-w-4xl mx-auto text-center text-xl font-semibold">
          <div className="flex justify-between">

            <div class="relative text-gray-600 flex items-center ">
              <h2 className="text-xl">
                Usuario
              </h2>
              <div class="absolute -top-1 -right-1 size-14 text-white">
                <h3 className="rounded-full"></h3>
              </div>
            </div>

            <div onClick={() => navigate("/post")} class="relative size-16 text-gray-600 flex items-center ">
              <h2 className=" ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

              </h2>
              <div class="absolute -bottom-5 -left-5 size-10 text-white">
                <h3 className="bg-red-400 rounded-full"></h3>
              </div>
            </div>
            <div class="relative size-16 text-gray-600 flex items-center ">
              <h2 className=" ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>



              </h2>
              <div class="absolute -top-1 -right-1 size-10 text-white">
                <h3 className="bg-red-400 rounded-full"></h3>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
export default NavSmProfile