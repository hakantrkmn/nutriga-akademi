-- Add paid_price column to payments table for storing Iyzico's calculated amount (with interest)
ALTER TABLE "public"."payments" 
ADD COLUMN "paid_price" DECIMAL(10,2);

-- Add comment explaining the field
COMMENT ON COLUMN "public"."payments"."paid_price" IS 'İyzipay''ın hesapladığı gerçek tutar (faizli)';
