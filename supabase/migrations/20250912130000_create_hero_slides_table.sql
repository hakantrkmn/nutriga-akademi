-- Hero slides tablosunu oluşturma
-- Ana sayfa hero section için slaytlar

-- Hero slides tablosunu oluştur
CREATE TABLE IF NOT EXISTS public.hero_slides (
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

-- Sort order için index oluştur
CREATE INDEX IF NOT EXISTS idx_hero_slides_sort_order ON public.hero_slides(sort_order);
CREATE INDEX IF NOT EXISTS idx_hero_slides_is_active ON public.hero_slides(is_active);

-- RLS (Row Level Security) aktifleştir
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Herkesin hero slides'ları okuyabilmesi için policy
CREATE POLICY "Hero slides are viewable by everyone"
ON public.hero_slides
FOR SELECT
USING (true);

-- Sadece admin kullanıcıların hero slides ekleyebilmesi için policy
CREATE POLICY "Only admins can insert hero slides"
ON public.hero_slides
FOR INSERT
WITH CHECK (public.is_admin_user() = true);

-- Sadece admin kullanıcıların hero slides güncelleyebilmesi için policy
CREATE POLICY "Only admins can update hero slides"
ON public.hero_slides
FOR UPDATE
USING (public.is_admin_user() = true)
WITH CHECK (public.is_admin_user() = true);

-- Sadece admin kullanıcıların hero slides silebilmesi için policy
CREATE POLICY "Only admins can delete hero slides"
ON public.hero_slides
FOR DELETE
USING (public.is_admin_user() = true);

-- Updated_at için trigger fonksiyonu
CREATE OR REPLACE FUNCTION public.handle_hero_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger oluştur
CREATE TRIGGER handle_hero_slides_updated_at
    BEFORE UPDATE ON public.hero_slides
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_hero_slides_updated_at();
