import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.SESSION_SECRET,
})

export const config = {
  matcher: ["/admin/:path*"],
}