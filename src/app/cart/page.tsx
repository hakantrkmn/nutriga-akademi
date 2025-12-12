"use client";

import ContractModal from "@/components/modals/ContractModal";
import OrderConfirmationModal from "@/components/modals/OrderConfirmationModal";
import PreInfoModal from "@/components/modals/PreInfoModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    loading,
    subtotal,
    discount,
    totalWithDiscount,
    updateQuantity,
    removeItem,
  } = useCart();
  const { isAuthenticated } = useAuth();
  // Payment result mesajını göster ve localStorage'dan adres bilgilerini yükle
  useEffect(() => {
    // Query parameter kontrolü
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("payment");

    if (paymentStatus === "failed") {
      toaster.error("Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.");
      // Query parameter'ı temizle
      const url = new URL(window.location.href);
      url.searchParams.delete("payment");
      window.history.replaceState({}, "", url.toString());
    }

    // localStorage'dan adres bilgilerini yükle
    const savedAddressData = localStorage.getItem("checkoutAddressData");
    if (savedAddressData) {
      try {
        const addressData = JSON.parse(savedAddressData);
        setBillingAddress(addressData.billingAddress || "");
        setBillingCity(addressData.billingCity || "");
        setBillingCountry(addressData.billingCountry || "Türkiye");
        setBillingZipCode(addressData.billingZipCode || "");
        setIsTurkishCitizen(addressData.isTurkishCitizen || false);
        setIdentityNumber(addressData.identityNumber || "");
        console.log("Adres bilgileri localStorage'dan yüklendi");
      } catch (error) {
        console.error("localStorage adres bilgileri parse edilemedi:", error);
      }
    }
  }, []);

  const [contractAccepted, setContractAccepted] = useState(false);
  const [preInfoAccepted, setPreInfoAccepted] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [preInfoModalOpen, setPreInfoModalOpen] = useState(false);
  const [orderConfirmationModalOpen, setOrderConfirmationModalOpen] =
    useState(false);

  // Address form state
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("Türkiye");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [isTurkishCitizen, setIsTurkishCitizen] = useState(false);
  const [identityNumber, setIdentityNumber] = useState("");

  // Adres bilgilerini localStorage'a kaydet
  const saveAddressToLocalStorage = () => {
    const addressData = {
      billingAddress,
      billingCity,
      billingCountry,
      billingZipCode,
      isTurkishCitizen,
      identityNumber,
    };
    localStorage.setItem("checkoutAddressData", JSON.stringify(addressData));
    console.log("Adres bilgileri localStorage'a kaydedildi");
  };

  // Form validation
  const isAddressFormValid =
    billingAddress.trim() !== "" &&
    billingCity.trim() !== "" &&
    billingCountry.trim() !== "" &&
    (!isTurkishCitizen || (isTurkishCitizen && identityNumber.trim() !== ""));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sepet</h1>
          <p className="text-gray-600">
            Ürünlerini gözden geçir ve satın almaya geç
          </p>
        </div>

        {/* Discount Info */}
        {discount > 0 && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Tebrikler! İndirim Kazandınız
                  </h3>
                  <p className="text-sm text-green-700">
                    4 adet ve üstünde her adet için 100 TL indirim{" "}
                    {items.some((it) => it.quantity === 10) && (
                      <span className="font-bold">
                        (+10 adet özel 300 TL ekstra)
                      </span>
                    )}{" "}
                    - Toplam <span className="font-bold">₺{discount}</span>{" "}
                    indirim kazandınız!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cart Items */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              {loading && <p>Yükleniyor...</p>}
              {!loading && items.length === 0 && (
                <p className="text-gray-500">Sepetin boş.</p>
              )}
              {!loading &&
                items.map((it) => (
                  <div
                    key={it.id}
                    className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between w-full"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 md:w-24 h-12 md:h-18 bg-gray-50 rounded-md overflow-hidden">
                        <Image
                          src={
                            it.education?.imageUrl ||
                            "/images/egitim-default.jpg"
                          }
                          alt={it.education?.title || "Eğitim"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-1 min-w-0 flex-1">
                        <h3
                          className="font-medium text-gray-800 line-clamp-2"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                        >
                          {it.education?.title}
                        </h3>
                        <Badge
                          className="text-xs"
                          style={{
                            color: "var(--accent)",
                            backgroundColor: "rgba(var(--accent-rgb), 0.12)",
                          }}
                        >
                          {it.education?.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex gap-3 items-center justify-between md:justify-end flex-wrap w-full md:w-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary hover:bg-primary/10"
                          onClick={() =>
                            updateQuantity(it.id, Math.max(1, it.quantity - 1))
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          value={it.quantity}
                          readOnly
                          className="w-14 md:w-16 text-center px-0"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary hover:bg-primary/10"
                          onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right min-w-[96px]">
                        <span className="font-semibold text-gray-900">
                          ₺{Number(it.education?.price ?? 0) * it.quantity}
                        </span>
                        {it.quantity >= 4 && (
                          <div className="text-xs text-green-600 font-medium">
                            İndirimli!
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(it.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Address Form */}
        <Card className="bg-card border-border">
          <CardHeader className="bg-card">
            <CardTitle className="text-foreground flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Teslimat ve Fatura Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Fatura Adresi
                </h3>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="billingAddress" className="text-foreground">
                      Adres *
                    </Label>
                    <Input
                      id="billingAddress"
                      placeholder="Örnek: Kadıköy Mahallesi, İstanbul Cad. No:123"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      onBlur={saveAddressToLocalStorage}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="billingCity" className="text-foreground">
                        Şehir *
                      </Label>
                      <Input
                        id="billingCity"
                        placeholder="İstanbul"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        onBlur={saveAddressToLocalStorage}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="billingZipCode"
                        className="text-foreground"
                      >
                        Posta Kodu
                      </Label>
                      <Input
                        id="billingZipCode"
                        placeholder="34700"
                        value={billingZipCode}
                        onChange={(e) => setBillingZipCode(e.target.value)}
                        onBlur={saveAddressToLocalStorage}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billingCountry" className="text-foreground">
                      Ülke *
                    </Label>
                    <Select
                      value={billingCountry}
                      onValueChange={(value) => {
                        setBillingCountry(value);
                        // Kısa bir timeout ile state güncellemesini bekle ve sonra kaydet
                        setTimeout(saveAddressToLocalStorage, 0);
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Ülke seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Türkiye">Türkiye</SelectItem>
                        <SelectItem value="Almanya">Almanya</SelectItem>
                        <SelectItem value="ABD">
                          Amerika Birleşik Devletleri
                        </SelectItem>
                        <SelectItem value="İngiltere">İngiltere</SelectItem>
                        <SelectItem value="Fransa">Fransa</SelectItem>
                        <SelectItem value="Diğer">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isTurkishCitizen"
                      checked={isTurkishCitizen}
                      onCheckedChange={(checked) => {
                        setIsTurkishCitizen(checked as boolean);
                        if (!checked) {
                          setIdentityNumber("");
                        }
                        // Kısa bir timeout ile state güncellemesini bekle ve sonra kaydet
                        setTimeout(saveAddressToLocalStorage, 0);
                      }}
                    />
                    <Label
                      htmlFor="isTurkishCitizen"
                      className="text-sm text-muted-text cursor-pointer"
                    >
                      TR vatandaşıyım (TC Kimlik No zorunlu)
                    </Label>
                  </div>

                  {isTurkishCitizen && (
                    <div>
                      <Label
                        htmlFor="identityNumber"
                        className="text-foreground"
                      >
                        TC Kimlik Numarası *
                      </Label>
                      <Input
                        id="identityNumber"
                        placeholder="11 haneli TC Kimlik No"
                        value={identityNumber}
                        onChange={(e) =>
                          setIdentityNumber(
                            e.target.value.replace(/\D/g, "").slice(0, 11)
                          )
                        }
                        onBlur={saveAddressToLocalStorage}
                        className="mt-1"
                        maxLength={11}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address - Dijital ürün için aynı */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Teslimat Adresi
                </h3>
                <div className="p-4 bg-info-light border border-info rounded-lg">
                  <div className="flex items-center gap-2 text-info-text">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">Bilgi:</span>
                  </div>
                  <p className="text-sm text-info-text mt-1">
                    Dijital eğitim ürünleri için teslimat adresi fatura adresi
                    ile aynıdır. Eğitimlerinize erişim e-posta adresinize
                    gönderilecektir.
                  </p>
                </div>
              </div>
            </div>

            {!isAddressFormValid && (
              <div className="mt-4 p-3 bg-error-light border border-error rounded-lg">
                <p className="text-sm text-error">
                  Lütfen zorunlu alanları doldurun: Adres, Şehir, Ülke
                  {isTurkishCitizen && " ve TC Kimlik Numarası"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Ara toplam</span>
                <span className="font-semibold">₺{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">
                    Toplu Alım İndirimi
                    {items.some((it) => it.quantity === 10) && (
                      <span className="text-xs block text-green-500">
                        (10 adet özel +300 TL dahil)
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-green-600">
                    -₺{discount}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">KDV</span>
                <span className="font-semibold">Dahil</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Toplam</span>
                <span className="font-bold text-primary">
                  ₺{totalWithDiscount}
                </span>
              </div>

              {/* Contract Agreement */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="contract-agreement"
                  checked={contractAccepted}
                  onCheckedChange={(checked) =>
                    setContractAccepted(checked as boolean)
                  }
                />
                <label
                  htmlFor="contract-agreement"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  <ContractModal
                    isOpen={contractModalOpen}
                    onOpenChange={setContractModalOpen}
                    onAccept={() => {
                      setContractAccepted(true);
                      setContractModalOpen(false);
                    }}
                  >
                    <span className="text-primary hover:underline font-medium">
                      Mesafeli Satış Sözleşmesi
                    </span>
                  </ContractModal>
                  &apos;ni okudum ve kabul ediyorum.
                </label>
              </div>

              {/* Pre-Information Form Agreement */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Checkbox
                  id="pre-info-agreement"
                  checked={preInfoAccepted}
                  onCheckedChange={(checked) =>
                    setPreInfoAccepted(checked as boolean)
                  }
                />
                <label
                  htmlFor="pre-info-agreement"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  <PreInfoModal
                    isOpen={preInfoModalOpen}
                    onOpenChange={setPreInfoModalOpen}
                    onAccept={() => {
                      setPreInfoAccepted(true);
                      setPreInfoModalOpen(false);
                    }}
                    subtotal={totalWithDiscount}
                  >
                    <span className="text-primary hover:underline font-medium">
                      Ön Bilgilendirme Formu
                    </span>
                  </PreInfoModal>
                  &apos;nu okudum ve kabul ediyorum.
                </label>
              </div>

              <div className="flex justify-center py-4">
                <Image
                  src="/images/iyzico/iyzico_ile_ode_colored_horizontal.png"
                  alt="Iyzico ile Öde"
                  width={180}
                  height={54}
                  className="object-contain"
                />
              </div>

              <Button
                size="lg"
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                disabled={
                  items.length === 0 ||
                  !contractAccepted ||
                  !preInfoAccepted ||
                  !isAddressFormValid
                }
                onClick={async () => {
                  if (!isAuthenticated) {
                    toaster.success("Satın almak için lütfen giriş yapın");
                    router.push("/auth/login");
                    return;
                  }

                  // Onay modalını aç
                  setOrderConfirmationModalOpen(true);
                }}
              >
                {isAuthenticated ? "Ödemeye Geç" : "Giriş Yap ve Öde"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={orderConfirmationModalOpen}
        onOpenChange={setOrderConfirmationModalOpen}
        onConfirm={() => {
          setOrderConfirmationModalOpen(false);
          // Iyzico ödeme sayfasına yönlendir
          router.push(`/payment?t=${new Date().getTime()}`);
        }}
        onCancel={() => {
          setOrderConfirmationModalOpen(false);
        }}
        items={items}
        subtotal={totalWithDiscount}
      />
    </div>
  );
}
