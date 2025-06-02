import React, { useState } from 'react'
import "./ProfileUpdate.css"
import profileicon from "../../assets/profile.svg.png";

const ProfileUpdate = () => {
    const [image, setImage] = useState(false)
    return (
        <div className='profile'>
            <div className="profile-container">
                <form action="">
                    <h3>Detalles del perfil</h3>
                    <label htmlFor="avatar">
                        <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg,' hidden />
                        <img src={image ? URL.createObjectURL(image) : profileicon} alt="" />
                        subir imagen de perfil
                    </label>
                    <input type="text" placeholder='nombre' required />
                    <textarea placeholder='estado/profesion/bio' required></textarea>
                    <button type='submit'>Guardar</button>
                </form>
               {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="profile-pic size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg> */}

                <img className='profile-pic'  src={image ? URL.createObjectURL(image) : profileicon} alt="" />
            </div>
        </div>
    )
}

export default ProfileUpdate
