import React from 'react'
import "./ChatBox.css"
import galery from "../../assets/galery_icon.png";
import send from "../../assets/send_icon.png";
import sendimg from "../../assets/sendmsg.PNG";
const ChatBox = () => {
    return (
        <div className='chat-box'>
            <div className='chat-user'>
                <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                <p>Nombre <h3 >●</h3></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
            </div>

            <div className="chat-msg hide-scrollbar">
                 <div className="s-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>
                  <div className="r-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>
                  <div className="r-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>
                  <div className="r-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>  <div className="r-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>
                 <div className="s-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>
                <div className="s-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>

                <div className="s-msg">
                    <img className='msg-img' src={sendimg} alt="" />
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>

                <div className="r-msg">
                    <p className="msg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
                    <div>
                        <img src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" alt="profileimage" />
                        <p>2:30 PM</p>
                    </div>
                </div>
                
            </div>


            <div className="chat-input">
                <input type="text" placeholder='Enviar un mensaje' />
                <input type="file" id="image" accept='image/png, image/jpeg' hidden />
                <label htmlFor="image">
                    <img src={galery} alt="" />
                </label>
                <img src={send} alt="" />
            </div>
        </div>
    )
}

export default ChatBox
//    <div className="chat-input">
//                 <input type="text" placeholder='Enviar un mensaje' />
//                 <input type="file" id="image" accept='image/png, image/jpeg' hidden />
//                 <label htmlFor="image">
//                     <img src={galery} alt="" />
//                     </label>
//                 <img src={send} alt="" />
//             </div>