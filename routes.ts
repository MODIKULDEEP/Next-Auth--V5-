/**
 * an array of routes that are accesible to the public
 * this routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * an array of routes that are used for authentication
 * this routes will redirect loogged in user to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
]

/**
 * the prefix for api authentication routes
 * routes that will start with this prefix will be used for api authentication
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"
/**
 * the default login redirect path after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings"