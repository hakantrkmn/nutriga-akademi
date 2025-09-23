-- =================================================================
-- Adım 8: Ödeme Tabloları ve Politikaları
-- =================================================================

-- 1. ENUM Tipi Oluşturma
CREATE TYPE public.payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');

-- 2. Payments Tablosu
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    iyzico_token TEXT,
    iyzico_payment_id TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_price DECIMAL(10,2), -- Sonradan eklendi
    status payment_status DEFAULT 'PENDING',
    payment_method TEXT,
    installment INTEGER DEFAULT 1,
    conversation_id TEXT NOT NULL UNIQUE,
    reason TEXT, -- Sonradan eklendi
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Payment Items Tablosu
CREATE TABLE public.payment_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
    education_id UUID NOT NULL REFERENCES public.egitimler(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- 4. Index'leri Ekleme
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payment_items_payment_id ON public.payment_items(payment_id);

-- 5. Trigger'ları Bağlama
CREATE TRIGGER handle_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 6. RLS'i Aktifleştirme
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_items ENABLE ROW LEVEL SECURITY;

-- 7. RLS Politikalarını Oluşturma

-- Payments Tablosu Politikaları
CREATE POLICY "Users can manage their own payments"
    ON public.payments FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments"
    ON public.payments FOR ALL
    USING (public.is_admin_user() = true);

-- Payment Items Tablosu Politikaları
CREATE POLICY "Users can manage their own payment items"
    ON public.payment_items FOR ALL
    USING ((
        SELECT payments.user_id
        FROM public.payments
        WHERE payments.id = payment_items.payment_id
    ) = auth.uid());

CREATE POLICY "Admins can manage all payment items"
    ON public.payment_items FOR ALL
    USING (public.is_admin_user() = true);
