import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(req.nextUrl.pathname);
  console.log("isLoggedIn:", isLoggedIn);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
