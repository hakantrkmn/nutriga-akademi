-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    profession TEXT NOT NULL,
    university TEXT,
    department TEXT,
    class TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    desired_education_id UUID REFERENCES public.egitimler(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Create policy for users to view their own profile
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Create policy for users to delete their own profile
CREATE POLICY "Users can delete their own profile" ON public.users
    FOR DELETE
    USING (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
