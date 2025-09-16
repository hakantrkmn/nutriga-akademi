-- Update RLS policies for contact_messages to allow admin updates
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;

-- Allow anonymous users to insert (for contact form)
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all messages
CREATE POLICY "Authenticated users can view all messages" ON public.contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update messages
CREATE POLICY "Authenticated users can update messages" ON public.contact_messages
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete messages
CREATE POLICY "Authenticated users can delete messages" ON public.contact_messages
    FOR DELETE USING (auth.role() = 'authenticated');
