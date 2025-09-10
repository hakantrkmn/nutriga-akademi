"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { COMPANY_NAME } from "@/constants";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setUserEmail(user?.email ?? null);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
      setUserEmail(session?.user?.email ?? null);
    });

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      sub.subscription.unsubscribe();
      window.removeEventListener("resize", checkMobile);
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserEmail(null);
    router.replace("/");
  };

  const NavItems = () => (
    <>
      <Link
        href="/"
        className="text-gray-700 hover:text-green-600 transition-colors"
      >
        Ana Sayfa
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-green-600 justify-start"
          >
            Kurumsal
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/hakkimizda" className="cursor-pointer">
              Hakkımızda
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/misyon" className="cursor-pointer">
              Misyonumuz
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/vizyon" className="cursor-pointer">
              Vizyonumuz
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        href="/egitimler"
        className="text-gray-700 hover:text-green-600 transition-colors"
      >
        Eğitimler
      </Link>

      <Link
        href="/blog"
        className="text-gray-700 hover:text-green-600 transition-colors"
      >
        Blog
      </Link>

      <Link
        href="/iletisim"
        className="text-gray-700 hover:text-green-600 transition-colors"
      >
        İletişim
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-green-600 hover:text-green-700 cursor-pointer transition-colors">
            {COMPANY_NAME}
          </h1>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-8">
            <NavItems />
          </nav>
        )}

        {/* Desktop Cart & Auth Buttons */}
        {!isMobile && (
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Button
                variant="ghost"
                className="text-green-600 hover:bg-green-50 px-4 py-2 font-medium"
                onClick={() => router.push("/cart")}
              >
                🛒 Sepet
              </Button>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm font-medium max-w-[120px] truncate">
                  {userEmail?.split("@")[0]}
                </span>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-50 px-2 py-2"
                  onClick={handleLogout}
                  title="Çıkış Yap"
                >
                  <FiLogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:bg-gray-50 px-4 py-2 font-medium"
                  onClick={() => router.push("/auth/login")}
                >
                  Giriş Yap
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-medium"
                  onClick={() => router.push("/auth/register")}
                >
                  Kayıt Ol
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <HiMenu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
        )}
      </div>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menü</SheetTitle>
          </SheetHeader>
          <div className="pt-6 space-y-6">
            <nav className="flex flex-col space-y-4">
              <NavItems />
            </nav>

            <div className="pt-6 space-y-3">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-green-600 hover:bg-green-50"
                  onClick={() => {
                    setOpen(false);
                    router.push("/cart");
                  }}
                >
                  Sepet
                </Button>
              )}
              {isAuthenticated ? (
                <>
                  <p className="text-gray-600 text-sm w-full text-left">
                    {userEmail}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-green-600 hover:bg-green-50"
                    onClick={handleLogout}
                  >
                    Çıkış Yap
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      setOpen(false);
                      router.push("/auth/login");
                    }}
                  >
                    Giriş Yap
                  </Button>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      setOpen(false);
                      router.push("/auth/register");
                    }}
                  >
                    Kayıt Ol
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
