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
    color: "primary",
  },
  {
    icon: FaGlobe,
    title: "Uluslararası Standartlar",
    description:
      "Dünya çapında geçerli eğitim programları ve sertifikasyonlar sunarak global standartları yakalamak.",
    color: "success",
  },
  {
    icon: FaRocket,
    title: "Yenilikçi Yaklaşım",
    description:
      "Teknoloji destekli öğrenme deneyimleri ile eğitim metodolojilerinde öncü olmak.",
    color: "primary",
  },
  {
    icon: FaStar,
    title: "Kalite Güvencesi",
    description:
      "Sürekli iyileştirme anlayışı ile en yüksek kalite standartlarını korumak.",
    color: "success",
  },
  {
    icon: FaHandsHelping,
    title: "Toplumsal Etki",
    description:
      "Yetiştirdiğimiz uzmanlar aracılığıyla toplum sağlığına maksimum katkı sağlamak.",
    color: "primary",
  },
  {
    icon: FaGraduationCap,
    title: "Sürekli Eğitim",
    description:
      "Yaşam boyu öğrenme felsefesi ile meslek hayatı boyunca destek sunmak.",
    color: "success",
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
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Vizyonumuzun Ana Hedefleri
              </h2>
              <p className="text-lg text-secondary max-w-2xl">
                Geleceğe yönelik stratejik odak alanlarımız
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {visionGoals.map((goal, index) => (
                <div
                  key={index}
                  className="p-8 bg-background-alt rounded-xl border border-border-color text-center space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary h-full"
                >
                  <div
                    className={`p-4 rounded-2xl inline-block ${
                      goal.color === "primary"
                        ? "bg-primary-100 text-primary"
                        : "bg-success-light text-success"
                    }`}
                  >
                    <goal.icon className="w-8 h-8" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {goal.title}
                    </h3>

                    <p className="text-sm text-secondary leading-relaxed">
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
      <div className="py-16 bg-background-alt">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Gelecek Yol Haritamız
              </h2>
              <p className="text-lg text-secondary max-w-2xl">
                Vizyonumuza ulaşmak için planladığımız kilometre taşları
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {futureGoals.map((goal, index) => (
                <div
                  key={index}
                  className="p-8 bg-background rounded-xl border border-border-color flex items-start gap-6 transition-all duration-300 hover:border-primary-200 hover:shadow-md hover:translate-x-1"
                >
                  <div className="bg-primary text-white rounded-xl px-4 py-2 text-lg font-bold flex-shrink-0">
                    {goal.year}
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {goal.title}
                    </h3>

                    <p className="text-secondary leading-relaxed">
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
      <div className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary">
              Geleceğe Bakışımız
            </h2>

            <p className="text-xl text-secondary leading-relaxed italic">
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
