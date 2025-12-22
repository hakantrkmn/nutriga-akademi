import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin area and API protection
  if (
    (pathname.startsWith("/admin/") && pathname !== "/admin") ||
    pathname.startsWith("/api/admin/")
  ) {
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        console.log("Admin yetkisi yok:", user?.email);

        // API istekleri için 401 döndür, sayfalar için yönlendir
        if (pathname.startsWith("/api/")) {
          return NextResponse.json(
            { success: false, error: "Yetkisiz erişim" },
            { status: 401 }
          );
        }
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { success: false, error: "Yetkilendirme hatası" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }

  // Login page redirect if already logged in
  if (pathname === "/admin") {
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
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Admin route'larında ve API'lerinde middleware çalıştır
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
