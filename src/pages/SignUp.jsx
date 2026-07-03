import React from 'react'
import { useAppContext } from '../context/AppContext';
import { useUser } from '../context/AuthContext';

const SignUp = () => {

const { 
        formData, setFormData, handleSignup, state, setState, 
        error, setError, success, setSuccess 
    } = useUser();


    const handleChange = (e) => {
        
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const toggleState = () => {
        setState(prev => prev === "login" ? "register" : "login");
        setError("");
        setSuccess("");
    };
    
    return (
        <div className=' h-screen flex justify-center items-center  bg-background'>
           <form
            onSubmit={handleSignup}
            className=" md:w-[25%] text-center flex flex-col justify-center items-center bg-surface border border-border-subtle rounded-2xl px-10">
              
            <h1 className="text-text-muted text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-text-main text-sm mt-2">Please {state } to continue</p>

            {error && (
                    <div className="w-full p-3 mb-2 text-sm text-red-600 bg-red-100 rounded-md">
                        {error}
                    </div>
                )}
            {success && (
                <div className="w-full p-3 mb-2 text-sm text-green-600 bg-green-100 rounded-md">
                    {success}
                </div>
            )}

            {state !== "login" && (
                <><div className="flex items-center mt-6 w-full bg-background border-border-subtle h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-muted" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>
                    <input type="text" name="firstName" placeholder="First Name" className="w-full bg-transparent text-text-main placeholder-text-text-muted border-none outline-none " value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-6 w-full bg-background border-border-subtle h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-muted" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>
                    <input type="text" name="lastName" placeholder="Last Name" className="w-full bg-transparent text-text-main placeholder-text-text-muted border-none outline-none " value={formData.lastName} onChange={handleChange} required />
                </div></>
            )}

            <div className="flex items-center w-full mt-4 bg-background border-border-subtle h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-muted" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
                <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-text-main placeholder-text-text-muted border-none outline-none " value={formData.email} onChange={handleChange} required />
            </div>

            <div className=" flex items-center mt-4 w-full bg-background border-border-subtle h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-muted" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
                <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-text-main placeholder-text-text-muted border-none outline-none" value={formData.password} onChange={handleChange} required />
            </div>

           

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-text-main bg-primary hover:bg-secondary transition "
                    
            >
                {state === "login" ? "Login" : "Sign up"}
            </button>

            <p onClick={() =>onClick={toggleState} } className="text-text-muted text-sm mt-3 mb-11 cursor-pointer" >
                {state === "login" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-secondary hover:underline ml-1">click here</span>
            </p>
        </form>
    </div>
        
    )
}

export default SignUp
