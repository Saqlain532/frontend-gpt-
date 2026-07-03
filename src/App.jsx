import React from 'react'
import HomePage from './pages/HomePage'
import {  Routes, Route } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext'
import SignUp from './pages/SignUp'
import { UserProvider } from './context/AuthContext'
import { UserDataContextProvider } from './context/UserDataContext'

const App = () => {
  return (
    <div>
      <AppContextProvider>
        <UserProvider>
           <UserDataContextProvider>
                 <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/signup' element={<SignUp/>}/>
                </Routes>
           </UserDataContextProvider>
           
        </UserProvider> 
      </AppContextProvider>
       
    </div>
  )
}

export default App
