import React, { createContext, useContext, useEffect, useState } from "react";

const appContext = createContext();
export const useAppContext = ()=> useContext(appContext);

export const AppContextProvider = ({children})=>{
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [isdark, setIsdark] = useState(false);
    const [model, setModel] = useState("Choose Model");
    const [message, setMessage] = useState("");
    const [newChat, setNewChat] = useState(false);
   
   


    useEffect(()=>{
        const savedTheme = localStorage.getItem('theme');
        const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if(savedTheme === 'dark' || (!savedTheme && preferDark)){
            setIsdark(true);
            document.documentElement.classList.add('dark');
        }
    },[]);

    const toggleTheme = ()=>{
        const newTheme = !isdark;
        setIsdark(newTheme);
        if(newTheme){
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme','dark');
        }
        else{
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme','light');
        }
    }


    return (
        <appContext.Provider value={{
            isOpenSidebar, 
            setIsOpenSidebar,
            isdark, 
            setIsdark,
            model,
            setModel,
            toggleTheme,
            message,
            setMessage,
            newChat,
            setNewChat
        }} >
            {children}
        </appContext.Provider>
    );
};