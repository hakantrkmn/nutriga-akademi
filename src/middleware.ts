import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase";

export async function middleware(request: NextRequest) {
  // Public routes - no auth required
  const adminRoutes = ["/admin/dashboard", "/admin/egitimler", "/admin/blog"];
  if (adminRoutes.includes(request.nextUrl.pathname)) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (!session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Auth, API routes ve static dosyalar için middleware çalışmasın
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
