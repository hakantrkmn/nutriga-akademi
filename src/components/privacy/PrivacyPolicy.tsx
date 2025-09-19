import {
  HiDocumentText,
  HiLockClosed,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi";

const privacySections = [
  {
    icon: HiShieldCheck,
    title: "Veri Toplama ve Kullanım",
    description:
      "Hizmetlerimizi sunabilmek için gerekli olan kişisel verilerinizi, yasalara uygun olarak toplar ve kullanırız.",
    color: "green.500",
  },
  {
    icon: HiLockClosed,
    title: "Veri Güvenliği",
    description:
      "Kişisel verileriniz, endüstri standardı güvenlik önlemleri ile korunmaktadır.",
    color: "orange.500",
  },
  {
    icon: HiDocumentText,
    title: "Haklarınız",
    description:
      "KVKK kapsamında sahip olduğunuz tüm hakları kullanabilirsiniz.",
    color: "blue.500",
  },
  {
    icon: HiUserGroup,
    title: "Veri Paylaşımı",
    description:
      "Verileriniz, açık rızanız olmadan üçüncü taraflarla paylaşılmaz.",
    color: "purple.500",
  },
];

const dataCategories = [
  {
    category: "Kimlik Bilgileri",
    examples: "Ad, soyad, T.C. kimlik numarası",
    purpose: "Kimlik doğrulama ve kayıt işlemleri",
  },
  {
    category: "İletişim Bilgileri",
    examples: "E-posta, telefon, adres",
    purpose: "İletişim ve bildirim gönderimi",
  },
  {
    category: "Eğitim Bilgileri",
    examples: "Katıldığı eğitimler, sertifikalar",
    purpose: "Eğitim takibi ve sertifika düzenleme",
  },
  {
    category: "Teknik Veriler",
    examples: "IP adresi, tarayıcı bilgileri",
    purpose: "Güvenlik ve hizmet kalitesi",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16">
        {/* Genel Bilgilendirme */}
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Gizlilik Politikamız
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Nutriga Akademi olarak, 6698 sayılı Kişisel Verilerin Korunması
              Kanunu (KVKK) ve ilgili mevzuat hükümlerine uygun olarak kişisel
              verilerinizi korur ve gizliliğinize saygı gösteririz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {privacySections.map((section, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-500"
              >
                <div
                  className={`p-4 rounded-2xl inline-block ${
                    section.color === "green.500"
                      ? "bg-green-50 text-green-500"
                      : section.color === "orange.500"
                      ? "bg-orange-50 text-orange-500"
                      : section.color === "blue.500"
                      ? "bg-blue-50 text-blue-500"
                      : "bg-purple-50 text-purple-500"
                  }`}
                >
                  <section.icon className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {section.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Veri Kategorileri */}
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Toplanan Veri Kategorileri
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Hizmetlerimizi sunabilmek için aşağıdaki kategorilerdeki verileri
              toplarız.
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                    Veri Kategorisi
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                    Örnekler
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                    Kullanım Amacı
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataCategories.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {data.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {data.examples}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {data.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KVKK Hakları */}
        <div className="bg-green-50 rounded-xl p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                KVKK Kapsamındaki Haklarınız
              </h3>
              <p className="text-lg text-gray-600">
                6698 sayılı KVKK&apos;nın 11. maddesi kapsamında aşağıdaki
                haklara sahipsiniz:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800">
                  Bilgi Hakları
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>• İşlenme amacı ve hukuki sebebi hakkında bilgi alma</li>
                  <li>
                    • Verilerinizin aktarıldığı üçüncü kişiler hakkında bilgi
                    alma
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800">
                  İşlem Hakları
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Verilerinizin düzeltilmesini isteme</li>
                  <li>• Yasal olmayan işleme durumunda silinmesini isteme</li>
                  <li>• İşlenmenin durdurulmasını isteme</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Gizlilik Hakkında Sorularınız İçin
            </h3>
            <p className="text-lg text-gray-600">
              Gizlilik sözleşmemiz ve kişisel verileriniz hakkında sorularınız
              için bizimle iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-semibold">E-posta:</span>
                <span>kvkk@nutrigaakademi.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Telefon:</span>
                <span>+90 (216) 555 00 00</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Son güncellenme tarihi: {new Date().toLocaleDateString("tr-TR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
