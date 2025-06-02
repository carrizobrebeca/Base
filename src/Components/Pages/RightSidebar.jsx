import React from 'react'
import "./RightSidebar.css"
import sendimg from "../../assets/sendmsg.PNG";
const RightSidebar = () => {
  return (
    <div className='rs hide-scrollbar'>
      <div className='rs-profile'>
        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
        <h3>Nombre<h2 >●</h2></h3>
        <p>Estado Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </div>
      <hr />
      <div className='rs-media '>
        <p>Media</p>
        <div className='hide-scrollbar'>
          <img src={sendimg} alt="" />
          <img src={sendimg} alt="" />
          <img src={sendimg} alt="" />
          <img src={sendimg} alt="" />
          <img src={sendimg} alt="" />
          <img src={sendimg} alt="" />
        </div>
      </div>
      <button>
        Salir
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
      </svg> */}
      </button>
    </div>
  )
}

export default RightSidebar
