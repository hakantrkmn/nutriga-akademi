-- Remove foreign key constraint from contact_messages table
-- This is needed because the cross-schema reference to auth.users was causing issues

-- Drop the existing foreign key constraint if it exists
ALTER TABLE public.contact_messages
DROP CONSTRAINT IF EXISTS contact_messages_user_id_fkey;

-- Update the user_id column to not have a foreign key constraint
-- The column will still exist and store user IDs, but without the constraint
