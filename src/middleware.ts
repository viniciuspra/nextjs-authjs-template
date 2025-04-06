import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

/**
 * Middleware for handling authentication and route protection
 *
 * This middleware runs on every request and:
 * 1. Allows API auth routes to pass through
 * 2. Redirects authenticated users away from auth pages
 * 3. Redirects unauthenticated users to login when accessing protected routes
 * 4. Preserves the original URL as a callback for post-login redirect
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow API authentication routes to pass through
  if (isApiAuthRoute) {
    return;
  }

  // Redirect to dashboard if user is already logged in and tries to access auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Redirect to login if user is not logged in and tries to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    // Save the current URL to redirect back after login
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
