-- Storage bucket ve RLS policies oluşturma
-- Admin kullanıcıların dosya yükleyip silebilmesi için

-- Storage bucket oluştur (eğer yoksa)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-files',
  'public-files',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- RLS zaten etkin, bu satırı kaldırıyoruz

-- Herkesin dosya okuyabilmesi için policy
CREATE POLICY "Public files are viewable by everyone"
ON storage.objects
FOR SELECT
USING (bucket_id = 'public-files');

-- Sadece admin kullanıcıların dosya yükleyebilmesi için policy
CREATE POLICY "Only admins can upload files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'public-files'
  AND public.is_admin_user() = true
);

-- Sadece admin kullanıcıların dosya silebilmesi için policy
CREATE POLICY "Only admins can delete files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'public-files'
  AND public.is_admin_user() = true
);

-- Sadece admin kullanıcıların dosya güncelleyebilmesi için policy
CREATE POLICY "Only admins can update files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'public-files'
  AND public.is_admin_user() = true
)
WITH CHECK (
  bucket_id = 'public-files'
  AND public.is_admin_user() = true
);

-- Storage bucket'ın public olduğunu doğrula
UPDATE storage.buckets
SET public = true
WHERE id = 'public-files';
