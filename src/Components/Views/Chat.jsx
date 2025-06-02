import React from 'react'
import "./Chat.css"
import LeftSidebar from '../Pages/LeftSidebar'
import ChatBox from '../Pages/ChatBox'
import RightSidebar from '../Pages/RightSidebar'
const Chat = () => {
  return (
    <div className='chat'>
      <div className='chat-container'>
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Chat