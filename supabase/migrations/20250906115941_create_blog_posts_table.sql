-- Blog posts tablosu oluşturma
CREATE TABLE blog_posts (
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

-- Index'ler ekleme
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX idx_blog_posts_author ON blog_posts(author);

-- RLS (Row Level Security) etkinleştirme
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Herkese okuma izni
CREATE POLICY "Blog yazıları herkese okunabilir" ON blog_posts
  FOR SELECT USING (true);

-- Admin'e yazma izni (auth.users tablosundaki admin email kontrolü)
CREATE POLICY "Admin blog yazısı ekleyebilir" ON blog_posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'hakantrkmn61@gmail.com'
    )
  );

CREATE POLICY "Admin blog yazısı güncelleyebilir" ON blog_posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'hakantrkmn61@gmail.com'
    )
  );

CREATE POLICY "Admin blog yazısı silebilir" ON blog_posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'hakantrkmn61@gmail.com'
    )
  );

-- Updated_at için trigger
CREATE TRIGGER handle_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();
