
import React from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='fixed top-0 left-0 flex justify-center items-center bg-gray-800 h-screen w-full'>
      <div className='text-gray-100 text-6xl text-bold'></div>
      <button onClick={() => navigate("/home")} className='text-gray-100 text-6xl text-bold'>Login</button>
    </div>
  )
}

export default Login