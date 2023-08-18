import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

    const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

    if (!session) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
      }

    const validRoles = ['admin', 'super-user', 'SEO'];

      if (req.nextUrl.pathname.startsWith('/admin')) {
          
          if (!validRoles.includes(session.user.role)) {
            const url = req.nextUrl.clone();
            url.pathname = '/'
              return NextResponse.redirect(url)
          }
      } 

      if  (req.nextUrl.pathname.startsWith('/api')) { 
        if (!validRoles.includes(session.user.role)) {
            const url = req.nextUrl.clone();
            url.pathname = '/'
              return NextResponse.redirect(url)
          }
        

      }
    
    
      return NextResponse.next();
    
}

export const config = {

    matcher: [
        '/checkout/address',
        '/checkout/summary', 
        '/admin',
        '/api/admin/users',
        '/api/admin/products',
        '/api/admin/dashboard',
        '/api/admin/orders',
        '/admin/users',
        '/admin/orders',
        '/admin/products',
    ]
}