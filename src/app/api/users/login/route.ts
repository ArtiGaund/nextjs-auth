import { connect } from "@/dbConfig/dbConfig";
// need users/model to add things into database
import User from "@/models/userModel"
// grab request and response
import { NextRequest, NextResponse } from "next/server";
// for encrypting the passwords
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        // fetch data from request
        const reqBody = await request.json()
        // destructuring values
        const { email, password } = reqBody
        console.log("ReqBody ",reqBody)
        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist. "}, { status: 400})
        }
        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password. "}, { status: 400})
        }
        // creating token data
        // in database data is stored in _id
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        // creating the token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d"})

        //setting this token in users cookies
        const response = NextResponse.json({
            message: "Login Successful.",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}