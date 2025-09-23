-- =================================================================
-- Adım 9: Supabase Storage Kurulumu
-- =================================================================

-- 1. Storage bucket'ını oluştur (eğer yoksa)
--    Dosya yüklemeleri için genel bir alan.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('public-files', 'public-files', true, 10485760, -- 10MB
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- 2. RLS Politikalarını oluştur
--    storage.objects tablosu için güvenlik kuralları.

-- Herkesin dosyaları görüntüleyebilmesi
CREATE POLICY "Public files are viewable by everyone"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'public-files');

-- Sadece adminlerin dosya yükleyebilmesi
CREATE POLICY "Only admins can upload files"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'public-files' AND public.is_admin_user() = true);

-- Sadece adminlerin dosya güncelleyebilmesi
CREATE POLICY "Only admins can update files"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'public-files' AND public.is_admin_user() = true);

-- Sadece adminlerin dosya silebilmesi
CREATE POLICY "Only admins can delete files"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'public-files' AND public.is_admin_user() = true);
