// to make it client component
"use client"
import React from "react"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();
    // we need state as well where we can pass on this information
    const [ data, setData ] = React.useState("nothing")
    const onLogout = async() => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful.")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    //calling me to get the user details
    const getUserDetails = async() => {
        const response = await axios.get('/api/users/me')
        console.log("response data ",response.data);
        setData(response.data.data._id)

    }

    return(
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500 text-white">{data === 'nothing' ? "Nothing" : 
            <Link href={`/profile/${data}`}>{data}</Link>
            }</h2>
            <hr />
            <button
            onClick={onLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >Logout</button>
            <hr />
             <button
            onClick={getUserDetails}
            className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
            >User Details</button>
            <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => router.push("/forgotpassword")}>Forgot Password</button>
       </div>
    )
}