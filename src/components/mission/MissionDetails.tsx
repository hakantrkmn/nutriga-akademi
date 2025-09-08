import {
  FaBookReader,
  FaCertificate,
  FaChalkboardTeacher,
  FaHeart,
  FaLightbulb,
  FaUsers,
} from "react-icons/fa";

const missionPoints = [
  {
    icon: FaBookReader,
    title: "Güncel Bilgi",
    description:
      "Beslenme bilimindeki en son gelişmeleri takip ederek, kanıta dayalı eğitim içerikleri sunuyoruz.",
    color: "green.500",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Kaliteli Eğitim",
    description:
      "Deneyimli uzmanlarımızla, teorik bilgiyi pratiğe dönüştüren etkili eğitim programları geliştiriyoruz.",
    color: "orange.500",
  },
  {
    icon: FaUsers,
    title: "Mesleki Gelişim",
    description:
      "Diyetisyenlerin kariyer yolculuğunda yanında olarak, sürekli öğrenmeyi destekliyoruz.",
    color: "green.600",
  },
  {
    icon: FaCertificate,
    title: "Sertifikasyon",
    description:
      "Katılımcılarımıza uluslararası standartlarda geçerli sertifikalar sunarak değer katıyoruz.",
    color: "orange.600",
  },
  {
    icon: FaHeart,
    title: "Toplum Sağlığı",
    description:
      "Eğittiğimiz uzmanlar aracılığıyla toplumun beslenme bilincini artırmayı hedefliyoruz.",
    color: "green.500",
  },
  {
    icon: FaLightbulb,
    title: "İnovasyon",
    description:
      "Eğitim metodolojilerinde yenilikçi yaklaşımlarla öğrenme deneyimini zenginleştiriyoruz.",
    color: "orange.500",
  },
];

const commitments = [
  "Bilimsel araştırmalara dayalı güncel içerik sunmak",
  "Etik değerleri ön planda tutarak eğitim vermek",
  "Her katılımcının bireysel ihtiyaçlarını gözetmek",
  "Sürekli gelişim ve iyileştirme anlayışını benimser",
  "Toplumsal sorumluluk bilincini yaygınlaştırmak",
];

export default function MissionDetails() {
  return (
    <>
      {/* Mission Points */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Misyonumuzun Temel Unsurları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Hedeflerimize ulaşmak için odaklandığımız ana konular
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {missionPoints.map((point, index) => (
                <div
                  key={index}
                  className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-500 h-full"
                >
                  <div
                    className={`p-4 rounded-2xl inline-block ${
                      point.color === "green.500"
                        ? "bg-green-50 text-green-500"
                        : point.color === "orange.500"
                        ? "bg-orange-50 text-orange-500"
                        : point.color === "green.600"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    <point.icon className="w-8 h-8" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {point.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Commitments */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Taahhütlerimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Misyonumuzu gerçekleştirmek için verdiğimiz sözler
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
              {commitments.map((commitment, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl border border-gray-200 w-full flex items-start gap-4 transition-all duration-200 hover:border-green-200 hover:shadow-sm hover:translate-x-2"
                >
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {commitment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
