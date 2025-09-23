-- =================================================================
-- Adım 1: Yardımcı ve Merkezi Fonksiyonlar
-- Bu dosya, diğer migration'lar tarafından kullanılacak olan
-- genel fonksiyonları tanımlar.
-- =================================================================

-- 1. Generic updated_at trigger fonksiyonu
--    Tüm tablolardaki 'updated_at' sütununu otomatik günceller.
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Merkezi Admin Kontrol Fonksiyonu
--    Tüm admin yetkilendirme işlemleri bu fonksiyonu kullanır.
--    Admin e-postası değişirse, sadece burayı güncellemek yeterlidir.
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email = 'nutrigaakademi@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Admin Bilgilerini Getiren Fonksiyon (Opsiyonel, mevcut kodda vardı)
CREATE OR REPLACE FUNCTION public.get_admin_info()
RETURNS TABLE (
  id uuid,
  email text,
  created_at timestamp with time zone
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    u.id,
    u.email,
    u.created_at
  FROM auth.users u
  WHERE u.email = 'nutrigaakademi@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
