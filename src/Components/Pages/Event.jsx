import React from "react";
import post from "../../assets/post.PNG";
import { useNavigate } from "react-router-dom";
const Event = ({ allEvent }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] flex justify-center p-30 bg-gray-200 rounded-xl">
      <header className="">
        <div className="text-sm font-semibold ">
          <div className=" flex justify-between p-2">
            <div
              onClick={() => navigate("/profileuser")}
              className="text-gray-600 flex items-center"
            >
              <img
                src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <div
              onClick={() => navigate("/profileuser")}
              className="text-gray-600 flex items-center"
            >
              <h2>Usuario</h2>
            </div>
            <div
              onClick={() => navigate("/profileevent")}
              className="text-gray-600 flex items-center"
            >
              <h2>Evento</h2>
            </div>
          </div>
          <div className="text-text flex justify-start p-2">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </h2>
            <h2>12 de abril 1523, colòn, Entre Rìos, Argentina</h2>
          </div>
          <div className="flex justify-center items-center pb-2">
            <img
              onClick={() => navigate("/max")}
              src="https://i.pinimg.com/736x/c7/b6/44/c7b644393289a113a6cc674a95e8a2e4.jpg"
              className=" object-cover"
            />
          </div>

          <div className=" flex justify-between p-2">
            <div className="text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
            <div
              onClick={() => navigate("/profileuser")}
              className="text-gray-600 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
            </div>
            <div className="text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </div>
            <div className="text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Event;
