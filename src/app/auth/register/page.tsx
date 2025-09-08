"use client";

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

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      router.replace("/auth/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Kayıt başarısız";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" px={{ base: 4, md: 0 }} py={{ base: 10, md: 16 }}>
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="gray.900" mb={2}>
            Kayıt Ol
          </Heading>
          <Text color="gray.600">Yeni hesabını oluştur</Text>
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
            <Field.Root required invalid={!!error}>
              <Field.Label>E-posta</Field.Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
              />
            </Field.Root>
            <Field.Root required invalid={!!error}>
              <Field.Label>Şifre</Field.Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field.Root>
            <Field.Root required invalid={!!error}>
              <Field.Label>Şifre (Tekrar)</Field.Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              {error && <Field.ErrorText>{error}</Field.ErrorText>}
            </Field.Root>
            <Button type="submit" colorScheme="green" loading={loading}>
              Kayıt Ol
            </Button>
            <Text color="gray.600" fontSize="sm" textAlign="center">
              Zaten hesabın var mı?{" "}
              <Button
                variant="ghost"
                colorScheme="green"
                onClick={() => router.push("/auth/login")}
              >
                Giriş yap
              </Button>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
