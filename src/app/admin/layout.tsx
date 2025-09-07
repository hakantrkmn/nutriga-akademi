"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const bgColor = "gray.50";

  // Login sayfası için özel layout
  if (pathname === "/admin") {
    return (
      <Box
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        {children}
      </Box>
    );
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
