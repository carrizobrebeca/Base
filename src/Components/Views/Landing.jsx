import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className='fixed top-0 left-0 flex justify-center items-center bg-gray-800 h-screen w-full'>
        <div className=' text-6xl text-gray-300 text-bold animate-pulse'>Evently</div>

    </div>
  )
}

export default Landing