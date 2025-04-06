/**
 * Route configuration for the application
 *
 * This file defines which routes are:
 * - public: accessible without authentication
 * - auth: authentication-related pages (login, register, etc.)
 * - protected: require authentication to access
 *
 * It also defines the API authentication prefix and default redirect after login
 */

// Routes that don't require authentication
const publicRoutes = ["/", "/auth/new-verification"];

// Authentication-related routes
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/new-password",
];

// Prefix for authentication API routes
const apiAuthPrefix = "/api/auth";

// Where to redirect after successful login
const DEFAULT_LOGIN_REDIRECT = "/settings";

export { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };
