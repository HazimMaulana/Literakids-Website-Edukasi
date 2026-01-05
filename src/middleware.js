import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 1. Define public paths that don't need authentication
  const isPublicPath = 
    pathname === '/' || 
    pathname === '/login' || 
    pathname.startsWith('/api/auth') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/assets') || 
    pathname.startsWith('/backgroundImages') || 
    pathname.startsWith('/ornaments') || 
    pathname.startsWith('/webContoh') ||
    pathname === '/favicon.ico';

  const token = request.cookies.get('auth_token')?.value;
  const role = request.cookies.get('user_role')?.value;

  // 2. If it's a public path, allow it
  if (isPublicPath) {
    // Optional: Redirect logged-in users away from login page
    if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 3. If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Admin route protection
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 5. Protect specific student routes (Explicit check, though implicit by !isPublicPath)
  // This ensures that even if we mess up isPublicPath, these are definitely protected
  const protectedStudentRoutes = ['/dashboard', '/beribadah', '/bermasyarakat', '/makan-bergizi'];
  if (protectedStudentRoutes.some(route => pathname.startsWith(route))) {
     if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
     }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
