-- Create PaymentStatus enum
CREATE TYPE public.payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    iyzico_token TEXT,
    iyzico_payment_id TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'PENDING',
    payment_method TEXT,
    installment INTEGER DEFAULT 1,
    conversation_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payment_items table
CREATE TABLE IF NOT EXISTS public.payment_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
    education_id UUID NOT NULL REFERENCES public.egitimler(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_conversation_id ON public.payments(conversation_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON public.payments(created_at);
CREATE INDEX IF NOT EXISTS idx_payment_items_payment_id ON public.payment_items(payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_items_education_id ON public.payment_items(education_id);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments" ON public.payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments" ON public.payments
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for payment_items
CREATE POLICY "Users can view their own payment items" ON public.payment_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.payments
            WHERE payments.id = payment_items.payment_id
            AND payments.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own payment items" ON public.payment_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.payments
            WHERE payments.id = payment_items.payment_id
            AND payments.user_id = auth.uid()
        )
    );

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for payments table
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
