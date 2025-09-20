import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const adminRoutes = [
    "/admin/dashboard",
    "/admin/egitimler",
    "/admin/blog",
    "/admin/hero",
    "/admin/mesajlar",
  ];
  const pathname = request.nextUrl.pathname;

  // Admin routes için auth kontrolü
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    const response = NextResponse.next({
      request,
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    try {
      // Critical: Use getUser() instead of getSession() for security
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // User yoksa admin login'e yönlendir
      if (!user) {
        console.log("User bulunamadı - admin login'e yönlendiriliyor");
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      // Email kontrolü
      if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        console.log("Email kontrolü başarısız:", user.email);
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch {
      console.error("Middleware auth error:");
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }
  if (pathname.startsWith("/admin")) {
    const response = NextResponse.next({
      request,
    });
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      console.log("Email kontrolü başarısız:", user?.email);
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Auth, API routes ve static dosyalar için middleware çalışmasın
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
