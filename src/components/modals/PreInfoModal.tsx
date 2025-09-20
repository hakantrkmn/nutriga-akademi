"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PreInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  children: React.ReactNode;
  subtotal: number;
}

export default function PreInfoModal({
  isOpen,
  onOpenChange,
  onAccept,
  children,
  subtotal,
}: PreInfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
            Ön Bilgilendirme Formu
          </DialogTitle>
          <div className="text-center text-sm text-gray-600 mt-2">
            <p>
              <strong>Platform:</strong> Nutriga Akademi
            </p>
            <p>
              <strong>Formun Düzenlenme Tarihi:</strong>{" "}
              {new Date().toLocaleDateString("tr-TR")} – Kalıcı veri saklayıcısı
              ile iletilmiştir.
            </p>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1 py-4">
          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 1 – Tanımlar
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>İnternet Sitesi/Platform:</strong> Satıcının eğitim ve
                  dijital içerik satışını yaptığı çevrim içi ortam.
                </p>
                <p>
                  <strong>Satıcı/Sağlayıcı:</strong> İşbu formun 2. maddesinde
                  bilgileri yer alan tüzel/gerçek kişi.
                </p>
                <p>
                  <strong>Hizmet:</strong> Ücret karşılığı sunulan online eğitim
                  faaliyetleri (canlı ders, kayıt erişimi, ölçme-değerlendirme,
                  sertifika vb.)
                </p>
                <p>
                  <strong>Dijital İçerik:</strong> Eğitim videoları,
                  canlı/sonradan izlemeli yayınlar, PDF/kitapçık, test/uygulama
                  modülleri vb. gayrimaddi veriler.
                </p>
                <p>
                  <strong>Tüketici/Alıcı:</strong> İnternet Sitesi üzerinden
                  hizmeti/kursu satın alan kişi.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 2 – Satıcı/Sağlayıcı Bilgileri
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Unvan:</strong> Nutriga Akademi
                </p>
                <p>
                  <strong>MERSİS/VKN:</strong> 10659147384
                </p>
                <p>
                  <strong>Adres:</strong> Türkali Mah. Ihlamurdere Cad. Güven
                  Apartmanı No: 124 İç Kapı No: 11 Beşiktaş/İstanbul
                </p>
                <p>
                  <strong>Telefon:</strong> +90 (542) 104 57 94
                </p>
                <p>
                  <strong>E-posta:</strong> info@nutrigaakademi.com
                </p>
                <p>
                  <strong>Şikâyet/İletişim Kanalı:</strong>{" "}
                  info@nutrigaakademi.com
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 3 – Hizmetin/Kursun Temel Nitelikleri
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Kurs/Plan Adı:</strong> [Satın alınan eğitim adı]
                </p>
                <p>
                  <strong>Türü:</strong> Online eğitim
                </p>
                <p>
                  <strong>Kapsam:</strong> Modüller, toplam saat, ders dili,
                  materyaller, ölçme-değerlendirme, sertifika koşulları
                </p>
                <p>
                  <strong>İfa/Erişim:</strong>
                </p>
                <ul className="ml-4 space-y-1">
                  <li>
                    • <strong>Kayıtlı içerikler:</strong> Ödeme onayı sonrası
                    hesapta erişim açılmaktadır.
                  </li>
                  <li>
                    • <strong>Canlı dersler:</strong> İlan edilen tarih-saatte
                    çevrim içi sınıfa katılım bağlantısı sağlanır.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 4 – Fiyat, Vergiler ve Ödeme
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Vergiler dâhil toplam bedel:</strong> ₺{subtotal}
                </p>
                <p>
                  <strong>Ödeme Yöntemleri:</strong> Kredi/Banka Kartı, Dijital
                  Cüzdan
                </p>
                <p>
                  <strong>Ek Masraf:</strong> Yok
                </p>
                <p>
                  <strong>Ödeme Yükümlülüğü Uyarısı:</strong> Ödeme öncesi
                  ekranda siparişin ödeme yükümlülüğü doğurduğu açıkça
                  gösterilir.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 5 – Teknik Gereksinimler
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Asgari Bağlantı ve Cihaz:</strong> İnternet
                  bağlantısı, uyumlu tarayıcı
                </p>
                <p>
                  <strong>Teknik Koruma Önlemleri:</strong> Sadece akış
                  (streaming); indirme yok; DRM; eşzamanlı cihaz sınırı
                </p>
                <p>
                  <strong>Donanım/Yazılım Uyumluluğu:</strong> Uyumlu cihaz/OS
                  ve tarayıcılar; gerekli güncellemeler
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 6 – Cayma Hakkı, Kullanımı ve İstisnalar
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Genel Kural:</strong> Tüketici, 14 gün içinde herhangi
                  bir gerekçe göstermeksizin cayabilir.
                </p>
                <p>
                  <strong>Cayma Bildirimi Kanalları:</strong>{" "}
                  info@nutrigaakademi.com
                </p>
                <p>
                  <strong>İade Süreci:</strong> Cayma bildiriminin ulaşmasından
                  itibaren 14 gün içinde, tahsilat yöntemiyle uyumlu şekilde
                  bedel iadesi yapılır.
                </p>
                <p>
                  <strong>Cayma Hakkının Kullanılamadığı Hâller:</strong>
                </p>
                <ul className="ml-4 space-y-1">
                  <li>• Elektronik ortamda anında ifa edilen hizmetler</li>
                  <li>• Tüketiciye anında teslim edilen gayrimaddi mallar</li>
                  <li>
                    • Cayma süresi dolmadan, tüketicinin açık onayıyla ifasına
                    başlanan hizmetler
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 7 – Teslim/İfa ve Hizmet Sürekliliği
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Kayıtlı içerikler:</strong> Ödeme onayı sonrası
                  erişim.
                </p>
                <p>
                  <strong>Canlı dersler:</strong> Duyurulan takvimde icra
                  edilir; mücbir sebeple yapılamazsa telafi dersi planlanır veya
                  makul iade yapılır.
                </p>
                <p>
                  <strong>Bakım/İyileştirme:</strong> Planlı bakım kesintileri
                  makul süre önce duyurulur.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 8 – Kişisel Veriler ve Ticari İletiler
              </h3>
              <p>
                Tüketici verileri, Aydınlatma Metni ve Gizlilik Politikası
                doğrultusunda işlenir. Ticari elektronik ileti onayı (varsa)
                ayrıca alınır; reddetme hakkı saklıdır.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 9 – Şikâyet/Başvuru ve Uyuşmazlık Çözümü
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Şikâyet/Çözüm:</strong> info@nutrigaakademi.com
                </p>
                <p>
                  <strong>Yargı Yolu:</strong> Parasal sınırlar dâhilinde
                  İstanbul Tüketici Hakem Heyetleri, üzerindeki tutarlar için
                  İstanbul Tüketici Mahkemeleri.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 10 – İlave Ödemeler ve Sözleşmenin Kurulması
              </h3>
              <p>
                Esas bedel dışında ilave bir ödeme talebi için açık onay
                zorunludur. Tüketici, sipariş ekranında Ön Bilgilendirme
                Formu&apos;nu onaylar; &quot;Siparişi Tamamla – Ödeme
                Yükümlülüğü&quot; butonuna basmasıyla sözleşme kurulur.
              </p>
            </div>

            <div className="space-y-4 bg-yellow-50 p-4 border-l-4 border-yellow-400">
              <h3 className="text-lg font-semibold text-red-600">
                Madde 11 – Tüketici Onay Beyanları (Önemli)
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="text-red-600 font-medium">
                    ☑{" "}
                    <strong>
                      Dijital içeriğin anında ifasına açık rıza gösteriyorum
                    </strong>{" "}
                    ve bu nedenle{" "}
                    <strong className="text-red-700">
                      cayma hakkımı kaybedeceğimi
                    </strong>{" "}
                    biliyorum.
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-red-600 font-medium">
                    ☑{" "}
                    <strong>
                      Canlı eğitimin 14 günlük süre dolmadan başlamasına açık
                      rıza gösteriyorum
                    </strong>{" "}
                    ve bu nedenle{" "}
                    <strong className="text-red-700">
                      cayma hakkımı kaybedeceğimi
                    </strong>{" "}
                    biliyorum.
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-red-600 font-medium">
                    ☑ <strong>Siparişin ödeme yükümlülüğü</strong> doğurduğunu
                    biliyorum.
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                Bu onaylar yasal zorunluluktur ve &quot;Kabul Ediyorum&quot;
                butonuna basmanızla aktif hale gelir.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 12 – Alıcı Teyidi
              </h3>
              <p>
                Tüketici, işbu Ön Bilgilendirme Formu&apos;ndaki tüm hususları{" "}
                <strong>ödeme yapmadan önce</strong> okuduğunu, anladığını ve{" "}
                <strong>kalıcı veri saklayıcısı</strong> ile kendisine
                sunulduğunu <strong>kabul ve beyan eder</strong>.
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Ad-Soyad:</strong> [Müşteri Adı]
                </p>
                <p>
                  <strong>Tarih/Saat:</strong>{" "}
                  {new Date().toLocaleString("tr-TR")}
                </p>
                <p>
                  <strong>IP:</strong> [Sistemce kaydedilir]
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 pt-4 border-t bg-white">
          <div className="flex justify-center">
            <Button
              onClick={onAccept}
              className="bg-primary hover:bg-primary/90 px-8 py-2"
            >
              Kabul Ediyorum
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
