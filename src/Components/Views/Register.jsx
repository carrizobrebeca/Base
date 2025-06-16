
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/registerSlice";
import profileicon from "../../assets/galery_icon.png";
// const [image, setImage] = useState(false)
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const { status, error } = useSelector((state) => state.register);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const [state, setState] = useState({
    name: "",
    userName: "",
    city: "",
    password: "",
    image: "https://i.pinimg.com/736x/f1/c6/ed/f1c6edfc945a658048ca2ca2fec96fbe.jpg",

  });

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (status === "failed" && error) {
      alert(error);
    }
  }, [status, error]);


  const [errors, setErrors] = useState({
    name: "*",
    userName: "*",
    city: "*",
    password: "*",
    image: "*",
  });

  const validate = (state, name) => {
    if (name === "name") {
      if (state.nombre === "")
        setErrors({ ...errors, name: "Nombre no puede estar vacío" });
      else {
        setErrors({ ...errors, nombre: "" });
        return;
      }
    }

    if (name === "apellido") {
      if (state.apellido === "")
        setErrors({ ...errors, apellido: "Apellido no puede estar vacío" });

      else {
        setErrors({ ...errors, apellido: "" });
        return;
      }
    }

    if (name === "email") {
      if (state.email === "")
        setErrors({ ...errors, email: "Email Formato de nombre inválido" });

      else {
        setErrors({ ...errors, email: "" });
        return;
      }
    }

    if (name === "password") {
      if (state.password === "")
        setErrors({ ...errors, password: "Contraseña no puede estar vacia" });

      else {
        setErrors({ ...errors, password: "" });
        return;
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: name === "image" && value.trim() === ""
        ? "https://i.pinimg.com/736x/f1/c6/ed/f1c6edfc945a658048ca2ca2fec96fbe.jpg"
        : value,
    }));
    validate(
      {
        ...state,
        [e.target.name]: e.target.value,
      },
      e.target.name
    );
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  setFormSubmitted(true);

  dispatch(registerUser(state))
    .unwrap()
    .then(() => {
      navigate("/login");
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

  const disable = () => {
    if (formSubmitted) return true;
    return Object.values(errors).some((error) => error !== "");
  };
  const hasErrors = Object.values(errors).some((error) => error === "*");
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-gray-800 h-screen w-full ">
      <div className="flex items-center">
        <div className="w-[20rem]  flex flex-col items-center bg-red-400 rounded-xl">
          <form
            className="w-full mb-4 flex items-center shadow-md bg-white font-momo rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="p-14">
              <div>
                <h2 className="pt-4 pb-4 font-bold text-red-400">Bienvenido</h2>
              </div><div className="pb-4">
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Nombre y apellido"
                  required
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div className="pb-4">

                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Nombre de usuario"
                  required
                  name="userName"
                  id="userName"
                  onChange={handleChange}
                />
              </div>
              <div className="pb-4 relative"> {/* <- AGREGÁ ESTO */}
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  required
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 "
                >
                  <img
                    src={showPassword
                      ? "https://img.icons8.com/ios-filled/50/000000/visible.png"
                      : "https://img.icons8.com/ios-filled/50/000000/invisible.png"}
                    alt={showPassword ? "Show" : "Hide"}
                    className="w-5 h-5"
                  />
                </button>
              </div>
              <div className="pb-4">
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Ciudad, Provincia, Pais"
                  required

                  name="city"
                  id="city"
                  onChange={handleChange}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+,\s[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+,\s[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                  title="Debe seguir el formato: Ciudad, Provincia, País. Solo letras y espacios, separados por comas."
                />
              </div>
              <div className="bg-gray-100 rounded-xl">
                {/* <label className='text-text text-lg w-full pt-2 pl-2' htmlFor="avatar">Seleccione foto de perfil
                  <input onChange={(e) => setImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg,' hidden />
                  <img className='aspect-square rounded-full' src={image ? URL.createObjectURL(image) : profileicon} alt="" />

                </label> */} 
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Ingrese url de su foto"
                  required

                  name="image"
                  id="image"
                  onChange={handleChange}
                />
              </div>
              <img src={state.image ||"https://i.pinimg.com/736x/f1/c6/ed/f1c6edfc945a658048ca2ca2fec96fbe.jpg"} className='aspect-square rounded-full' alt="" />

              <div className="pt-4 pb-4 flex justify-center">
                <button type="submit" className="bg-red-400 rounded-xl text-white p-2">
                  Registrarse
                </button>
              </div>
            </div>
          </form>

          {/* Botón Registrarse centrado con margen arriba */}
          <div className="mt-2 pb-4">
            <button onClick={() => navigate("/login")} className="bg-red-400 rounded-xl text-white p-2 border-2 border-white">
              Iniciar Sesion
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Register