"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface OrderItem {
  title: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface OrderSummary {
  items: OrderItem[];
  totalAmount: number;
}

interface CheckoutData {
  paymentId: string;
  token: string;
  checkoutFormContent: string;
  paymentPageUrl: string;
  payWithIyzicoPageUrl: string;
  tokenExpireTime: number;
  orderSummary: OrderSummary;
}

export default function PaymentPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Iyzipay formunu güvenli şekilde inject eden fonksiyon
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

        // HTML içeriğini güvenli şekilde inject et
        placeholder.innerHTML = formContent;

        // Script'leri bul ve yeniden çalıştır
        const scripts = placeholder.querySelectorAll("script");

        if (scripts.length === 0) {
          // Script yoksa direkt resolve et
          resolve();
          return;
        }

        let loadedScripts = 0;
        const totalScripts = scripts.length;

        const onScriptLoad = () => {
          loadedScripts++;
          if (loadedScripts >= totalScripts) {
            // Tüm script'ler yüklendi, biraz bekle sonra resolve et
            setTimeout(() => {
              resolve();
            }, 500);
          }
        };

        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");

          // Attribute'ları kopyala
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });

          // Script içeriğini kopyala
          if (oldScript.textContent) {
            newScript.textContent = oldScript.textContent;
          }

          // Load event listener ekle
          newScript.addEventListener("load", onScriptLoad);
          newScript.addEventListener("error", () => {
            console.warn(
              "Script yükleme hatası:",
              newScript.src || "inline script"
            );
            onScriptLoad(); // Hata olsa da devam et
          });

          // Eski script'i yenisiyle değiştir
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        });

        // Inline script'ler için timeout fallback
        setTimeout(() => {
          if (loadedScripts < totalScripts) {
            console.warn("Bazı script'ler yüklenmedi, devam ediliyor...");
            resolve();
          }
        }, 3000);
      } catch (error) {
        reject(error);
      }
    });
  };

  const checkoutInitialized = useRef(false);

  useEffect(() => {
    if (checkoutInitialized.current) {
      console.log("Checkout already initialized, skipping");
      return;
    }

    checkoutInitialized.current = true;

    const initializeCheckout = async () => {
      setLoading(true);
      try {
        console.log("Ödeme formu başlatılıyor...");

        // Adres bilgilerini localStorage'dan al
        const addressData = localStorage.getItem("checkoutAddressData");
        if (!addressData) {
          throw new Error(
            "Adres bilgileri bulunamadı. Lütfen sepet sayfasına geri dönün."
          );
        }

        // Sepetten checkout başlat
        const response = await fetch("/api/payments/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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

    initializeCheckout();
  }, []);

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form - Iyzico */}
          <div className="lg:col-span-2">
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
                    {/* Iyzico'nun checkout form div'i */}
                    <div
                      id="iyzipay-checkout-form"
                      className="responsive"
                    ></div>

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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardHeader className="bg-card">
                <CardTitle className="text-foreground">Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Ürünler */}
                  <div className="space-y-2">
                    {checkoutData?.orderSummary?.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-foreground">
                            {item.title}
                          </div>
                          <div className="text-muted-text">
                            {item.quantity} adet × ₺{item.unitPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-medium text-foreground">
                          ₺{item.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Toplam */}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center font-semibold text-foreground">
                      <span>Toplam:</span>
                      <span>
                        ₺{checkoutData?.orderSummary?.totalAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button
                      onClick={handleBackToCart}
                      variant="outline"
                      className="w-full"
                    >
                      Sepete Dön
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                    <p className="font-medium mb-1">⚠️ Önemli Not:</p>
                    <p>
                      Ödeme tamamlandıktan sonra otomatik olarak eğitimlere
                      erişim sağlayacaksınız.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
