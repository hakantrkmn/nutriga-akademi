"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartItemDTO } from "@/lib/api";
import Image from "next/image";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  items: CartItemDTO[];
  subtotal: number;
}

export default function OrderConfirmationModal({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  items,
  subtotal,
}: OrderConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Sipariş Onayı
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Satın alacağınız ürünleri gözden geçirin ve onaylayın.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Ürün Listesi */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Sipariş Detayları:</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden">
                    <Image
                      src={
                        item.education?.imageUrl || "/images/egitim-default.jpg"
                      }
                      alt={item.education?.title || "Eğitim"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {item.education?.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.education?.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {item.quantity} adet
                    </p>
                    <p className="text-sm text-gray-600">
                      ₺{Number(item.education?.price ?? 0) * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toplam */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Toplam Tutar:
              </span>
              <span className="text-xl font-bold text-primary">
                ₺{subtotal}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            İptal
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Onayla ve Öde
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
