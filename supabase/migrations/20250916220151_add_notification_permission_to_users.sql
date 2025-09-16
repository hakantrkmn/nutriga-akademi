-- Add notification_permission column to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS notification_permission BOOLEAN DEFAULT FALSE;

-- Update existing records to have false as default
UPDATE public.users
SET notification_permission = FALSE
WHERE notification_permission IS NULL;
