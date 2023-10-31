import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Logic part
//1) there are paths which are public paths - login, signup, if somebody have token they should not be able to access those
//2) there are protected paths, if somebody is not logged in they should not access those path - profile
export function middleware( request: NextRequest){
   // how to find out what are the paths, bz now we don't have access to the paths
   const path = request.nextUrl.pathname
   // declaring some paths are public and some are not
   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
   // extracting the token from cookies
   const token = request.cookies.get('token')?.value || ''
   if( isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl))
   }
   // nexURl for moving to nextUrl
   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
   }
}


// see "Matching paths" below 
// todo: we cannot visit profile but it further path is visited, restrict them as well
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/verifyforgotpasswordtoken',
        '/forgotpassword',
    ]
}