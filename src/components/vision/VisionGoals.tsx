import {
  FaGlobe,
  FaGraduationCap,
  FaHandsHelping,
  FaRocket,
  FaStar,
  FaTrophy,
} from "react-icons/fa";

const visionGoals = [
  {
    icon: FaTrophy,
    title: "Sektör Liderliği",
    description:
      "Türkiye'de beslenme eğitimi alanında en çok tercih edilen ve güvenilir platform olmak.",
    color: "orange.500",
  },
  {
    icon: FaGlobe,
    title: "Uluslararası Standartlar",
    description:
      "Dünya çapında geçerli eğitim programları ve sertifikasyonlar sunarak global standartları yakalamak.",
    color: "green.500",
  },
  {
    icon: FaRocket,
    title: "Yenilikçi Yaklaşım",
    description:
      "Teknoloji destekli öğrenme deneyimleri ile eğitim metodolojilerinde öncü olmak.",
    color: "orange.600",
  },
  {
    icon: FaStar,
    title: "Kalite Güvencesi",
    description:
      "Sürekli iyileştirme anlayışı ile en yüksek kalite standartlarını korumak.",
    color: "green.600",
  },
  {
    icon: FaHandsHelping,
    title: "Toplumsal Etki",
    description:
      "Yetiştirdiğimiz uzmanlar aracılığıyla toplum sağlığına maksimum katkı sağlamak.",
    color: "orange.500",
  },
  {
    icon: FaGraduationCap,
    title: "Sürekli Eğitim",
    description:
      "Yaşam boyu öğrenme felsefesi ile meslek hayatı boyunca destek sunmak.",
    color: "green.500",
  },
];

const futureGoals = [
  {
    year: "2025",
    title: "Dijital Dönüşüm",
    description: "AI destekli kişiselleştirilmiş öğrenme deneyimleri",
  },
  {
    year: "2026",
    title: "Uluslararası Genişleme",
    description: "Bölgesel ülkelerde eğitim programları başlatma",
  },
  {
    year: "2027",
    title: "Araştırma Merkezi",
    description: "Beslenme araştırmaları için akademik işbirlikler",
  },
  {
    year: "2028",
    title: "Sertifikasyon Otoritesi",
    description: "Bağımsız sertifikasyon kuruluşu statüsü kazanma",
  },
];

export default function VisionGoals() {
  return (
    <>
      {/* Vision Goals */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Vizyonumuzun Ana Hedefleri
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Geleceğe yönelik stratejik odak alanlarımız
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {visionGoals.map((goal, index) => (
                <div
                  key={index}
                  className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-orange-500 h-full"
                >
                  <div
                    className={`p-4 rounded-2xl inline-block ${
                      goal.color === "orange.500"
                        ? "bg-orange-50 text-orange-500"
                        : goal.color === "green.500"
                        ? "bg-green-50 text-green-500"
                        : goal.color === "orange.600"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <goal.icon className="w-8 h-8" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {goal.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Gelecek Yol Haritamız
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Vizyonumuza ulaşmak için planladığımız kilometre taşları
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {futureGoals.map((goal, index) => (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl border border-gray-200 flex items-start gap-6 transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:translate-x-1"
                >
                  <div className="bg-orange-500 text-white rounded-xl px-4 py-2 text-lg font-bold flex-shrink-0">
                    {goal.year}
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {goal.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vision Statement */}
      <div className="py-16 bg-orange-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-orange-500">
              Geleceğe Bakışımız
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed italic">
              &quot;2030 yılında, küresel beslenme topluluğunun vazgeçilmez bir
              parçası olarak, binlerce diyetisyenin kariyerini şekillendirmiş,
              milyonlarca insanın sağlıklı yaşam tarzına kavuşmasına katkı
              sağlamış bir akademi olacağız.&quot;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
