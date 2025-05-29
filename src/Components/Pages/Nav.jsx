export default function Nav() {
  return (
    <header className="bg-gray-100 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto text-center text-xl font-semibold">
        <div class="relative size-16 text-white">
          <h2>
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
          <div class="absolute -top-4 -right-2 size-14 text-white">
            <h3 className="bg-orange rounded-full">9+</h3>
          </div>
        </div>
      </div>
    </header>
  );
}
