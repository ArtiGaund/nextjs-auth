"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"


export default function VerifyEmailPage(){
    // states for token, verified account and error
    const [ token, setToken ] = useState("")
    const [ verified, setVerified ] = useState(false)
    const [ error, setError ] = useState(false)


    const verifyUserEmail = async() => {
        try {
            // sending request from axios
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            // response bz it will be thrown by axios
            console.log("Error in VerifyUserEmail method: ",error.response.data);
        }
    }
     // it will run when the page will load
    useEffect(() => {
        // grab the information from url and update the token
        // based on =, left portion will be 0 value and right portion is my token 
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])
   
     // it will run when there is changes in the token
    useEffect(() => {
        if(token.length > 0){
             verifyUserEmail()
        }
    }, [token])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email verified</h2>
                    <Link href="/login" className="text-blue-500">
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                       
                </div>
            )}
        </div>
    )
}
