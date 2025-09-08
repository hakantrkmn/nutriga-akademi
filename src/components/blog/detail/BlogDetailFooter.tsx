import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogDetailFooter() {
  return (
    <>
      <div className="bg-green-50 p-6 rounded-xl w-full border border-green-200">
        <div className="flex flex-col gap-3 items-start">
          <p className="font-semibold text-green-600">
            Bu yazıyı beğendiniz mi?
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Daha fazla beslenme rehberi ve sağlıklı yaşam ipuçları için blog
            sayfamızı takip edin!
          </p>
          <Link href="/blog">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Diğer Yazıları İncele
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
