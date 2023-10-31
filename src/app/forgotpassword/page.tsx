"use client"
import React,{ useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function ForgotPasswordPage(){
    const router = useRouter();
    const [ user, setUser ] = useState({
        email: "",
    })
    const [ error, setError ] = useState(false);
    // const [ buttonDisabled, setButtonDisabled ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const onForgotPassword = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/forgotpassword", user)
            console.log("Verification link has been send successfully. ")
            router.push("/verifyforgotpasswordtoken")
        } catch (error: any) {
            setError(true);
            console.log("Error in onForgotPassword ",error.message);
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading ": "Enter the email for forget password"}</h1>
            <label htmlFor="email">email</label>
            <input 
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            />
             <button
            onClick={onForgotPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 text-white"
            >Send verification email</button>
            {error && (
                <div className="text-red-700">Error occurred</div>
            )}
        </div>
    )
}