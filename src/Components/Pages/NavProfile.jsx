export default function NavProfile() {
  return (
    <header className="bg-gray-100">
      <div className="max-w-4xl mx-auto text-center text-sm lg:text-xl font-semibold">
        <header className="lg:hidden flex flex-row items-center justify-between">
          <div className="flex justify-center text-text pl-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </div>
          <form className="w-full pl-10 pr-10 bg-gray-100">
            <div className="flex justify-between ">
                <img
              src=
              "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
              className="w-10 h-10 object-cover rounded-full "
            />
              <h2 className="text-xl lg:text-3xl text-text flex items-center font-bold font-momo">
                Nombre
              </h2>
              <div>
                
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-text size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
            </div>
          </form>

        </header>
        <div className=" hidden sm:block">
          <header className="flex flex-row md:flex-row items-center justify-between gap-4 pt-6 pb-6">
          <div className="flex justify-center pl-4 min-w-[10rem]">
            <img
              src=
              "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
              className="lg:w-40 lg:h-40 object-cover rounded-full "
            />
          </div>
          <form className=" pl-10 pr-10 bg-gray-100">
            <div className="flex justify-between p-4">
              <h2 className="text-xl md:text-3xl text-gray-600 font-bold font-momo">
                Nombre
              </h2>
              <h2 className="text-xl md:text-3xl text-gray-400 font-bold font-momo">
                usuario
              </h2>
      


            </div>
            <div className="border-2 border-gray-300"></div>
            <div className="flex justify-between p-4 gap-4">
              <h2><span className="font-bold">259 </span>publicaciones</h2>
              <h2><span className="font-bold">259 </span>seguidores</h2>
              <h2><span className="font-bold">259 </span>seguidos</h2>
              <h2><span className="font-bold">259 </span>eventos</h2>
            </div>

          </form>

        </header>
        </div>
        
      </div>

      <div className="max-w-4xl mx-auto text-center text-xl pt-4 font-semibold  ">
        <div className="flex justify-between border-b-2 border-gray-300">

          <div class="relative size-16 text-gray-600 flex items-center ">
            <h2 className="border-b-4 border-gray-300 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>

            </h2>
            <div class="absolute -top-1 -right-1 size-14 text-white">
              <h3 className="rounded-full"></h3>
            </div>
          </div>

          <div class="relative size-16 text-gray-600 flex items-center ">
            <h2 className="border-t-4 border-gray-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </h2>
            <div class="absolute -top-1 -right-1 size-14 text-white">
              <h3 className=" rounded-full"></h3>
            </div>
          </div>
          <div class="relative size-16 text-gray-600 flex items-center ">
            <h2 className="border-b-4 border-gray-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </h2>
            <div class="absolute -top-1 -right-1 size-10 text-white">
              <h3 className="bg-red-400 rounded-full">9+</h3>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}