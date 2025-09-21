import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogDetailFooter() {
  return (
    <>
      <div className="bg-success-light p-6 rounded-xl w-full border border-primary-200">
        <div className="flex flex-col gap-3 items-start">
          <p className="font-semibold text-success">Bu yazıyı beğendiniz mi?</p>
          <p className="text-sm text-secondary leading-relaxed">
            Daha fazla beslenme rehberi ve sağlıklı yaşam ipuçları için blog
            sayfamızı takip edin!
          </p>
          <Link href="/blog">
            <Button className="bg-success hover:bg-success-dark text-white">
              Diğer Yazıları İncele
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
