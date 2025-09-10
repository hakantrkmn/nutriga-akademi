"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiFileText,
  FiHome,
  FiImage,
  FiLogOut,
} from "react-icons/fi";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [adminEmail, setAdminEmail] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    // Admin email'ini al
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@nutriga.com";
    setAdminEmail(email);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin");
    } catch (error) {
      console.error("Çıkış yapılırken hata:", error);
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-2 md:px-6 py-1.5 md:py-2 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full min-w-0">
        {/* Sol taraf - Logo */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 min-w-0">
          <h1 className="text-sm md:text-xl font-bold text-gray-900 leading-tight truncate">
            Nutriga Akademi
          </h1>
          <span className="text-xs text-gray-500 bg-gray-100 px-1.5 md:px-2 py-1 rounded-full hidden sm:block">
            Admin
          </span>
        </div>

        {/* Orta - Navigation (Desktop) */}
        <div className="hidden md:flex gap-1">
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 ${
                isActive("/admin/dashboard")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiHome className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Link href="/admin/egitimler">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 ${
                isActive("/admin/egitimler")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiBookOpen className="mr-2 h-4 w-4" />
              Eğitimler
            </Button>
          </Link>

          <Link href="/admin/hero">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 ${
                isActive("/admin/hero")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiImage className="mr-2 h-4 w-4" />
              Hero
            </Button>
          </Link>

          <Link href="/admin/blog">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 ${
                isActive("/admin/blog")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiFileText className="mr-2 h-4 w-4" />
              Blog
            </Button>
          </Link>
        </div>

        {/* Mobil Navigation */}
        <div className="flex md:hidden gap-0.5">
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className={`px-1.5 h-8 ${
                isActive("/admin/dashboard")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiHome className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <Link href="/admin/egitimler">
            <Button
              variant="ghost"
              size="sm"
              className={`px-1.5 h-8 ${
                isActive("/admin/egitimler")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiBookOpen className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <Link href="/admin/blog">
            <Button
              variant="ghost"
              size="sm"
              className={`px-1.5 h-8 ${
                isActive("/admin/blog")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiFileText className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Sağ taraf - Admin bilgileri ve çıkış */}
        <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
          <span className="hidden xl:block text-sm text-gray-900">
            {adminEmail}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="px-1.5 md:px-3 text-gray-900 hover:bg-gray-50 h-8"
          >
            <FiLogOut className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden md:block">Çıkış</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
