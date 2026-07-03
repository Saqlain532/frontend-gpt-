import React from 'react'
import { useAppContext } from '../context/AppContext'
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import DrawIcon from '@mui/icons-material/Draw';
import Newchat from '../assets/newchat.jsx';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import Tooltip from '@mui/material/Tooltip';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'; 
import { useUserDataContext } from '../context/UserDataContext.jsx';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar = () => {
    const {isOpenSidebar, setIsOpenSidebar , toggleTheme, isdark, setIsdark, isLogin , newChat, setNewChat } = useAppContext();
    const { threads, isLoading, error ,setActiveThreadId , loadPreviousThread , startNewChat , deleteThread} = useUserDataContext(); 
  
  return (
    <>
    {
      isOpenSidebar && 
      (<div className='flex flex-col text-text-muted border-r border-border-subtle h-screen'>
        <div className='h-10 w-full flex mt-1 justify-between items-center border-b border-border-subtle p-2 shrink-0'>
          <img src="/icon.png" alt="logo" 
              className='md:h-7 md:w-8 w-7 h-6 cursor-pointer'
          />
          <ArrowBackIosNewSharpIcon className='text-text-muted cursor-pointer'
              onClick={()=>setIsOpenSidebar(false)}
          /> 
        </div>
        
        <div className='flex flex-col flex-1 mt-4 overflow-hidden'>
          <div className='px-2'>
            <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-cell'
                onClick={() => { startNewChat(); setNewChat(true); }}
             >
                <p className='text-text-main font-md'>New Chat</p>
                <Newchat  />
            </div>
            <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-pointer' >
                <p className='text-text-main font-md'>Library</p>
                <BookOutlinedIcon/>
            </div>
            <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-pointer' >
                <p className='text-text-main font-md'>Projects</p>
                <AccountTreeOutlinedIcon/>
            </div>
            <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-pointer' >
                <p className='text-text-main font-md'>More</p>
                <MoreHorizOutlinedIcon/>
            </div>
            
            <h2 className='mt-2 p-1 font-semibold'>Recents</h2>
          </div>

          
          <div className='flex-1 overflow-y-auto p-2 border-t border-border-subtle'>
           <ul className='font-md text-sm flex gap-2 flex-col'>
             {isLoading && <li className='p-1 italic'>Loading...</li>}
             
             { isLoading && error && <li className='p-1 text-red-500 text-xs'>{error}</li>}
             
             {!isLoading && !error && threads?.length === 0 && (
                <li className='p-1'>No recents</li>
             )}

             { !isLoading && !error && threads?.map((thread) => (
                <li 
                  key={thread.id} 
                  className='hover:bg-surface group flex justify-center items-center rounded-lg hover:border p-1 border-border-subtle cursor-pointer truncate'
                  title={thread.title}
                  onClick={()=>{loadPreviousThread(thread.id); setNewChat(false)}} 
                >
                  <span className='truncate flex-1 pr-2'> {thread.title}</span>
                  <button 
                    className='opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-500 transition-all duration-200 shrink-0'
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteThread(thread.id); 
                    }}
                  >
                      <DeleteIcon fontSize="small"/>
                  </button>
                </li>
             ))}
           </ul>
          </div>
          
          
          <div className='mt-auto border-t border-border-subtle z-10 w-full bg-main text-sm text-text-muted flex shrink-0'>
           
           <div className='p-3 flex-1 flex flex-col justify-center min-w-0'> 
               <p className='md:text-md text-xs truncate w-full'> 
                 &copy; Saqlain<span className='hidden md:inline'>&nbsp;Mustaque Ansari</span> 
               </p> 
               <div className='flex gap-3 mt-2 items-center'>
                 <a href="https://github.com/Saqlain532" className='hover:text-primary'><GitHubIcon fontSize='small'/></a>
                 <a href="https://www.linkedin.com/in/saqlain-mustaque-790029330/" className='hover:text-primary'><LinkedInIcon fontSize='small'/></a>
               </div>
            </div>

            <div className='border-l border-border-subtle flex justify-center items-center px-4'>
               <Tooltip
                 placement='right'
                 title={isdark ? "Dark Mode" : "Light Mode"}
               >
                 <button onClick={()=>toggleTheme()} className='cursor-pointer flex items-center justify-center outline-none'>
                    {isdark ? <DarkModeTwoToneIcon /> : <LightModeTwoToneIcon/>}
                 </button>
               </Tooltip>
            </div>

        </div>
        </div>
    </div>)
    }
    {!isOpenSidebar && (
        <div className='flex flex-col border-b-2 shadow-md w-10 h-screen cursor-e-resize items-center border-r border-border-subtle'>
          <div 
            className='h-10 w-8 flex justify-center items-center group relative'
            onClick={() => setIsOpenSidebar(true)}
          >
          
            <img 
              src="/icon.png" 
              alt="logo" 
              className='h-6 w-6 transition-opacity duration-200 group-hover:opacity-0 cursor-pointer'
            />
            
           
            <ArrowForwardIosSharpIcon 
              className='absolute text-text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 cursor-pointer'
            />
            
          </div>
          <div className='flex flex-col mt-4 text-text-muted'>
              <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-cell' 
                onClick={() => { startNewChat(); setNewChat(true); }}
              >
              
              <Newchat  />
              </div>
              <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-pointer' >
                  
                  <BookOutlinedIcon/>
              </div>
              <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-pointer' >
                
                  <AccountTreeOutlinedIcon/>
              </div>
              <div className='flex justify-between items-center hover:bg-surface rounded-lg hover:border p-1 border-border-subtle cursor-pointer' >
                
                  <MoreHorizOutlinedIcon/>
              </div>
          </div>
          
          <div className='h-15 border-t border-border-subtle z-10 mt-auto w-full bg-main text-sm text-text-muted p-2 gap-2 flex flex-col items-center'>
            <div className=' flex justify-center items-center md:w-[20%] w-[30%]'>
              <Tooltip
                placement='right'
                title={isdark ? "Dark Mode" : "Light Mode"}
              >
                <button onClick={()=>toggleTheme()} className='cursor-pointer outline-none'>
                  {isdark ? <DarkModeTwoToneIcon  />: <LightModeTwoToneIcon/>}
                </button>
              </Tooltip>
          </div>   
        </div>
      </div>
      )}
   </>
  )
}

export default Sidebar