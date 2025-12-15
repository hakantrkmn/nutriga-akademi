"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Redirect URL'i dinamik olarak oluştur
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const redirectTo = `${baseUrl}/auth/reset-password`;

      const { error } = await resetPassword(email, redirectTo);
      if (error) throw error;

      setSent(true);
      toaster.success("Şifre sıfırlama linki e-posta adresinize gönderildi!");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Şifre sıfırlama işlemi sırasında bir hata oluştu.";
      toaster.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 md:px-0 py-10 md:py-16">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Şifremi Unuttum
          </h1>
          <p className="text-gray-600">
            {sent
              ? "E-posta adresinizi kontrol edin"
              : "E-posta adresinize şifre sıfırlama linki göndereceğiz"}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            {sent ? (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Şifre sıfırlama linki e-posta adresinize gönderildi. Lütfen
                    e-posta kutunuzu kontrol edin ve linke tıklayarak yeni
                    şifrenizi belirleyin.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                >
                  Yeni E-posta Gönder
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-green-600 hover:text-green-700"
                  onClick={() => router.push("/auth/login")}
                >
                  Giriş sayfasına dön
                </Button>
              </div>
            ) : (
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
                  <p className="text-sm text-gray-500">
                    Kayıtlı e-posta adresinizi girin, size şifre sıfırlama linki
                    göndereceğiz.
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Gönderiliyor..." : "Şifre Sıfırlama Linki Gönder"}
                </Button>
                <p className="text-gray-600 text-sm text-center">
                  Şifrenizi hatırladınız mı?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="text-green-600 hover:text-green-700 p-0 h-auto"
                    onClick={() => router.push("/auth/login")}
                  >
                    Giriş yap
                  </Button>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

