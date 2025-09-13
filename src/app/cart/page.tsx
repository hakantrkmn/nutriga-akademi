"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toaster } from "@/components/ui/toaster";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    loading,
    isAuthenticated,
    subtotal,
    updateQuantity,
    removeItem,
    checkout,
  } = useCart();

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
                      <span className="font-semibold text-gray-900 min-w-[96px] text-right">
                        ₺{Number(it.education?.price ?? 0) * it.quantity}
                      </span>

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

        {/* Order Summary */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Ara toplam</span>
                <span className="font-semibold">₺{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">KDV</span>
                <span className="font-semibold">Dahil</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Toplam</span>
                <span className="font-bold text-primary">₺{subtotal}</span>
              </div>
              <Button
                size="lg"
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                disabled={items.length === 0}
                onClick={async () => {
                  if (!isAuthenticated) {
                    toaster.success("Satın almak için lütfen giriş yapın");
                    router.push("/auth/login");
                    return;
                  }
                  const result = await checkout();
                  if (result.success) {
                    router.push("/"); // Redirect to home or a success page
                  }
                }}
              >
                {isAuthenticated ? "Satın Almaya Geç" : "Giriş Yap ve Satın Al"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
