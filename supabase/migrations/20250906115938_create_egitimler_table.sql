-- Eğitimler tablosu oluşturma
CREATE TABLE egitimler (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content jsonb,
  image_url text,
  slug text UNIQUE NOT NULL,
  price numeric(10,2),
  sales_count integer DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Index'ler ekleme
CREATE INDEX idx_egitimler_slug ON egitimler(slug);
CREATE INDEX idx_egitimler_created_at ON egitimler(created_at);
CREATE INDEX idx_egitimler_price ON egitimler(price);

-- RLS (Row Level Security) etkinleştirme
ALTER TABLE egitimler ENABLE ROW LEVEL SECURITY;

-- Herkese okuma izni
CREATE POLICY "Eğitimler herkese okunabilir" ON egitimler
  FOR SELECT USING (true);

-- Admin'e yazma izni (auth.users tablosundaki admin email kontrolü)
CREATE POLICY "Admin eğitim ekleyebilir" ON egitimler
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'hakantrkmn61@gmail.com'
    )
  );

CREATE POLICY "Admin eğitim güncelleyebilir" ON egitimler
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'hakantrkmn61@gmail.com'
    )
  );

CREATE POLICY "Admin eğitim silebilir" ON egitimler
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'hakantrkmn61@gmail.com'
    )
  );
