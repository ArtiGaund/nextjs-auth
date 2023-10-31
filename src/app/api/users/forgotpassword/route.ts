import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        // fetch data from request
        const reqBody = await request.json();
        // destructuring values
        const {email} = reqBody;
        console.log("Email for forgot password ",email)
        // check if user exist
        const user = await User.findOne({ email })
        if(!user){
            return NextResponse.json({ error: "User does not exist"}, { status: 400})
        }
        await sendEmail({ email, emailType: "RESET", userId: user._id});
        return NextResponse.json({
            message: "Verification mail has been sended to your email successfully",
            success: true,
            user,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message },{ status: 500})
    }
}