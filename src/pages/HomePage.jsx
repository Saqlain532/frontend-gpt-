import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import { useAppContext } from '../context/AppContext'

const HomePage = () => {
  const {isOpenSidebar} = useAppContext();
  return (
    <div className='h-screen w-screen flex overflow-hidden bg-background '>
      <div className={`h-full   transition-all duration-300 ${isOpenSidebar?"md:w-[15%] w-[35%]":""} `}>
        <Sidebar/>
      </div>
      <div className={`h-screen  flex-1  ${isOpenSidebar?"md:w-[85%] w-[65%]":""} `}>
        <ChatWindow/>
      </div>
    </div>
  )
}

export default HomePage
