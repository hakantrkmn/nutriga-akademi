import { toaster } from "@/components/ui/toaster";
import { cartApi, CartItemDTO } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

export function useCart() {
  const [items, setItems] = useState<CartItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClient();

  const loadCart = async () => {
    setLoading(true);
    const res = await cartApi.get();
    if (res.success && res.data) setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Number(it.education?.price ?? 0);
      return sum + price * it.quantity;
    }, 0);
  }, [items]);

  const updateQuantity = async (id: string, qty: number) => {
    const res = await cartApi.updateQuantity(id, qty);
    if (res.success) {
      await loadCart();
      toaster.success("Sepet güncellendi");
      return true;
    } else {
      toaster.error("Sepet güncellenirken bir hata oluştu");
      return false;
    }
  };

  const removeItem = async (id: string) => {
    const res = await cartApi.remove(id);
    if (res.success) {
      await loadCart();
      toaster.success("Ürün sepetten kaldırıldı");
      return true;
    } else {
      toaster.error("Ürün kaldırılırken bir hata oluştu");
      return false;
    }
  };

  const checkout = async () => {
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
    updateQuantity,
    removeItem,
    checkout,
    loadCart,
  };
}
