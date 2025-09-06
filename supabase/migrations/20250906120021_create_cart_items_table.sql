-- Sepet / Geçici Sipariş tablosu oluşturma
CREATE TABLE cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  education_id uuid REFERENCES egitimler(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  created_at timestamp DEFAULT now()
);

-- Index'ler ekleme
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_education_id ON cart_items(education_id);
CREATE INDEX idx_cart_items_created_at ON cart_items(created_at);

-- Unique constraint - bir kullanıcı aynı eğitimi birden fazla kez sepete ekleyemez
CREATE UNIQUE INDEX idx_cart_items_user_education_unique ON cart_items(user_id, education_id);

-- RLS (Row Level Security) etkinleştirme
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar sadece kendi sepetlerini görebilir
CREATE POLICY "Kullanıcılar kendi sepetlerini görebilir" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

-- Kullanıcılar kendi sepetlerine ekleme yapabilir
CREATE POLICY "Kullanıcılar kendi sepetlerine ekleme yapabilir" ON cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi sepetlerini güncelleyebilir
CREATE POLICY "Kullanıcılar kendi sepetlerini güncelleyebilir" ON cart_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Kullanıcılar kendi sepetlerinden silebilir
CREATE POLICY "Kullanıcılar kendi sepetlerinden silebilir" ON cart_items
  FOR DELETE USING (auth.uid() = user_id);
