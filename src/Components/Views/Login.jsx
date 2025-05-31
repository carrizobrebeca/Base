import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-gray-800 h-screen w-full ">
      <div className="flex items-center">
       <div className="w-[20rem] h-[30rem] flex flex-col items-center bg-red-300 rounded-xl">
  <form
    className="w-full h-full mb-4 flex items-center shadow-md bg-white font-momo rounded-xl"
    action=""
  >
    <div className="p-14">
      <div>
        <h2 className="pt-4 pb-4 font-bold text-red-300">Bienvenido</h2>
      </div>
      <div className="pb-4">
        <input
          className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
          type="text" placeholder="Usuario"
        />
      </div>

      <div>
        <input
          className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
          type="text" placeholder="Contraseña"
        />
      </div>
      <div className="pt-4 pb-4 flex justify-center">
        <button  className="bg-red-300 rounded-xl text-white p-2">
          Iniciar sesión
        </button>
      </div>
    </div>
  </form>

  {/* Botón Registrarse centrado con margen arriba */}
  <div className="mt-2 pb-4">
    <button onClick={()=> navigate("/register")}  className="bg-red-300 rounded-xl text-white p-2 border-2 border-white">
      Registrarse
    </button>
  </div>
</div>

        
      </div>
    </div>
  );
};

export default Login;
