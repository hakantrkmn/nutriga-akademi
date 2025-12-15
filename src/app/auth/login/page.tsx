"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await signInWithPassword(email, password);
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
        err instanceof Error
          ? err.message
          : "Giriş işlemi sırasında bir hata oluştu.";
      toaster.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 md:px-0 py-10 md:py-16">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Giriş Yap</h1>
          <p className="text-gray-600">Hesabınıza erişin</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@mail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm text-center">
                  Hesabın yok mu?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="text-green-600 hover:text-green-700 p-0 h-auto"
                    onClick={() => router.push("/auth/register")}
                  >
                    Kayıt ol
                  </Button>
                </p>
                <p className="text-gray-600 text-sm text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-green-600 hover:text-green-700 p-0 h-auto"
                    onClick={() => router.push("/auth/forgot-password")}
                  >
                    Şifremi Unuttum
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
