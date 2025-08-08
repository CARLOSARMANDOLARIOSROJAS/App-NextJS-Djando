
export function middleware(req) {
    const pathname = req.nextUrl

    if (pathname.startsWith('/users') ) {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return Response.redirect(new URL('/', req.url));
        }
    }   

    return Response.next();
}