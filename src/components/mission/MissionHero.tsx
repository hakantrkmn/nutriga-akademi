import { HiBadgeCheck } from "react-icons/hi";

export default function MissionHero() {
  return (
    <div className="bg-green-50 pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
          <div className="bg-green-100 p-6 rounded-2xl inline-block">
            <HiBadgeCheck className="w-12 h-12 text-green-500" />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold text-green-500">Misyonumuz</h1>

            <p className="text-2xl text-gray-700 leading-relaxed font-medium">
              Nutriga Akademi, bilimsel temelli, erişilebilir beslenme
              eğitimleriyle bireylerin yaşamına sürdürülebilir ve dönüştürücü
              değer katmayı hedefler.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Nutriga Akademi olarak, beslenme biliminin sürekli gelişen
              doğasını takip ederek, diyetisyenlere en güncel bilgileri sunmayı
              ve onların profesyonel gelişimlerine destek olmayı kendimize görev
              edindik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
