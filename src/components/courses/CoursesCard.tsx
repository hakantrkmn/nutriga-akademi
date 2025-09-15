import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { EgitimCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default function EgitimCard({ egitim }: EgitimCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    const success = await addItem(egitim.id);
    setAdding(false);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <Link href={`/egitimler/${egitim.slug}`}>
      <Card className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all h-full">
        <div className="relative">
          <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
            <Image
              src={egitim.imageUrl || "/images/egitim-default.jpg"}
              alt={egitim.title}
              width={400}
              height={200}
              loading="lazy"
              className="w-full h-48 object-contain bg-gray-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <Badge className="absolute top-3 right-3 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-md">
            {egitim.level || "Seviye"}
          </Badge>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center w-full">
              <Badge className="text-primary-600 bg-primary-50 text-xs px-2 py-1 rounded-md">
                {egitim.category}
              </Badge>
              <span className="text-xs text-gray-500">
                {egitim.salesCount} kişi aldı
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 leading-tight line-clamp-2">
              {egitim.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
              {egitim.description}
            </p>

            <div className="space-y-3 w-full">
              <div className="flex justify-between items-center w-full text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  <span>{egitim.instructor || "Eğitmen"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-primary-600">
                    ₺{egitim.price?.toString()}
                  </span>
                  <span className="text-xs text-gray-500">
                    Tek seferlik ödeme
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg px-4">
                    Detayları Gör
                  </Button>

                  <Button
                    variant={added ? "default" : "outline"}
                    className={`text-sm rounded-lg px-4 ${
                      added
                        ? "bg-primary-100 text-primary-800 border-primary-200"
                        : "border-primary-600 text-primary-600 hover:bg-primary-50"
                    }`}
                    disabled={adding}
                    onClick={handleAddToCart}
                  >
                    <FiShoppingCart className="mr-2 w-4 h-4" />
                    {adding
                      ? "Ekleniyor..."
                      : added
                      ? "Eklendi"
                      : "Sepete Ekle"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
