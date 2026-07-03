import { createContext, useContext, useEffect, useState } from "react";
import api from "../Api";
import { useAppContext } from "./AppContext";
import axios from "axios";



const UserDataContext = createContext();
export const useUserDataContext = () => useContext(UserDataContext);

export const UserDataContextProvider = ({children})=>{

    const {message, model, setModel , setMessage } = useAppContext();
     

   
    const [threads, setThreads] = useState([]);
    const [activeThreadId, setActiveThreadId] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

   const [reply, setReply] = useState("");


   const startNewChat = () => {
        setActiveThreadId("");
        setChatHistory([]); 
        setReply("");
    };

    useEffect(()=>{
        getThreadTitles();
    },[backendUrl])
   

    const getUnauthenticatedChatReply = async (activeModel) => {
        const endpoint = `${backendUrl}/api/users/callToModel`;
        const payload = {
            model: activeModel,
            message
        };
        setChatHistory(prev=>[...prev, {role:"user", content:message}]);
        const res = await axios.post(endpoint, payload);
        setReply(res.data.message);
        setChatHistory(prev=>[...prev, {role:"assistant", content:res.data.message}]);
    }

    const getAuthenticatedChatReply = async (token, activeModel) => {
        
        const endpoint = `${backendUrl}/api/users/auth/profile/authCallToModel`;
        const payload = {
            model: activeModel,
            message,
            threadId: activeThreadId
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        setChatHistory(prev => [...prev, { role: "user", content: message }]);
        const res = await axios.post(endpoint, payload, config);
        setChatHistory(prev => [...prev, { role: "assistant", content: res.data.message }]);
        setReply(res.data.message);
        if (res.data.threadId && !activeThreadId) {
            setActiveThreadId(res.data.threadId);
            getThreadTitles(); 
        }
    }
    
    const getChatReply = async ()=>{
        if (!message || message.trim() === "") {
          setError("Message cannot be empty.");
          return;
       }

        let activeModel = model; 
        if (model === "Choose Model") {
            setModel("groq"); 
            activeModel = "groq"; 
        }

      
        setIsLoading(true);
        setError(null);
        setMessage("")
      try {
          const token = localStorage.getItem('accessToken');
          
         
          if (!token) {
             await getUnauthenticatedChatReply(activeModel);
          } else {
             await getAuthenticatedChatReply(token, activeModel);
          }
        } 
        catch (err) {
            console.error('Chat Reply Error:', err);
            
            
            const errorMessage = 
                err.response?.data?.message || 
                err.response?.data?.error || 
                err.message || 
                "An unexpected error occurred while fetching the reply.";
                
            setError(errorMessage);
        }
        finally {
           setIsLoading(false);
      }
    }


   const getThreadTitles = async ()=>{
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError("No authentication token found.");
            return;
        }
        setIsLoading(true);
        setError(null);
        const endpoint = `${backendUrl}/api/users/auth/chat/thread`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const res = await api.get(endpoint, config );
            if(res?.data?.threads){
                 const formattedThreads = res.data.threads.map((thread) => ({
                        id: thread._id,
                        title: thread.title
                    }));
            
                setThreads(formattedThreads);
            }
            else {
                throw new Error("Unexpected response structure");
            }
           
        } catch (err) {
            console.error("Thread titles not fetched:", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch threads.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
   }
   
   const loadPreviousThread = async (threadId) => {
        const token = localStorage.getItem('accessToken');
        if(!token){
            return ;
        }
         setIsLoading(true);
         setReply("");
        try{
            const endpoint = `${backendUrl}/api/users/auth/chat/thread/${threadId}`;
            const res = await api.get(endpoint, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            setActiveThreadId(threadId);

            if (res.data.thread && res.data.thread.length > 0) {
               setChatHistory(res.data.thread[0].messages); 
            }
        } catch (error) {
            console.error("Failed to load thread:", error);
        } finally {
          setIsLoading(false);
        }
   }


   // delete thread
   const deleteThread = async (threadId) => {
        const token = localStorage.getItem('accessToken');
        if(!token){
            console.log("Unauthorized User");
            return ;
        }
        try {
            const endpoint =`${backendUrl}/api/users/auth/chat/thread/${threadId}`;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            await api.delete(endpoint, config);
           console.log("Thread deleted successfully");
           getThreadTitles();
           if (activeThreadId === threadId) {
               startNewChat();
           }
        } catch (error) {
            console.error(`Thread not delted , Server error`, error.message);
        }
   }
   
  return ( <UserDataContext.Provider 
      value={{
            threads, 
            activeThreadId,
            setActiveThreadId,
            loadPreviousThread,
            getThreadTitles, 
            isLoading, 
            error,
            getChatReply,
            reply,
            chatHistory,
            startNewChat,
            deleteThread,
        }}
    >
    {children}
   </UserDataContext.Provider>)

}