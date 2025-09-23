-- =================================================================
-- Adım 2: Egitimler Tablosu ve Politikaları
-- =================================================================

-- Tabloyu oluştur
CREATE TABLE public.egitimler (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content jsonb,
  image_url text,
  slug text UNIQUE NOT NULL,
  price numeric(10,2),
  sales_count integer DEFAULT 0,
  category text NOT NULL,
  level text NOT NULL,
  instructor text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index'leri ekle
CREATE INDEX idx_egitimler_slug ON public.egitimler(slug);
CREATE INDEX idx_egitimler_created_at ON public.egitimler(created_at);

-- updated_at trigger'ını bağla
CREATE TRIGGER handle_egitimler_updated_at
    BEFORE UPDATE ON public.egitimler
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS (Row Level Security) aktifleştir
ALTER TABLE public.egitimler ENABLE ROW LEVEL SECURITY;

-- Politikaları Oluştur
-- 1. Herkese okuma izni
CREATE POLICY "Eğitimler herkese okunabilir"
ON public.egitimler
FOR SELECT USING (true);

-- 2. Admin'e ekleme izni
CREATE POLICY "Admin eğitim ekleyebilir"
ON public.egitimler
FOR INSERT WITH CHECK (public.is_admin_user() = true);

-- 3. Admin'e güncelleme izni
CREATE POLICY "Admin eğitim güncelleyebilir"
ON public.egitimler
FOR UPDATE USING (public.is_admin_user() = true);

-- 4. Admin'e silme izni
CREATE POLICY "Admin eğitim silebilir"
ON public.egitimler
FOR DELETE USING (public.is_admin_user() = true);
