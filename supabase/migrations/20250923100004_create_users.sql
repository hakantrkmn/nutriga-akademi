-- =================================================================
-- Adım 4: Kullanıcı Profilleri Tablosu ve Politikaları
-- Bu tablo, auth.users tablosundaki kullanıcılara ait
-- ek profil bilgilerini saklar.
-- =================================================================

-- Tabloyu oluştur
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    profession TEXT,
    university TEXT,
    department TEXT,
    class TEXT,
    email TEXT UNIQUE,
    phone TEXT NOT NULL DEFAULT '+90 000 000 00 00', -- Zorunluluk ve varsayılan değer eklendi
    desired_education_id UUID REFERENCES public.egitimler(id) ON DELETE SET NULL,
    notification_permission BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- updated_at trigger'ını bağla
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS (Row Level Security) aktifleştir
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politikaları Oluştur (Kullanıcılar sadece kendi verilerini yönetebilir)
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON public.users
    FOR DELETE USING (auth.uid() = id);
