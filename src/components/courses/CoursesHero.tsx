import { FiAward, FiBook, FiUsers } from "react-icons/fi";

export default function EgitimlerHero() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600">
            Profesyonel Beslenme Eğitimleri
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Alanında uzman eğitmenlerden, güncel bilimsel verilerle desteklenen
            kapsamlı beslenme eğitimleri alın. Kariyerinizi bir üst seviyeye
            taşıyın.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FiAward className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Sertifikalı Eğitimler
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Tamamladığınız eğitimler için resmi sertifika alın
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FiBook className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Güncel İçerik
              </h3>
              <p className="text-sm text-gray-600 text-center">
                En son bilimsel araştırmalarla güncellenen içerikler
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FiUsers className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Uzman Eğitmenler
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Alanında deneyimli uzmanlardan öğrenin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}