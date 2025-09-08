import EgitimCard from "@/components/courses/CoursesCard";
import { Egitim } from "@/types";

interface EgitimlerGridProps {
  egitimler: Egitim[];
}

export default function EgitimlerGrid({ egitimler }: EgitimlerGridProps) {
  if (egitimler.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-xl text-gray-600">
            Seçtiğiniz kriterlere uygun eğitim bulunamadı.
          </p>
          <p className="text-gray-500">
            Filtreleri değiştirerek tekrar deneyin veya tüm eğitimleri
            görüntüleyin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {egitimler.map((egitim) => (
            <EgitimCard key={egitim.id} egitim={egitim} />
          ))}
        </div>
      </div>
    </div>
  );
}
