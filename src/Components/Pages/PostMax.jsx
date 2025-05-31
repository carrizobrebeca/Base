import React from 'react'
import post from "../../assets/post.PNG";
import { useNavigate } from 'react-router-dom';
const PostMax = () => {
      const navigate = useNavigate();
    return (
        <div className="bg-gray-900 h-screen relative">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start p-4">
                <h2 className="text-4xl text-gray-100 font-bold font-mono">Evently</h2>
                <button onClick={() => navigate("/home")} className='text-4xl text-gray-100 font-bold font-mono'>X</button>
            </div>
            <div className="flex flex-col items-center justify-center h-full">

                <div className="flex items-start justify-between gap-4 w-full max-w-md px-4 py-2">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-16 h-16 object-cover rounded-full"
                        alt="avatar"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-gray-600 font-bold font-mono">Nombre</h2>
                        <h3 className="text-gray-400 font-mono text-sm">Lugar</h3>
                    </div>
                    <div className="ml-auto">
                        <h3 className="text-gray-400 text-sm">Fecha</h3>
                        <h3 className="text-gray-400 text-sm">Evento</h3>
                    </div>
                </div>
                <div className="w-full max-w-md px-4">
                    <img className="w-full object-cover rounded-lg" src={post} alt="post" />
                </div>
                <div className="flex items-center gap-6 text-gray-700 py-4 px-4">
                    <button className="text-xl text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                    <button className="text-xl text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-start gap-4 w-full max-w-md px-4 py-2">
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 font-mono text-sm">Les gusta a </h3>
                        <h3 className="text-gray-600 font-mono text-sm text-bold">personas </h3>
                        <h3 className="text-gray-700 font-mono text-base text-bold">Descripcion</h3>
                        <button className="text-gray-400 font-mono text-sm"> Ver comentarios...</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostMax
