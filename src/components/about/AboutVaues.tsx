import { COMPANY_NAME } from "@/constants";
import { HiBadgeCheck, HiEye, HiHeart } from "react-icons/hi";

const values = [
  {
    icon: HiBadgeCheck,
    title: "Misyonumuz",
    description:
      "Beslenme alanında en güncel ve kanıta dayalı bilgileri paylaşarak, diyetisyenlerin mesleki yeterliliklerini artırmak ve toplum sağlığına katkı sağlamak.",
    color: "green.500",
  },
  {
    icon: HiEye,
    title: "Vizyonumuz",
    description:
      "Türkiye'nin beslenme alanında önde gelen eğitim platformu olmak ve dünya standartlarında diyetisyen uzmanlar yetiştirmek.",
    color: "orange.500",
  },
  {
    icon: HiHeart,
    title: "Değerlerimiz",
    description:
      "Bilimsellik, sürekli öğrenme, etik değerler, yenilikçilik ve toplumsal sorumluluk ilkelerini benimser, kaliteli eğitim sunmayı hedefleriz.",
    color: "green.600",
  },
];

export default function AboutValues() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Değerlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {COMPANY_NAME}&apos;yi ayakta tutan temel değerler ve ilkelerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-500"
              >
                <div
                  className={`p-4 rounded-2xl inline-block ${
                    value.color === "green.500"
                      ? "bg-green-50 text-green-500"
                      : value.color === "orange.500"
                      ? "bg-orange-50 text-orange-500"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <value.icon className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
