import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import { useAppContext } from '../context/AppContext';
import Tooltip from '@mui/material/Tooltip';
import SignUp from '../pages/SignUp';
import {useNavigate } from 'react-router-dom';
import { useUser } from '../context/AuthContext';



const Navbar = () => {
  const {isOpenSidebar, model, setModel,  } = useAppContext();
  const {isLogin, setIsLogin, userData, handleLogout} = useUser();
  const [isProfile, setIsprofile] = useState(false);
  const [isdropDown, setIsDropDown] = useState(false);
  const navigate = useNavigate();
  


 const logoName = userData?.firstName?.[0] + userData?.lastName?.[0];
 

  return (
    <>
    <div className='border border-border-subtle h-11 flex justify-between items-center text-text-main  relative'>
    
      <div className='ml-2'>
           <div className='flex gap-1 cursor-grab'
           onClick={()=>setIsDropDown(!isdropDown)}
            >
           <Tooltip  title = "Default-groq" placement='top-start'
           >
             <p className='text-muted font-bold md:text-md text-sm'>{model}</p>
           </Tooltip>
            { isdropDown ? <ExpandLessOutlinedIcon/>:  <ExpandMoreIcon className='w-4'/>}
           </div>
            { isdropDown && <div className={`absolute  ${isOpenSidebar?"top-11 left-0 ":" top-11 left-0"} p-2  border border-border-subtle  min-h-20 w-40 rounded-lg gap-2 flex flex-col bg-background`}>
               <Tooltip title={
                  <>
                    Primary model:gemini-3.5-flash <br />
                    Fallback model:gemini-3.5 flash-lite
                  </>
                }
                placement="right"
                >
                  <button className='text-text-muted bg-background border border-border-subtle w-full rounded-md hover:bg-surface cursor-pointer'
                          onClick={()=>{setModel("gemini"); setIsDropDown(false)}}
                   >
                    gemini
                  </button>
              </Tooltip>  
            
             <Tooltip title={
                  <>
                    Primary model:llama-3.3-70b-versatile <br />
                    Fallback model:llama-3.1-8b-instant
                  </>
                }
                placement="right"
                >
                  <button className='text-text-muted bg-background border border-border-subtle w-full rounded-md hover:bg-surface cursor-pointer' 
                          onClick={()=>{setModel("groq"); setIsDropDown(false)}}
                  >
                    groq
                  </button>
              </Tooltip>  
          </div>}

      </div>
      <div className=' flex justify-center items-center gap-2'>
        <img src="/gromni.png" alt="gromnipic" className='md:h-9 md:w-33 h-0 w-0 bg-[#ffff3]' />


        {!isLogin && <div className='' >
          <button className='cursor-pointer border-3 bg-red-700 hover:bg-red-400 px-4 py-1 rounded-xl text-text-main border-border-subtle '
          onClick={()=>navigate('/signup')}
          >
            Login
          </button>
        </div>}
        {isLogin && <div>
           <div className='h-7 w-7 rounded-full border-border-subtle bg-primary text-center p-2 flex justify-center  hover:bg-secondary cursor-pointer items-center text-white mr-1'
            onClick={()=>setIsprofile(!isProfile)}
           >
            {logoName}
          </div>
         
        </div>}
        
        { isProfile && <div className='absolute top-11 p-2 bg-background right-1 border border-border-subtle min-h-20 w-30 rounded-lg'>
            <button className='text-text-muted bg-background border border-border-subtle w-full rounded-md hover:bg-surface'
            onClick={handleLogout}
            >
              Logout
            </button>
          </div>}
      </div>
    </div>
    
  </>  
  )
}

export default Navbar
