// logout is done by clearing the token
import { NextResponse } from "next/server";


export async function GET() {
    try {
        // creating a response which is capable of removing the cookies
        const response = await NextResponse.json({
            message: "Logout successfully",
            success: true,
        })
        // this response is type next response, so it can interact with cookies
        // setting token as empty
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500});
    }
}