import { createContext, useContext, useEffect , useState} from 'react';
import api from '../Api';


const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) =>{
    const [userData, setUserData] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); 
    const [isLogin, setIsLogin] = useState(false);

     const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
     const [state, setState] = useState("login");
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    const frontendUrl = import.meta.env.VITE_APP_FRONTEND_URL || window.location.origin;
   

// Get user data 
    useEffect(()=>{
        
      const fetchUserProfile = async ()=>{
        try {
            const token = localStorage.getItem('accessToken');
            if(!token){
                setLoading(false);
                return ;
            }
            const response = await api.get(`${backendUrl}/api/users/auth/profile/me`, {
                     headers: {
                        Authorization: `Bearer ${token}`
                    }
            });
            console.log(response);
         
            setUserData(response.data.user);
            setIsLogin(true);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
        finally{
            setLoading(false);
        }
      };
      fetchUserProfile();

    }, [backendUrl]);



    // handle login/register

    const handleSignup = async  (e)=>{
        e.preventDefault();
        console.log(formData);
        setError("");
        setSuccess("");
        const isLogin = state === "login";
        const endpoint = state==="login" ? `${backendUrl}/api/users/auth/login` :`${backendUrl}/api/users/auth/register`;
        const payload = isLogin
        ? { email: formData.email, password: formData.password } 
        : formData;

        try {
        const response = await api.post(endpoint, payload);

        if (isLogin) {
            
            const { accessToken, refreshToken } = response.data;
            
            
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            setIsLogin(true)
            window.location.href = '/'; 
            
        } else {
            setSuccess("Account created successfully! Please log in.");
            setState("login");
            setFormData({ ...formData, password: "" }); 
        }
        } catch (err) {
        
        const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
        setError(errorMessage);
        }

    }


   // handle logout 
   const handleLogout = async () => {
        try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
            await api.post(`${backendUrl}/api/users/auth/logout`, { 
            refreshToken 
            });
        }
        } catch (error) {
        console.error("Logout error:", error);
        } finally {
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        setIsLogin(false);
        window.location.href = `${frontendUrl}`; 
        }
    };
  
   return (
    <UserContext.Provider value = {{userData, loading, handleLogout, formData, setFormData, handleSignup, state, setState, isLogin, setIsLogin, error, success}}>
        {children}
    </UserContext.Provider>
   )


}