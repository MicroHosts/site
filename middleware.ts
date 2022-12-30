import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(req: NextRequest){
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if(!session){
            return NextResponse.rewrite(new URL('/auth/login', req.url));
        }
        const user = await fetch(`https://microhost1.ru/api/user`,{
            headers: req.headers
        })
        if(user.status !== 201){
            return NextResponse.rewrite(new URL('/auth/login', req.url));
        }
        const data = await user.json();
        if(data.role !== 'ADMIN'){
            return NextResponse.rewrite(new URL('/auth/login', req.url));
        }
        // const check = await fetch(`https://microhost1.ru/api/admin/check`,{
        //     headers: req.headers
        // })
        // if(check.status !== 201){
        //     return NextResponse.rewrite(new URL('/auth/login', req.url));
        // }
        return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith('/billing') && !session) {
        return NextResponse.rewrite(new URL('/auth/login', req.url))
    }
    if (req.nextUrl.pathname.startsWith('/host')) {
        const user = await fetch(`https://microhost1.ru/api/user`,{
            headers: req.headers
        })
        if(user.status !== 201){
            return NextResponse.rewrite(new URL('/auth/login', req.url));
        }
        const data = await user.json();

        if(data.role === 'ADMIN'){
            return NextResponse.next();
        }
        const id = req.nextUrl.pathname.split('/')[2]
        if(!id){
            const host1 =await fetch(`https://microhost1.ru/api/hosts?id=${id}`,{
                headers: req.headers
            })
            if(host1 === null) {
                return {
                    redirect: { destination: "/billing" },
                };
            }else{
                return NextResponse.next();
            }
        }
        return NextResponse.rewrite(new URL('/auth/login', req.url))
    }
    return NextResponse.next();
}

// export const config = {
//     matcher: ['/billing/:path*']
// }
