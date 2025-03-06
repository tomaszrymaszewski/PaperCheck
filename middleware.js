import { NextResponse } from 'next/server';

// This middleware function runs on every request
export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || 
                      path === '/register' || 
                      path.startsWith('/api/') || 
                      path.startsWith('/_next/') || 
                      path.includes('/images/') || 
                      path === '/favicon.ico';
  
  // Check if the user is authenticated by examining cookies
  // Note: For a client-side auth approach using localStorage, this won't work perfectly,
  // but we can add a simple check for development purposes
  const authCookie = request.cookies.get('mathCheckAuth')?.value;
  const isAuthenticated = authCookie === 'true';
  
  // If the user is not on a public path and is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    // For debugging
    console.log(`Redirecting unauthenticated user from ${path} to /login`);
    
    // Create the URL to redirect to
    const loginUrl = new URL('/login', request.url);
    
    // Add the original URL as a parameter so we can redirect back after login
    loginUrl.searchParams.set('from', path);
    
    // Redirect to the login page
    return NextResponse.redirect(loginUrl);
  }
  
  // If the user is on the login page but is already authenticated, redirect to home
  if ((path === '/login' || path === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Continue with the request if no redirect is needed
  return NextResponse.next();
}

// Configure which paths this middleware is run for
export const config = {
  matcher: [
    // Match all paths except for specific static files or API routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
