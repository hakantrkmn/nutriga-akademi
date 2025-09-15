import { toaster } from "@/components/ui/toaster";
import { cartApi, CartItemDTO } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { Egitim } from "@/types";
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

const clearLocalCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
};

export function useCart() {
  const [items, setItems] = useState<CartItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClient();

  // Sepeti yükle
  const loadCart = useCallback(async () => {
    setLoading(true);
    if (isAuthenticated) {
      // Giriş yapmışsa Redis'ten yükle
      const res = await cartApi.get();
      if (res.success && res.data) setItems(res.data);
    } else {
      // Giriş yapmamışsa localStorage'dan yükle ve eğitim detaylarını getir
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
    }
    setLoading(false);
  }, [isAuthenticated]);

  // Giriş durumunda değişiklik olduğunda sepeti yönet
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const wasAuthenticated = isAuthenticated;
      setIsAuthenticated(!!user);

      // Giriş yapıldıysa localStorage'dan Redis'e taşı
      if (!!user && !wasAuthenticated) {
        const localItems = getLocalCart();
        if (localItems.length > 0) {
          // Her ürünü Redis'e ekle
          for (const item of localItems) {
            await cartApi.add(item.educationId, item.quantity);
          }
          clearLocalCart();
          toaster.success("Sepetiniz kaydedildi");
        }
      }
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const wasAuthenticated = isAuthenticated;
      setIsAuthenticated(!!session?.user);

      // Giriş yapıldıysa localStorage'dan Redis'e taşı
      if (!!session?.user && !wasAuthenticated) {
        const localItems = getLocalCart();
        if (localItems.length > 0) {
          // Her ürünü Redis'e ekle
          Promise.all(
            localItems.map((item) =>
              cartApi.add(item.educationId, item.quantity)
            )
          ).then(() => {
            clearLocalCart();
            toaster.success("Sepetiniz kaydedildi");
            loadCart();
          });
        }
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [isAuthenticated, loadCart, supabase.auth]);

  // İlk yükleme
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Number(it.education?.price ?? 0);
      return sum + price * it.quantity;
    }, 0);
  }, [items]);

  // Sepete ürün ekle
  const addItem = async (educationId: string, quantity = 1) => {
    if (isAuthenticated) {
      // Giriş yapmışsa Redis'e ekle
      const res = await cartApi.add(educationId, quantity);
      if (res.success) {
        await loadCart();
        toaster.success("Sepete eklendi");
        return true;
      } else {
        toaster.error("Sepete eklenirken bir hata oluştu");
        return false;
      }
    } else {
      // Giriş yapmamışsa localStorage'a ekle
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
      return true;
    }
  };

  const updateQuantity = async (id: string, qty: number) => {
    if (isAuthenticated) {
      // Giriş yapmışsa Redis'te güncelle
      const res = await cartApi.updateQuantity(id, qty);
      if (res.success) {
        await loadCart();
        toaster.success("Sepet güncellendi");
        return true;
      } else {
        toaster.error("Sepet güncellenirken bir hata oluştu");
        return false;
      }
    } else {
      // Giriş yapmamışsa localStorage'ta güncelle
      const localItems = getLocalCart();
      const itemIndex = localItems.findIndex((item) => item.educationId === id);

      if (itemIndex >= 0) {
        if (qty <= 0) {
          localItems.splice(itemIndex, 1);
        } else {
          localItems[itemIndex].quantity = qty;
        }
        setLocalCart(localItems);
        await loadCart();
        toaster.success("Sepet güncellendi");
        return true;
      }
      return false;
    }
  };

  const removeItem = async (id: string) => {
    if (isAuthenticated) {
      // Giriş yapmışsa Redis'ten kaldır
      const res = await cartApi.remove(id);
      if (res.success) {
        await loadCart();
        toaster.success("Ürün sepetten kaldırıldı");
        return true;
      } else {
        toaster.error("Ürün kaldırılırken bir hata oluştu");
        return false;
      }
    } else {
      // Giriş yapmamışsa localStorage'tan kaldır
      const localItems = getLocalCart();
      const filteredItems = localItems.filter(
        (item) => item.educationId !== id
      );
      setLocalCart(filteredItems);
      await loadCart();
      toaster.success("Ürün sepetten kaldırıldı");
      return true;
    }
  };

  const checkout = async () => {
    // Checkout öncesi giriş kontrolü
    if (!isAuthenticated) {
      toaster.error("Satın alma için giriş yapmanız gerekiyor");
      // Burada login/register modal'ını açabiliriz
      return { success: false, error: "Authentication required" };
    }

    try {
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toaster.success(
          data.message || "Satın alma işlemi başarıyla tamamlandı!"
        );
        // API zaten Redis sepetini temizliyor, local state'i de temizle
        setItems([]);
        return { success: true };
      } else {
        toaster.error(`Satın alma başarısız: ${data.error}`);
        return { success: false, error: data.error };
      }
    } catch {
      toaster.error("Satın alma sırasında bir hata oluştu.");
      return { success: false, error: "Network error" };
    }
  };

  return {
    items,
    loading,
    isAuthenticated,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    checkout,
    loadCart,
  };
}
