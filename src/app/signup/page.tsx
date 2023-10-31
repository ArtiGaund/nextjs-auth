// converting component into client component (decurator)
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
// router for redirections
import { useRouter } from 'next/navigation'
// error (squelly lines) bz typescript required type definition as well, and since the axios type is not defined thats 
// why we have explicitly installed it 
import  axios  from 'axios'
import toast from "react-hot-toast";
 

export default function SignupPage(){
    //when user sign up, we need to send data into login page, router is used for this
    const router = useRouter();
    // what information i am looking up for
    const [ user, setUser ] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [ buttonDisabled, setButtonDisabled ] = React.useState(false)
    const [ loading, setLoading ] = React.useState(false)

    // method which do all signup, this method talking to database thats why asyn
    const onSignup = async() => {
        try {
            setLoading(true)
            // make a request
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success ",response.data);
            // push the user on new page
            router.push("/login")
            
        } catch (error: any) {
            console.log("Signup failed ",error.message);
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    }


    useEffect(() => {
        // values are in all fields the button will be enable
        if( user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input 
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            />
            <label htmlFor="email">email</label>
            <input 
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            />
            <label htmlFor="password">password</label>
            <input 
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            />
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 text-white"
            >{buttonDisabled ? "No Signup" : "Signup here"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}