// how to grab token data
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'


export const getDataFromToken = (request: NextRequest) => {
    try {
       const token = request.cookies.get("token")?.value || ""
       // decoding the token
       // jwt not only verify the token, it also extract the information as a response of this function
       const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}