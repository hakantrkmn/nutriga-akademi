-- Admin kullanıcısı için gerekli fonksiyonlar ve trigger'lar

-- Admin kullanıcısını kontrol eden fonksiyon
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email = 'yeni-admin-mail@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin kullanıcısını kontrol eden fonksiyon (public)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email = 'yeni-admin-mail@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin kullanıcısı bilgilerini getiren fonksiyon
CREATE OR REPLACE FUNCTION get_admin_info()
RETURNS TABLE (
  id uuid,
  email text,
  created_at timestamp with time zone
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    auth.users.id,
    auth.users.email,
    auth.users.created_at
  FROM auth.users
  WHERE auth.users.email = 'yeni-admin-mail@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public fonksiyon olarak da ekle
CREATE OR REPLACE FUNCTION public.get_admin_info()
RETURNS TABLE (
  id uuid,
  email text,
  created_at timestamp with time zone
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    auth.users.id,
    auth.users.email,
    auth.users.created_at
  FROM auth.users
  WHERE auth.users.email = 'yeni-admin-mail@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
