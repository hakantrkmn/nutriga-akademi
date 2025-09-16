import {
  HiClock,
  HiCreditCard,
  HiDocumentText,
  HiExclamationCircle,
} from "react-icons/hi";

const policies = [
  {
    icon: HiClock,
    title: "İptal Süreçleri",
    description:
      "Eğitim başlangıç tarihinden en az 7 gün önce yapılan iptallerde tam iade yapılır. Eğitim başlangıcına 7 günden az kalmışsa iade yapılmaz.",
    color: "green.500",
  },
  {
    icon: HiCreditCard,
    title: "İade Koşulları",
    description:
      "İade talepleri, eğitim başlangıç tarihinden önce yapılmalıdır. Ödemenin yapıldığı yöntem ile iade gerçekleştirilir.",
    color: "orange.500",
  },
  {
    icon: HiDocumentText,
    title: "İade İşlemleri",
    description:
      "İade talepleri için destek ekibimize başvurmanız yeterlidir. İşlem süresi 3-5 iş günüdür.",
    color: "blue.500",
  },
  {
    icon: HiExclamationCircle,
    title: "Önemli Notlar",
    description:
      "Başlamış eğitimler için iade yapılmaz. Özel durumlar için lütfen bizimle iletişime geçin.",
    color: "red.500",
  },
];

const refundDetails = [
  {
    title: "Eğitim Başlangıcından 30+ Gün Önce İptal",
    refund: "Tam iade (%100)",
    description: "Ödemenin tamamı geri iade edilir.",
  },
  {
    title: "Eğitim Başlangıcından 15-30 Gün Önce İptal",
    refund: "Kısmi iade (%75)",
    description: "Ödemenin %75'i geri iade edilir.",
  },
  {
    title: "Eğitim Başlangıcından 7-15 Gün Önce İptal",
    refund: "Kısmi iade (%50)",
    description: "Ödemenin %50'si geri iade edilir.",
  },
  {
    title: "Eğitim Başlangıcından 7 Gün İçinde İptal",
    refund: "İade yok (%0)",
    description: "İade yapılmaz.",
  },
];

export default function CancellationPolicy() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16">
        {/* Genel Politika */}
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              İptal ve İade Koşullarımız
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              NutriHome Akademi olarak müşteri memnuniyetinizi ön planda
              tutuyoruz. Aşağıda iptal ve iade süreçlerimizi detaylarıyla
              bulabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-500"
              >
                <div
                  className={`p-4 rounded-2xl inline-block ${
                    policy.color === "green.500"
                      ? "bg-green-50 text-green-500"
                      : policy.color === "orange.500"
                      ? "bg-orange-50 text-orange-500"
                      : policy.color === "blue.500"
                      ? "bg-blue-50 text-blue-500"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  <policy.icon className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {policy.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* İade Tablosu */}
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">İade Oranları</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              İptal zamanına göre uygulanan iade oranlarını aşağıda
              bulabilirsiniz.
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                    İptal Zamanı
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                    İade Oranı
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                    Açıklama
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {refundDetails.map((detail, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {detail.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                      {detail.refund}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {detail.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-green-50 rounded-xl p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">
              İptal ve İade Talepleriniz İçin
            </h3>
            <p className="text-lg text-gray-600">
              İptal veya iade talepleriniz için bizimle iletişime
              geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-semibold">E-posta:</span>
                <span>destek@nutrihomeakademi.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Telefon:</span>
                <span>+90 (216) 555 00 00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
