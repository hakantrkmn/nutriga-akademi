-- Remove unique constraint from cart_items table to allow multiple purchases of same education by same user
DROP INDEX IF EXISTS idx_cart_items_user_education_unique;
