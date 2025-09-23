-- =================================================================
-- Adım 5: Sepet Tablosu (cart_items) ve Politikaları
-- =================================================================

-- Tabloyu oluştur
CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  education_id uuid REFERENCES public.egitimler(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Index'leri ekle
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_cart_items_education_id ON public.cart_items(education_id);
-- Not: idx_cart_items_user_education_unique index'i sonradan kaldırıldığı için
-- bu temiz şemaya hiç eklenmemiştir.

-- RLS (Row Level Security) aktifleştir
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Politikaları Oluştur (Kullanıcılar sadece kendi sepetlerini yönetebilir)
CREATE POLICY "Kullanıcılar kendi sepetlerini görebilir" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi sepetlerine ekleme yapabilir" ON public.cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi sepetlerini güncelleyebilir" ON public.cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi sepetlerinden silebilir" ON public.cart_items
  FOR DELETE USING (auth.uid() = user_id);
