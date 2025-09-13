-- Make phone field required for existing users
-- First, add a default phone number for existing users
UPDATE public.users
SET phone = '+90 000 000 00 00'
WHERE phone IS NULL OR phone = '';

-- Now make the column NOT NULL
ALTER TABLE public.users
ALTER COLUMN phone SET NOT NULL;
