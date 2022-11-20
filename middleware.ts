import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";


export async function middleware(req: NextRequest){
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(session)

    if(!session){
        return NextResponse.rewrite(new URL('/auth/login', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/billing/:path*']
}
