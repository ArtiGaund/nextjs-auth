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

export default function LoginPage(){
    const router = useRouter();
    // what information i am looking up for
    const [ user, setUser ] = React.useState({
        email: "",
        password: "",
    })
    const [ buttonDisabled, setButtonDisabled ] = React.useState(false)
    const [ loading, setLoading ] = React.useState(false)
    // method which do all signup, this method talking to database thats why asyn
    const onLogin = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("Login success  ",response.data);
            toast.success("Login success")
            router.push("/profile")
            
        } catch (error: any) {
            console.log("Login failed ",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing " : "Login"}</h1>
            <hr/>
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
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 text-white"
            >{buttonDisabled ? "No Login" : "Login here"}</button>
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}