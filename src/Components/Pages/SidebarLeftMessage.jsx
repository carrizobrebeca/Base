import React, { useState } from 'react';

const SidebarLeftMessage = () => {

    return (
<div className={`pl-[5.94rem] fixed bg-bg flex flex-col items-center w-[30rem] h-full border br-2 border-border py-[1.4rem] px-[1rem] transition-[width] duration-500 ease-in-out relative`} >
            <div className="w-full flex items-center">
                <span className="text-[2.1rem] text-red-400 font-bold cursor-pointer overflow-hidden">
                    Mensajes
                </span>
            </div>

            <div className="flex-col items-center h-[5rem] w-full"></div>

            <ul className="w-full flex-col gap-[0.8rem]">
                <li>
                    <a href="#" className="flex py-[0.55rem] px-0 rounded-xl">

                        <input className='w-full text-xl pl-6 rounded-full bg-header mr-2 ' type="text" placeholder='Buscar' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </a>
                </li>
            </ul>
            <div className="flex-col pt-7 pb-7 font-bold text-text items-center h-[2rem] w-full">Recientes</div>
            <div className="w-full flex-1 overflow-y-auto pr-2 hide-scrollbar">
                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

                <div className="w-full flex items-center pt-7 pb-7">
                    <img
                        src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col justify-center px-4 max-w-[12rem] overflow-hidden">
                        <span className="text-[1.35rem] text-text font-bold truncate">NombreMuyLargoDeEjemplo</span>
                        <span className="text-[1rem] text-gray-600 truncate">usuario_muy_largo_123</span>
                    </div>
                </div>

            </div>



        </div>

        
    );
};

export default SidebarLeftMessage;
