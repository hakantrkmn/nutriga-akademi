"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const validateToken = async () => {
      try {
        // 0. ÖNCE onAuthStateChange subscription'ını kur (token işlenmeden önce)
        const {
          data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state change event:", event, session);

          if (event === "PASSWORD_RECOVERY") {
            // Token geçerli, şifre sıfırlama moduna geç
            console.log("PASSWORD_RECOVERY event alındı, token geçerli");
            setIsValidToken(true);
            setValidating(false);
          } else if (event === "SIGNED_IN" && session) {
            // Session oluşturuldu (recovery token ile)
            console.log("SIGNED_IN event alındı, session var");
            setIsValidToken(true);
            setValidating(false);
          } else if (event === "TOKEN_REFRESHED" && session) {
            // Token yenilendi
            console.log("TOKEN_REFRESHED event alındı");
            setIsValidToken(true);
            setValidating(false);
          }
        });

        subscription = authSubscription;

        // 1. Önce URL'deki error parametrelerini kontrol et
        if (typeof window !== "undefined") {
          // Query parameter'dan error kontrolü
          const error = searchParams.get("error");
          const errorDescription = searchParams.get("error_description");

          // Hash'ten error kontrolü
          const hash = window.location.hash.substring(1);
          const hashParams = new URLSearchParams(hash);
          const hashError = hashParams.get("error");
          const hashErrorDescription = hashParams.get("error_description");

          if (error || hashError) {
            setIsValidToken(false);
            const desc = errorDescription || hashErrorDescription;
            setErrorMessage(
              desc
                ? decodeURIComponent(desc.replace(/\+/g, " "))
                : "Şifre sıfırlama linki geçersiz veya süresi dolmuş. Lütfen yeni bir link isteyin."
            );
            setValidating(false);
            return;
          }

          // 2. Query parameter'dan token varsa (Supabase verify endpoint'inden geliyorsa)
          // ÖNEMLİ: Bu işlemi sayfa yüklenir yüklenmez yapmalıyız
          const token = searchParams.get("token");
          const type = searchParams.get("type");

          if (token && type === "recovery") {
            console.log(
              "Token query parameter'dan alındı, hash'e çevriliyor..."
            );

            // Token'ı hash fragment'e çevir
            // Önce query parameter'ları temizle, sonra hash ekle
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete("token");
            currentUrl.searchParams.delete("type");
            currentUrl.hash = `#access_token=${token}&type=${type}`;

            // URL'i güncelle (sayfayı yenilemeden)
            window.history.replaceState({}, "", currentUrl.toString());

            // Supabase'in token'ı işlemesi için biraz bekle
            // onAuthStateChange event'ini bekleyelim
            timeoutId = setTimeout(async () => {
              const {
                data: { session },
              } = await supabase.auth.getSession();

              if (session) {
                console.log("Session oluşturuldu (query param'dan)");
                setIsValidToken(true);
                setValidating(false);
              } else {
                console.log(
                  "Session oluşturulamadı, event handler bekleniyor..."
                );
                // Event handler zaten kuruldu, o halledecek
              }
            }, 500);
            return; // validateToken'ı bitir, event handler veya timeout halledecek
          }
        }

        // 4. Hash'te token varsa, Supabase'in işlemesi için biraz bekle
        if (typeof window !== "undefined") {
          const hash = window.location.hash;
          if (
            hash &&
            (hash.includes("access_token") || hash.includes("type=recovery"))
          ) {
            console.log("Hash'te token bulundu, Supabase işliyor...");
            // Supabase otomatik olarak hash'ten token'ı okuyacak
            // onAuthStateChange event'ini bekleyelim
            timeoutId = setTimeout(async () => {
              const {
                data: { session },
              } = await supabase.auth.getSession();

              if (session) {
                console.log("Session oluşturuldu");
                setIsValidToken(true);
                setValidating(false);
              }
            }, 1000);
            return; // validateToken'ı bitir, event handler halledecek
          }
        }

        // 4. Mevcut session'ı kontrol et
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setIsValidToken(true);
          setValidating(false);
        } else {
          // Session yoksa, hash'te token olup olmadığını kontrol et
          if (typeof window !== "undefined") {
            const hash = window.location.hash;
            if (
              hash &&
              (hash.includes("access_token") || hash.includes("type=recovery"))
            ) {
              // Token var ama henüz işlenmemiş, biraz bekle
              timeoutId = setTimeout(() => {
                validateToken();
              }, 1000);
              return;
            }
          }

          // Token yok
          setIsValidToken(false);
          setErrorMessage(
            "Şifre sıfırlama linki geçersiz veya süresi dolmuş. Lütfen yeni bir link isteyin."
          );
          setValidating(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsValidToken(false);
        setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
        setValidating(false);
      }
    };

    validateToken();

    // Cleanup function
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [supabase.auth, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (password.length < 6) {
      toaster.error("Şifre en az 6 karakter olmalıdır");
      return;
    }

    if (password !== confirmPassword) {
      toaster.error("Şifreler eşleşmiyor");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toaster.success("Şifreniz başarıyla güncellendi!");

      // Kısa bir gecikme sonrası login sayfasına yönlendir
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Şifre güncellenirken bir hata oluştu.";
      toaster.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="max-w-md mx-auto px-4 md:px-0 py-10 md:py-16">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Yeni Şifre Belirle
            </h1>
            <p className="text-gray-600">Doğrulanıyor...</p>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600">Lütfen bekleyin...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="max-w-md mx-auto px-4 md:px-0 py-10 md:py-16">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Yeni Şifre Belirle
            </h1>
            <p className="text-gray-600">
              Şifre sıfırlama linki geçersiz veya süresi dolmuş
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 text-center">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    {errorMessage ||
                      "Bu şifre sıfırlama linki geçersiz veya süresi dolmuş. Lütfen yeni bir şifre sıfırlama linki isteyin."}
                  </p>
                </div>
                <Button
                  type="button"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => router.push("/auth/forgot-password")}
                >
                  Yeni Link İste
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
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 md:px-0 py-10 md:py-16">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Yeni Şifre Belirle
          </h1>
          <p className="text-gray-600">
            Hesabınız için yeni bir şifre belirleyin
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Yeni Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <p className="text-sm text-gray-500">
                  Şifre en az 6 karakter olmalıdır
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
              </Button>
              <p className="text-gray-600 text-sm text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-green-600 hover:text-green-700 p-0 h-auto"
                  onClick={() => router.push("/auth/login")}
                >
                  Giriş sayfasına dön
                </Button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto px-4 md:px-0 py-10 md:py-16">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Yeni Şifre Belirle
              </h1>
              <p className="text-gray-600">Yükleniyor...</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-gray-600">Lütfen bekleyin...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
