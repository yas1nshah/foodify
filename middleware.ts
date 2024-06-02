import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

 

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookieStore = cookies()
    const userID = cookieStore.get('id')
    const isAdmin = cookieStore.get('role')
     


    if  (request.url == "http://localhost:3000/" && userID === undefined)
            {
                return NextResponse.redirect(new URL('/userID/login', request.url))
            }
    else if (request.url == "http://localhost:3000/userID/login" && userID !== undefined)
            {
                return NextResponse.redirect(new URL('/', request.url))
            }
    else if (request.url == "http://localhost:3000/userID/signup" && userID !== undefined)
            {
                return NextResponse.redirect(new URL('/', request.url))
            }
    else if (request.url.startsWith("http://localhost:3000/admin") )
            {
                if(isAdmin){
                    
                    if (isAdmin.value === 'false'){

                        return NextResponse.redirect(new URL('/', request.url))
                    }
                }
            }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}