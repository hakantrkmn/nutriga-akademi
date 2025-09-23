-- =================================================================
-- Adım 6: Hero Slides Tablosu ve Politikaları
-- =================================================================

-- Tabloyu oluştur
CREATE TABLE public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_main TEXT NOT NULL,
    title_highlight TEXT NOT NULL,
    description TEXT NOT NULL,
    image_src TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index'leri ekle
CREATE INDEX idx_hero_slides_sort_order ON public.hero_slides(sort_order);
CREATE INDEX idx_hero_slides_is_active ON public.hero_slides(is_active);

-- updated_at trigger'ını bağla
CREATE TRIGGER handle_hero_slides_updated_at
    BEFORE UPDATE ON public.hero_slides
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS (Row Level Security) aktifleştir
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Politikaları Oluştur
-- 1. Herkesin slaytları okuyabilmesi
CREATE POLICY "Hero slides are viewable by everyone"
ON public.hero_slides FOR SELECT USING (true);

-- 2. Sadece adminlerin slayt ekleyebilmesi
CREATE POLICY "Only admins can insert hero slides"
ON public.hero_slides FOR INSERT WITH CHECK (public.is_admin_user() = true);

-- 3. Sadece adminlerin slayt güncelleyebilmesi
CREATE POLICY "Only admins can update hero slides"
ON public.hero_slides FOR UPDATE USING (public.is_admin_user() = true);

-- 4. Sadece adminlerin slayt silebilmesi
CREATE POLICY "Only admins can delete hero slides"
ON public.hero_slides FOR DELETE USING (public.is_admin_user() = true);
