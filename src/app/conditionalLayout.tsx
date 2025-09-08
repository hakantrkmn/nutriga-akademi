"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
// AdminProvider removed
// Chakra UI import removed
import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Admin sayfaları için sadece children render et
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // Normal sayfalar için header ve footer
  return (
    <div className="site-root site-theme-sage site-font-sage">
      <Header />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  );
}
