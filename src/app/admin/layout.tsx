"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  // Login sayfası için özel layout
  if (pathname === "/admin") {
    return (
      <div className="admin-layout site-theme-sage site-font-sage">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout site-theme-sage site-font-sage">
      <AdminHeader />
      {children}
    </div>
  );
}
