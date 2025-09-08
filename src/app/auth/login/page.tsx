"use client";

import { toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const userEmail = data.user?.email;
      toaster.success("Başarıyla giriş yapıldı!");
      if (userEmail && userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Giriş işlemi sırasında bir hata oluştu.";
      toaster.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" px={{ base: 4, md: 0 }} py={{ base: 10, md: 16 }}>
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="gray.900" mb={2}>
            Giriş Yap
          </Heading>
          <Text color="gray.600">Hesabınıza erişin</Text>
        </Box>

        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="sm"
        >
          <VStack gap={4} align="stretch">
            <Field.Root required>
              <Field.Label>E-posta</Field.Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Şifre</Field.Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field.Root>
            <Button type="submit" colorScheme="green" loading={loading}>
              Giriş Yap
            </Button>
            <Text color="gray.600" fontSize="sm" textAlign="center">
              Hesabın yok mu?{" "}
              <Button
                variant="ghost"
                colorScheme="green"
                onClick={() => router.push("/auth/register")}
              >
                Kayıt ol
              </Button>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
