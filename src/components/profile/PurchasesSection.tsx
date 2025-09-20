"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";

interface PurchasesSectionProps {
  purchasedItems: CartItem[];
}

export function PurchasesSection({ purchasedItems }: PurchasesSectionProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  if (purchasedItems.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <FiShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Henüz satın aldığınız eğitim bulunmuyor
        </h3>
        <p className="text-gray-600 mb-6">
          Nutriga Akademi&apos;nin zengin eğitim içeriklerini keşfedin ve
          profesyonel gelişiminize katkıda bulunun.
        </p>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
          onClick={() => router.push("/egitimler")}
        >
          Eğitimleri Keşfedin
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Satın Aldığım Eğitimler ({purchasedItems.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {purchasedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            {item.education.imageUrl && (
              <div className="mb-4">
                <Image
                  src={item.education.imageUrl}
                  alt={item.education.title}
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                {item.education.title}
              </h4>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block">Kategori</span>
                  <span className="text-gray-900 font-medium">
                    {item.education.category}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Seviye</span>
                  <span className="text-gray-900 font-medium">
                    {item.education.level}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Eğitmen</span>
                  <span className="text-gray-900 font-medium">
                    {item.education.instructor}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Fiyat</span>
                  <span className="text-green-600 font-semibold">
                    {formatPrice(item.education.price)}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 text-sm block">
                  Satın Alma Tarihi
                </span>
                <span className="text-gray-900 font-medium">
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button
          variant="outline"
          onClick={() => router.push("/egitimler")}
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          Daha Fazla Eğitim Keşfet
        </Button>
      </div>
    </div>
  );
}
