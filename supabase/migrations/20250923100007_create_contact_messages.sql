-- =================================================================
-- Adım 7: İletişim Mesajları Tablosu ve Politikaları
-- =================================================================

-- Tabloyu oluştur
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending', -- Örn: pending, answered, archived
    user_id UUID, -- Foreign key yok, sadece ID tutuluyor
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index'leri ekle
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

-- updated_at trigger'ını bağla
CREATE TRIGGER handle_contact_messages_updated_at
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS (Row Level Security) aktifleştir
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Politikaları Oluştur (En güncel haliyle)
-- 1. Herkesin (anonim kullanıcılar dahil) mesaj gönderebilmesi
CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages FOR INSERT WITH CHECK (true);

-- 2. Sadece adminlerin tüm mesajları görebilmesi
CREATE POLICY "Admins can view all messages"
ON public.contact_messages FOR SELECT USING (public.is_admin_user() = true);

-- 3. Sadece adminlerin mesajları güncelleyebilmesi
CREATE POLICY "Admins can update messages"
ON public.contact_messages FOR UPDATE USING (public.is_admin_user() = true);

-- 4. Sadece adminlerin mesajları silebilmesi
CREATE POLICY "Admins can delete messages"
ON public.contact_messages FOR DELETE USING (public.is_admin_user() = true);
