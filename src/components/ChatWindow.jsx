import React from 'react'
import Navbar from './Navbar'
import Chat from './Chat'
import InputWindow from './InputWindow'

const ChatWindow = () => {
  return (
   
    <div className="flex flex-col h-full overflow-hidden"> 
      <Navbar/>
      
      <div className="flex-1 overflow-y-auto pb-20">
        <Chat/>
      </div>
      
    
      <div className="   w-full   shrink-0 pb-4  ">
        <InputWindow/>
      </div>
    </div>
  )
}

export default ChatWindow
