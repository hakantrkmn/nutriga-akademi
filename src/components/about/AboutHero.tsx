import { COMPANY_NAME } from "@/constants";

export default function AboutHero() {
  return (
    <div className="bg-green-50 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600">
            Hakkımızda
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            {COMPANY_NAME} olarak, beslenme bilimindeki en güncel bilgileri
            diyetisyenlere ve beslenme uzmanlarına ulaştırmayı hedefliyoruz.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Alanında uzman eğitmenlerimizle birlikte, mesleki gelişiminize katkı
            sağlayacak kaliteli eğitimler sunuyoruz.
          </p>
        </div>
      </div>
    </div>
  );
}
