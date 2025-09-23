-- =================================================================
-- Adım 3: Blog Yazıları Tablosu ve Politikaları
-- =================================================================

-- Tabloyu oluştur
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content jsonb NOT NULL,
  image_url text,
  slug text UNIQUE NOT NULL,
  category text,
  excerpt text,
  author text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index'leri ekle
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);

-- updated_at trigger'ını bağla
CREATE TRIGGER handle_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS (Row Level Security) aktifleştir
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Politikaları Oluştur
-- 1. Herkese okuma izni
CREATE POLICY "Blog yazıları herkese okunabilir"
ON public.blog_posts
FOR SELECT USING (true);

-- 2. Admin'e ekleme izni
CREATE POLICY "Admin blog yazısı ekleyebilir"
ON public.blog_posts
FOR INSERT WITH CHECK (public.is_admin_user() = true);

-- 3. Admin'e güncelleme izni
CREATE POLICY "Admin blog yazısı güncelleyebilir"
ON public.blog_posts
FOR UPDATE USING (public.is_admin_user() = true);

-- 4. Admin'e silme izni
CREATE POLICY "Admin blog yazısı silebilir"
ON public.blog_posts
FOR DELETE USING (public.is_admin_user() = true);
