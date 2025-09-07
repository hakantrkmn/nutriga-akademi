"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { supabase } from "@/lib/supabase";
import { Box, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const bgColor = "gray.50";
  const textColor = "gray.900";

  const checkAuth = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // Admin email kontrolü
        if (session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          setIsAuthenticated(true);
          // Login sayfasındaysa dashboard'a yönlendir
          if (pathname === "/admin") {
            router.push("/admin/dashboard");
          }
        } else {
          // Admin değilse çıkış yap
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          router.push("/admin");
        }
      } else {
        setIsAuthenticated(false);
        // Login sayfası değilse login'e yönlendir
        if (pathname !== "/admin") {
          router.push("/admin");
        }
      }
    } catch (error) {
      console.error("Auth kontrolü hatası:", error);
      setIsAuthenticated(false);
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();

    // Auth state değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        // Admin email kontrolü
        if (session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          setIsAuthenticated(true);
          if (pathname === "/admin") {
            router.push("/admin/dashboard");
          }
        } else {
          // Admin değilse çıkış yap
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          router.push("/admin");
        }
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        router.push("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, checkAuth]);

  // Loading state
  if (isLoading) {
    return (
      <Box
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box textAlign="center">
          <Text color={textColor} fontSize="lg">
            Yükleniyor...
          </Text>
        </Box>
      </Box>
    );
  }

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

  // Authenticated değilse login'e yönlendir
  if (!isAuthenticated) {
    return (
      <Box
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box textAlign="center">
          <Text color={textColor} fontSize="lg">
            Yetkilendirme kontrol ediliyor...
          </Text>
        </Box>
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
