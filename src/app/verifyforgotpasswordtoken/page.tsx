"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function ForgotPasswordDetailPage(){
    // const [ token, setToken ] = useState("");
    // const [ verified, setVerified ] = useState(false)
    const [ error, setError ] = useState(false);
    const router = useRouter()

    const [ user, setUser ] = useState({
        password: "",
        confirm_password: "",
        token:  "",
    })

    // const [ buttonDisabled, setButtonDisabled ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const onChangePassword = async() => {
        try {
            setLoading(true)
            if(user.password === user.confirm_password){
                const response = await axios.post('/api/users/verifyforgotpasswordtoken', user)
                // setVerified(true);
                console.log("Password changed successfully.")
                router.push("/profile")
            }  else{
                console.log("Password and confirm password are different")
                setUser({
                    ...user,
                    password: "",
                    confirm_password: "",
                });
            }
            
        } catch (error: any) {
            console.log("Failed to change the password ",error.message);
            toast.error(error.message)
            setError(true);
        } finally{
            setLoading(false);
        }
    }
    // it will run when the page will load
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        const token_value = urlToken || ""
        setUser({...user, token: token_value})
    }, [])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing data": "Verification"}</h1>
            <label htmlFor="password">password</label>
            <input 
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            />
            <label htmlFor="confirm_password">Confirm password</label>
            <input 
            id="confirm_password"
            type="password"
            value={user.confirm_password}
            onChange={(e) => setUser({...user, confirm_password: e.target.value})}
            placeholder="confirm password"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            />
            <button
            onClick={onChangePassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 text-white"
            >Change password</button>
            {error && (
                <div className="text-red-800">Error occurred</div>
            )}
        </div>
    )
}