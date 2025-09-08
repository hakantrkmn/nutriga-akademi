import { COMPANY_NAME } from "@/constants";
import {
  FaCertificate,
  FaChartLine,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";

const stats = [
  {
    icon: FaGraduationCap,
    number: "500+",
    label: "Mezun Diyetisyen",
    color: "text-green-600",
  },
  {
    icon: FaUsers,
    number: "50+",
    label: "Uzman Eğitmen",
    color: "text-orange-600",
  },
  {
    icon: FaCertificate,
    number: "100+",
    label: "Sertifika Programı",
    color: "text-blue-600",
  },
  {
    icon: FaChartLine,
    number: "95%",
    label: "Memnuniyet Oranı",
    color: "text-purple-600",
  },
];

const teamMembers = [
  {
    name: "Dr. Ayşe Yılmaz",
    title: "Kurucu & Baş Diyetisyen",
    image: "/images/team/ayse-yilmaz.jpg",
    description:
      "15 yıllık deneyimi ile beslenme alanında öncü isimlerden biri.",
    specialties: [
      "Klinik Beslenme",
      "Metabolik Hastalıklar",
      "Obezite Tedavisi",
    ],
  },
  {
    name: "Prof. Dr. Mehmet Kaya",
    title: "Akademik Danışman",
    image: "/images/team/mehmet-kaya.jpg",
    description: "Beslenme ve Diyetetik alanında 20 yıllık akademik deneyim.",
    specialties: ["Beslenme Bilimleri", "Araştırma", "Akademik Eğitim"],
  },
  {
    name: "Uzm. Dyt. Zeynep Demir",
    title: "Eğitim Koordinatörü",
    image: "/images/team/zeynep-demir.jpg",
    description: "Eğitim programlarının geliştirilmesi ve koordinasyonu.",
    specialties: ["Eğitim Tasarımı", "Pediatrik Beslenme", "Sporcu Beslenmesi"],
  },
  {
    name: "Dr. Fatma Özkan",
    title: "Klinik Beslenme Uzmanı",
    image: "/images/team/fatma-ozkan.jpg",
    description: "Hastane ortamında beslenme tedavisi konusunda uzman.",
    specialties: [
      "Klinik Beslenme",
      "Enteral Beslenme",
      "Kritik Hasta Beslenmesi",
    ],
  },
];

export default function AboutTeam() {
  return (
    <div className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-16">
          {/* Stats Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rakamlarla {COMPANY_NAME}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yılların deneyimi ve binlerce başarılı mezunumuzla beslenme
              eğitiminde öncüyüz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Uzman Ekibimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alanında deneyimli uzmanlarımızla size en kaliteli eğitimi
              sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <div className="text-6xl text-green-600 font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-green-600 font-medium mb-3">
                    {member.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
