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
import { useCart } from "@/hooks/useCart";
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
  const { isAuthenticated } = useCart();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.matches("button, a")) return;

      const circle = document.createElement("span");
      circle.className = "click-anim";

      const rect = target.getBoundingClientRect();
      circle.style.left = `${e.clientX - rect.left}px`;
      circle.style.top = `${e.clientY - rect.top}px`;

      target.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 1000); // 1 saniye sonra kaldır
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
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
    setUserEmail(null);
    router.replace("/");
  };

  const NavItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <Link
        href="/"
        className="text-secondary-text hover:text-primary transition-colors whitespace-nowrap flex-shrink-0"
        onClick={onItemClick}
      >
        Ana Sayfa
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-secondary-text hover:text-primary hover:bg-gray-50 justify-start text-base font-normal h-auto px-0 py-0 whitespace-nowrap flex-shrink-0"
          >
            Kurumsal
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem asChild>
            <Link
              href="/hakkimizda"
              className="cursor-pointer"
              onClick={onItemClick}
            >
              Hakkımızda
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/misyon"
              className="cursor-pointer"
              onClick={onItemClick}
            >
              Misyonumuz
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/vizyon"
              className="cursor-pointer"
              onClick={onItemClick}
            >
              Vizyonumuz
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        href="/egitimler"
        className="text-secondary-text hover:text-primary transition-colors whitespace-nowrap flex-shrink-0"
        onClick={onItemClick}
      >
        Eğitimler
      </Link>

      <Link
        href="/blog"
        className="text-secondary-text hover:text-primary transition-colors whitespace-nowrap flex-shrink-0"
        onClick={onItemClick}
      >
        Blog
      </Link>

      <Link
        href="/iletisim"
        className="text-secondary-text hover:text-primary transition-colors whitespace-nowrap flex-shrink-0"
        onClick={onItemClick}
      >
        İletişim
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 grid grid-cols-[1fr_2fr_1fr] items-center md:grid-cols-[1fr_2fr_1fr] grid-cols-2">
        {/* Logo */}
        <div className="justify-self-start flex-shrink-0">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary-600 hover:text-primary-700 cursor-pointer transition-colors whitespace-nowrap">
              {COMPANY_NAME}
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="justify-self-center flex items-center gap-6 flex-shrink-0">
            <NavItems />
          </nav>
        )}

        {/* Desktop Cart & Auth Buttons */}
        {!isMobile && (
          <div className="justify-self-end flex items-center gap-4 flex-shrink-0">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-primary-600 hover:bg-transparent text-base font-normal h-auto px-0 py-0"
              onClick={() => router.push("/cart")}
            >
              🛒 Sepet
            </Button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm font-medium max-w-[120px] truncate">
                  {userEmail?.split("@")[0]}
                </span>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-primary-600 hover:bg-transparent text-base font-normal h-auto px-0 py-0"
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
                  className="text-gray-700 hover:text-primary-600 hover:bg-transparent text-base font-normal h-auto px-0 py-0"
                  onClick={() => router.push("/auth/login")}
                >
                  Giriş Yap
                </Button>
                <Button
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 font-medium"
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
          <div className="justify-self-end md:justify-self-end">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HiMenu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
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
              <NavItems onItemClick={() => setOpen(false)} />
            </nav>

            <div className="pt-6 space-y-3">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-secondary-text hover:text-primary hover:bg-gray-50"
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
                  <p className="text-muted-text text-sm w-full text-left">
                    {userEmail}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-secondary-text hover:text-primary hover:bg-gray-50"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    Çıkış Yap
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-secondary-text hover:text-primary hover:bg-gray-50"
                    onClick={() => {
                      setOpen(false);
                      router.push("/auth/login");
                    }}
                  >
                    Giriş Yap
                  </Button>
                  <Button
                    className="w-full bg-primary hover:bg-primary-hover text-white"
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
