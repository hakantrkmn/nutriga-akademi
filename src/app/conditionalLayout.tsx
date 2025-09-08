"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Admin sayfaları için sadece children (kendi layout'ları var)
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // Normal sayfalar için header ve footer
  return (
    <div className="site-root site-theme-sage site-font-sage">
      <Header />
      <Box pt="80px">{children}</Box>
      <Footer />
    </div>
  );
}
