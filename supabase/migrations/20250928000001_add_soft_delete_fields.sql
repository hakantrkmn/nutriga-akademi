-- =================================================================
-- Migration: Soft Delete Alanları Ekleme
-- Tarih: 2025-09-28
-- Açıklama: Eğitim ve blog tablolarına is_active alanları ekleniyor
-- =================================================================

-- Eğitimler tablosuna is_active alanı ekleme
ALTER TABLE public.egitimler
ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- Blog posts tablosuna is_active alanı ekleme
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- Index'ler ekleme (performans için)
CREATE INDEX IF NOT EXISTS idx_egitimler_is_active ON public.egitimler(is_active);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_active ON public.blog_posts(is_active);

-- RLS politikalarını güncelleme (sadece aktif kayıtları gösterme)
-- Mevcut politikaları kontrol edip güncelleyelim

-- Eğitimler için aktif kayıtlar politikası
DROP POLICY IF EXISTS "Eğitimler herkese okunabilir" ON public.egitimler;
CREATE POLICY "Aktif eğitimler herkese okunabilir"
ON public.egitimler
FOR SELECT USING (is_active = true);

-- Blog için aktif kayıtlar politikası
DROP POLICY IF EXISTS "Blog yazıları herkese okunabilir" ON public.blog_posts;
CREATE POLICY "Aktif blog yazıları herkese okunabilir"
ON public.blog_posts
FOR SELECT USING (is_active = true);

-- Admin'ler hala tüm kayıtları görebilir
CREATE POLICY "Admin tüm eğitimleri görebilir"
ON public.egitimler
FOR SELECT USING (public.is_admin_user() = true);

CREATE POLICY "Admin tüm blog yazıları görebilir"
ON public.blog_posts
FOR SELECT USING (public.is_admin_user() = true);
