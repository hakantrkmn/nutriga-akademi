import {
  HiClock,
  HiDocumentText,
  HiExclamationCircle,
  HiMail,
  HiScale,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi";

const termsSections = [
  {
    icon: HiUserGroup,
    title: "Hesap Açma ve Üyelik",
    description:
      "Platform&apos;a üyelik için gerekli şartlar ve hesap güvenliği sorumlulukları.",
    color: "green.500",
  },
  {
    icon: HiExclamationCircle,
    title: "Yasaklı Davranışlar",
    description:
      "Platform kullanımında yasak olan davranışlar ve ihlal durumunda uygulanacak yaptırımlar.",
    color: "red.500",
  },
  {
    icon: HiClock,
    title: "Eğitim Takvimi",
    description:
      "Eğitim programları, içerik değişiklikleri ve eğitmen değişiklikleri hakkında bilgiler.",
    color: "blue.500",
  },
  {
    icon: HiScale,
    title: "Sorumluluk Sınırları",
    description:
      "Platform kullanımından doğabilecek sorumlulukların sınırları ve istisnalar.",
    color: "purple.500",
  },
];

export default function TermsPolicy() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16">
        {/* Genel Bilgilendirme */}
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Üyelik / Kullanım Koşulları
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              NutriHome Akademi platformunu kullanırken uymanız gereken
              kurallar, haklarınız ve sorumluluklarınız hakkında detaylı
              bilgiler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {termsSections.map((section, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-500"
              >
                <div
                  className={`p-4 rounded-2xl inline-block ${
                    section.color === "green.500"
                      ? "bg-green-50 text-green-500"
                      : section.color === "red.500"
                      ? "bg-red-50 text-red-500"
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

        {/* Detaylı Koşullar */}
        <div className="space-y-12">
          {/* 1. Hesap Açma ve Üyelik Şartları */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <HiUserGroup className="text-green-500" />
              1. Hesap Açma ve Üyelik Şartları
            </h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  a) Yaş ve Ehliyet
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Platform&apos;a üyelik için{" "}
                  <strong>18 yaşını doldurmuş</strong> ve ayırt etme gücüne
                  sahip olunması gerekir. Kurumsal hesap açılması hâlinde,
                  hesabı açan kişi adına hareket etme yetkisini haiz olduğunu
                  beyan eder.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  b) Doğru Bilgi
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  ALICI, kayıt sırasında verdiği tüm bilgilerin{" "}
                  <strong>doğru ve güncel</strong> olduğunu, değişiklikleri
                  gecikmeksizin hesabı üzerinden güncelleyeceğini kabul eder.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  c) Tekil Hesap / Devredilmezlik
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Hesap <strong>kişiye özeldir</strong>, üçüncü kişilere
                  devredilemez, kiralanamaz veya kullandırılamaz.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  d) Güvenlik
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Kullanıcı adı/şifre ve çok faktörlü doğrulama (varsa) başta
                  olmak üzere
                  <strong>
                    hesap güvenliği ALICI&apos;nın sorumluluğundadır
                  </strong>
                  ; yetkisiz kullanım şüphesinde derhal destek kanalı üzerinden
                  bildirim yapılır.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Yasaklı Davranışlar */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <HiExclamationCircle className="text-red-500" />
              2. Yasaklı Davranışlar
            </h3>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed mb-6">
                ALICI; aşağıdaki fiilleri işlemeyeceğini kabul eder:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      a) Hesap Paylaşımı
                    </h4>
                    <p className="text-red-700 text-sm">
                      Birden fazla kişi tarafından aynı hesabın eşzamanlı
                      kullanılması, kimlik taklidi.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      b) Telif İhlali
                    </h4>
                    <p className="text-red-700 text-sm">
                      Ders kayıtlarının izinsiz indirilmesi, çoğaltılması, ekran
                      kaydı alınması, yayılması.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      c) Teknik Engel Aşma
                    </h4>
                    <p className="text-red-700 text-sm">
                      DRM, şifreleme, erişim kontrolü gibi teknik koruma
                      önlemlerinin aşılması.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      d) Sınav Hilesi
                    </h4>
                    <p className="text-red-700 text-sm">
                      Sınav/ölçme hilesi ve akademik dürüstlük ihlalleri.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      e) Taciz/Nefret Söylemi
                    </h4>
                    <p className="text-red-700 text-sm">
                      Eğitmen veya katılımcılara karşı tehdit, hakaret,
                      ayrımcılık.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      f) İzinsiz Ticari Faaliyet
                    </h4>
                    <p className="text-red-700 text-sm">
                      Spam, reklam, referans/ortaklık linkleri, sahte
                      değerlendirme.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      g) Zararlı Yazılım
                    </h4>
                    <p className="text-red-700 text-sm">
                      Virüs, trojan, kötü amaçlı kod bulunduran dosyaların
                      yüklenmesi.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">
                      h) Mevzuata Aykırılık
                    </h4>
                    <p className="text-red-700 text-sm">
                      Yürürlükteki hukuk düzenine aykırı her türlü kullanım.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Eğitim Takvimi ve İçerik Değişiklikleri */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <HiClock className="text-blue-500" />
              3. Eğitim Takvimi, İçerik ve Eğitmen Değişiklikleri
            </h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  a) Takvim
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Canlı ders tarih/saatleri kurs sayfası/Hesabım alanında ilan
                  edilir.
                  <strong>Mücbir sebep</strong>, eğitmenin sağlık/ulaşım engeli
                  veya teknik arıza nedeniyle dersin yapılamaması hâlinde
                  SAĞLAYICI <strong>telafi dersi</strong> planlar veya erişim
                  süresini makul ölçüde <strong>uzatır</strong>.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  b) Bildirim
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Zorunlu değişiklikler mümkün olduğunca{" "}
                  <strong>en az 24 saat</strong> önceden kalıcı veri saklayıcısı
                  ile bildirilir (acil haller saklıdır).
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  c) İçerik Güncellemeleri
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Eğitim müfredatı; kalite iyileştirmesi, güncel gelişmeler veya
                  pedagojik sebeplerle
                  <strong>eşdeğer veya daha kapsamlı</strong> içerikle
                  güncellenebilir. Güncelleme, eğitim hedeflerini{" "}
                  <strong>esaslı biçimde daraltmıyorsa</strong> değişiklik
                  sayılmaz.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  d) Eğitmen Değişikliği
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Eğitmenin değişmesi, eğitim hedefleri ve niteliklerini korumak
                  kaydıyla
                  <strong>esaslı değişiklik</strong> sayılmaz.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Askıya Alma, Kısıtlama ve Fesih */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <HiShieldCheck className="text-orange-500" />
              4. Askıya Alma, Kısıtlama ve Fesih
            </h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  a) Aşamalı Yaptırım
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  SAĞLAYICI; bu maddeye aykırılık hâlinde (i){" "}
                  <strong>uyarı</strong>, (ii) <strong>geçici askı</strong>,
                  (iii) <strong>kalıcı fesih</strong> uygulayabilir. Ağır
                  ihlallerde doğrudan askıya alma/fesih hakkı saklıdır.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  b) İhlal Hâlinde Erişim
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Telif/teknik koruma ihlalleri, sınav hilesi, taciz ve benzeri{" "}
                  <strong>ağır ihlallerde</strong>
                  erişim derhâl durdurulabilir.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  c) İade/Bedel
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Askıya alma veya fesih,{" "}
                  <strong>ALICI&apos;nın kusurundan</strong> kaynaklanıyorsa
                  bedel iadesi yapılmaz; kusurun bulunmadığı ve hizmetin{" "}
                  <strong>ayıplı/ifa edilmemiş</strong> olduğu hâllerde 6502
                  sayılı Kanun kapsamındaki <strong>seçimlik haklar</strong>{" "}
                  saklıdır.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Sorumluluğun Sınırlandırılması */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <HiScale className="text-purple-500" />
              5. Sorumluluğun Sınırlandırılması
            </h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  a) Eğitim Amaçlıdır
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  İçerikler eğitim/kişisel gelişim amaçlıdır;{" "}
                  <strong>mesleki/uzman görüş</strong> yerine geçmez.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  b) Dolaylı Zararlar
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  SAĞLAYICI; <strong>doğrudan kusuruna</strong> dayanmayan{" "}
                  <strong>kâr kaybı, veri kaybı, iş kesintisi</strong>
                  gibi <strong>dolaylı zararlar</strong>dan sorumlu değildir.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  c) Tavan
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Zorunlu hukuk hükümleri saklı kalmak üzere SAĞLAYICI&apos;nın
                  toplam sorumluluğu, ilgili talebe esas{" "}
                  <strong>
                    ürün/eğitim için ALICI&apos;nın ödediği toplam bedel
                  </strong>
                  veya <strong>son 6 ayda ödenen toplam abonelik bedeli</strong>{" "}
                  ile sınırlıdır.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Bildirim ve Delil Sözleşmesi */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <HiDocumentText className="text-indigo-500" />
              6. Bildirim ve Delil Sözleşmesi
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Taraflar; bu madde kapsamındaki bildirimlerin{" "}
              <strong>kalıcı veri saklayıcısı</strong>
              (e-posta/hesap içi mesaj) ile yapılabileceğini; Platform
              kayıtları, işlem logları ve elektronik verilerin{" "}
              <strong>kesin delil</strong> teşkil edeceğini kabul eder.
            </p>
          </div>

          {/* 7. Yürürlük ve İlişki */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <HiDocumentText className="text-teal-500" />
              7. Yürürlük ve İlişki
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Bu madde, Mesafeli Satış (Hizmet) Sözleşmesi&apos;nin{" "}
              <strong>ayrılmaz parçasıdır</strong>
              ve Platform&apos;da ayrıca yayımlanan{" "}
              <strong>Kullanım Koşulları/Topluluk Kuralları</strong>
              ile birlikte uygulanır; çelişki hâlinde{" "}
              <strong>tüketici lehine yorum</strong> esastır.
            </p>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Kullanım Koşulları Hakkında Sorularınız İçin
            </h3>
            <p className="text-lg text-gray-600">
              Kullanım koşullarımız hakkında sorularınız için bizimle iletişime
              geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <HiMail className="text-green-500" />
                <span className="font-semibold">E-posta:</span>
                <span>destek@nutrihomeakademi.com</span>
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
