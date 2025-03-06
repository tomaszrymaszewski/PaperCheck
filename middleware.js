// This middleware ensures authenticated routes are protected
// Place this file in your project root (same level as package.json)

export { default } from 'next-auth/middleware';

export const config = {
  // Skip auth checks for these paths
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|login).*)'],
};
