import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        // destructuring 
        const { password, confirm_password, token} = reqBody
        console.log("ReqBody ",reqBody)
        // check if user exist using token
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now()}})
        if(!user){
            return NextResponse.json({ error: "Invalid token"}, {status: 400})
        } 
        console.log("User ",user)
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        if(user.isVerified){
            console.log("Previous password ",user.password)
            user.password = hashedPassword
            console.log("New password ",user.password);
            user.forgotPasswordToken = undefined
            user.forgotPasswordTokenExpiry = undefined
            await user.save()
            return NextResponse.json({
                message: "Password changed successfully",
                success: true,
            })
        }
        return NextResponse.json({
            error: "User is not verified",
            success: false,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message}, {status: 500})
    }
}