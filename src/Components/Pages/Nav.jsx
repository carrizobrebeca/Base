export default function Nav() {
  return (
    <header className="bg-gray-100 py-4">
      <div className="max-w-4xl mx-auto text-center text-xl font-semibold border-b-4 border-gray-300">
        <div className="flex justify-between  p-6">

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