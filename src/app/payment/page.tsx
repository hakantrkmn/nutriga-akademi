"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CheckoutData {
  paymentId: string;
  token: string;
  checkoutFormContent: string;
  paymentPageUrl: string;
  payWithIyzicoPageUrl: string;
  tokenExpireTime: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  // Iyzipay formunu inject eden basit fonksiyon
  const injectIyzicoForm = (formContent: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const placeholder = document.getElementById("iyzipay-checkout-form");
        if (!placeholder) {
          reject(new Error("Form placeholder bulunamadı"));
          return;
        }

        // Önceki içeriği temizle
        placeholder.innerHTML = "";

        // HTML içeriğini direkt inject et
        placeholder.innerHTML = formContent;

        // Script'leri çalıştır
        const scripts = placeholder.querySelectorAll("script");
        scripts.forEach((script) => {
          const newScript = document.createElement("script");
          Array.from(script.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          if (script.textContent) {
            newScript.textContent = script.textContent;
          }
          script.parentNode?.replaceChild(newScript, script);
        });

        // Formun yüklenmesi için bekleme gereksiz, hemen resolve et
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const cleanupIyzico = useCallback(() => {
    console.log("Cleaning up previous Iyzico script and state...");

    // 1. Manually find and remove the Iyzico iframe if it exists
    const iframe = document.getElementById("iyzi-checkout-form");
    if (iframe) {
      console.log("Removing Iyzico iframe...");
      iframe.remove();
    }

    // 2. Clear the placeholder content
    const placeholder = document.getElementById("iyzipay-checkout-form");
    if (placeholder) {
      placeholder.innerHTML = "";
    }

    // 3. Remove the bundle.js script from the head
    const scripts = document.head.querySelectorAll(
      'script[src*="iyzipay.com/checkoutform/v2/bundle.js"]'
    );
    scripts.forEach((script) => {
      console.log("Removing script:", (script as HTMLScriptElement).src);
      script.remove();
    });

    // 4. Reset the global iyziInit object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).iyziInit) {
      console.log("Resetting window.iyziInit");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).iyziInit = undefined;
    }
  }, []);

  useEffect(() => {
    const initializeCheckout = async () => {
      cleanupIyzico(); // Clean up before initializing

      setLoading(true);
      setError(null);
      try {
        console.log("Ödeme formu başlatılıyor...");

        // Adres bilgilerini localStorage'dan al
        const addressData = localStorage.getItem("checkoutAddressData");
        if (!addressData) {
          throw new Error(
            "Adres bilgileri bulunamadı. Lütfen sepet sayfasına geri dönün."
          );
        }

        // Sepet öğelerini localStorage'dan al
        const cartData = localStorage.getItem("nutriga_cart");
        if (!cartData) {
          throw new Error(
            "Sepet bilgileri bulunamadı. Lütfen sepet sayfasına geri dönün."
          );
        }

        const cartItems = JSON.parse(cartData);
        if (!cartItems || cartItems.length === 0) {
          throw new Error("Sepetiniz boş. Lütfen sepet sayfasına geri dönün.");
        }

        console.log("Payment başlatılıyor - localStorage verileri:", cartItems);

        // Sepetten checkout başlat - hem sepet hem adres bilgilerini gönder
        const response = await fetch("/api/payments/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: cartItems,
            addressData: JSON.parse(addressData),
          }),
        });

        const result = await response.json();

        console.log("Checkout API Response:", {
          status: response.status,
          ok: response.ok,
          hasContent: !!result.data?.checkoutFormContent,
        });

        if (!response.ok || !result.success) {
          console.error("Checkout API Error:", result);
          throw new Error(
            result.error || `Ödeme başlatılamadı (${response.status})`
          );
        }

        if (!result.data?.checkoutFormContent) {
          throw new Error("Ödeme formu içeriği alınamadı");
        }

        setCheckoutData(result.data);

        console.log("Checkout verisi alındı, form injection bekleniyor...");
      } catch (err) {
        console.error("Checkout initialization error:", err);
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
        toast.error("Ödeme işlemi başlatılamadı");
      } finally {
        setLoading(false);
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      initializeCheckout();
    }

    // Cleanup on unmount
    return () => {
      cleanupIyzico();
    };
  }, [cleanupIyzico]);

  // Checkout data değiştiğinde formu inject et
  useEffect(() => {
    if (checkoutData?.checkoutFormContent) {
      console.log("Form injection başlatılıyor...");
      injectIyzicoForm(checkoutData.checkoutFormContent)
        .then(() => {
          console.log("Ödeme formu başarıyla yüklendi");
        })
        .catch((err) => {
          console.error("Form injection hatası:", err);
          setError("Ödeme formu yüklenirken hata oluştu");
          toast.error("Ödeme formu yüklenirken hata oluştu");
        });
    }
  }, [checkoutData]);

  const handleBackToCart = () => {
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="site-root site-theme-sage min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg font-medium text-foreground">
                Ödeme hazırlanıyor...
              </p>
              <p className="text-sm text-muted-text text-center">
                Lütfen sayfayı kapatmayın, ödeme formu yükleniyor.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="site-root site-theme-sage min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="h-12 w-12 text-error" />
              <h2 className="text-xl font-semibold text-error">
                Ödeme Başlatılamadı
              </h2>
              <p className="text-center text-muted-text">{error}</p>
              <Button
                onClick={handleBackToCart}
                className="w-full bg-primary hover:bg-primary-hover"
              >
                Sepete Dön
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="site-root site-theme-sage">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-card border-border">
          <CardHeader className="bg-card">
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Ödeme Bilgileri</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {checkoutData?.checkoutFormContent ? (
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/iyzico/iyzico_ile_ode_colored_horizontal.png"
                    alt="Iyzico ile Öde"
                    width={200}
                    height={60}
                    className="object-contain"
                  />
                </div>
                {/* Iyzico'nun checkout form div'i */}
                <div id="iyzipay-checkout-form" className="responsive"></div>

                <div className="text-sm text-muted-text bg-info-light p-4 rounded-lg border border-info">
                  <p className="font-medium mb-2 text-info-text">
                    🔒 Güvenli Ödeme
                  </p>
                  <ul className="space-y-1">
                    <li>• 256-bit SSL şifreleme ile korunmaktadır</li>
                    <li>• Kredi kartı bilgileriniz kaydedilmez</li>
                    <li>• 3D Secure güvenlik sistemi kullanılmaktadır</li>
                  </ul>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleBackToCart}
                    variant="outline"
                    className="w-full max-w-xs"
                  >
                    Sepete Dön
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p>Ödeme formu yükleniyor...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
