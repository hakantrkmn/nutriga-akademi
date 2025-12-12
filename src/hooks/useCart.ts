import { toaster } from "@/components/ui/toaster";
import { CartItemDTO } from "@/lib/api";
import { Egitim } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

// LocalStorage için kullanılan tip
interface LocalCartItem {
  educationId: string;
  quantity: number;
  education?: Egitim;
}

// LocalStorage işlemleri
const CART_STORAGE_KEY = "nutriga_cart";

const getLocalCart = (): LocalCartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setLocalCart = (items: LocalCartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export function useCart() {
  const [items, setItems] = useState<CartItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sepeti yükle - her zaman localStorage'dan
  const loadCart = useCallback(async () => {
    setLoading(true);
    const localItems = getLocalCart();
    if (localItems.length > 0) {
      // Eğitim detaylarını API'den getir
      try {
        const res = await fetch("/api/egitimler");
        if (res.ok) {
          const { data: educations } = await res.json();
          const enrichedItems = localItems.map((item) => ({
            id: item.educationId,
            userId: "guest",
            educationId: item.educationId,
            quantity: item.quantity,
            createdAt: new Date().toISOString(),
            education: educations.find(
              (e: Egitim) => e.id === item.educationId
            ),
          }));
          setItems(enrichedItems);
        }
      } catch (error) {
        console.error("Failed to load education details:", error);
        setItems([]);
      }
    } else {
      setItems([]);
    }
    setLoading(false);
  }, []);

  // İlk yükleme
  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Number(it.education?.price ?? 0);
      return sum + price * it.quantity;
    }, 0);
  }, [items]);

  // 4 adet ve üstünde her adet için 100 TL indirim hesaplama
  // 10 adet özel: +300 TL ekstra indirim
  const discount = useMemo(() => {
    return items.reduce((totalDiscount, item) => {
      const { quantity } = item;

      // 4 adet altında indirim yok
      if (quantity < 4) {
        return totalDiscount;
      }

      // Her adet için 100 TL indirim
      let itemDiscount = quantity * 100;

      // 10 adet özel: +300 TL ekstra indirim
      if (quantity === 10) {
        itemDiscount += 300;
      }

      return totalDiscount + itemDiscount;
    }, 0);
  }, [items]);

  // İndirimli toplam
  const totalWithDiscount = useMemo(() => {
    return Math.max(0, subtotal - discount);
  }, [subtotal, discount]);

  // Sepete ürün ekle - sadece localStorage kullan
  const addItem = async (educationId: string, quantity = 1) => {
    setLoading(true);
    const localItems = getLocalCart();
    const existingIndex = localItems.findIndex(
      (item) => item.educationId === educationId
    );

    if (existingIndex >= 0) {
      localItems[existingIndex].quantity += quantity;
    } else {
      localItems.push({ educationId, quantity });
    }

    setLocalCart(localItems);
    await loadCart();
    toaster.success("Sepete eklendi");
    setLoading(false);

    // Sepete ekleme işlemi tamamlandıktan sonra cart sayfasına yönlendir
    router.push("/cart");

    return true;
  };

  const updateQuantity = (id: string, qty: number) => {
    const localItems = getLocalCart();
    const itemIndex = localItems.findIndex((item) => item.educationId === id);

    if (itemIndex >= 0) {
      if (qty <= 0) {
        localItems.splice(itemIndex, 1);
      } else {
        localItems[itemIndex].quantity = qty;
      }
      setLocalCart(localItems);

      // State'i direkt güncelle - API çağrısı yapmaya gerek yok
      setItems((prevItems) => {
        if (qty <= 0) {
          return prevItems.filter((item) => item.id !== id);
        }
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        );
      });

      return true;
    }
    return false;
  };

  const removeItem = (id: string) => {
    const localItems = getLocalCart();
    const filteredItems = localItems.filter((item) => item.educationId !== id);
    setLocalCart(filteredItems);

    // State'i direkt güncelle - API çağrısı yapmaya gerek yok
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    return true;
  };

  return {
    items,
    loading,
    subtotal,
    discount,
    totalWithDiscount,
    addItem,
    updateQuantity,
    removeItem,
  };
}
