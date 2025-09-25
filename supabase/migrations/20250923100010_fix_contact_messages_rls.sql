-- =================================================================
-- Contact Messages RLS Politikasını Düzelt
-- Kullanıcılar kendi mesajlarını görebilsin
-- =================================================================

-- Mevcut admin politikasını koruyoruz, yeni bir politika ekliyoruz
CREATE POLICY "Users can view their own messages"
ON public.contact_messages FOR SELECT
USING (user_id = auth.uid());


