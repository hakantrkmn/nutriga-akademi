-- Add paidPrice column to payments table
ALTER TABLE "public"."payments" 
ADD COLUMN "paid_price" DECIMAL(10,2);

-- Add comment
COMMENT ON COLUMN "public"."payments"."paid_price" IS 'İyzipay''ın hesapladığı gerçek tutar (faizli)';
