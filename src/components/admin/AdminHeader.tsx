"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiBookOpen, FiFileText, FiHome, FiLogOut } from "react-icons/fi";

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
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full">
        {/* Sol taraf - Logo */}
        <div className="flex flex-col items-start gap-0 flex-shrink-0">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-none">
            Nutriga Akademi
          </h1>
          <p className="text-xs md:text-sm text-gray-600 leading-none">
            Admin Panel
          </p>
        </div>

        {/* Orta - Navigation (Desktop) */}
        <div className="hidden md:flex gap-1">
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className={`${
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
              className={`${
                isActive("/admin/egitimler")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiBookOpen className="mr-2 h-4 w-4" />
              Eğitimler
            </Button>
          </Link>

          <Link href="/admin/blog">
            <Button
              variant="ghost"
              size="sm"
              className={`${
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
        <div className="flex md:hidden gap-1">
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${
                isActive("/admin/dashboard")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiHome className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/admin/egitimler">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${
                isActive("/admin/egitimler")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiBookOpen className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/admin/blog">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${
                isActive("/admin/blog")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiFileText className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Sağ taraf - Admin bilgileri ve çıkış */}
        <div className="flex gap-2 md:gap-4 flex-shrink-0">
          <Badge
            variant="secondary"
            className="hidden sm:block px-2 md:px-3 py-1 rounded-full text-xs bg-green-100 text-green-800"
          >
            Admin
          </Badge>

          <div className="flex gap-1 md:gap-3">
            <span className="hidden lg:block text-sm text-gray-900">
              {adminEmail}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="px-2 md:px-3 text-gray-900 hover:bg-gray-50"
            >
              <FiLogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:block">Çıkış</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
