"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContractModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  children: React.ReactNode;
}

export default function ContractModal({
  isOpen,
  onOpenChange,
  onAccept,
  children,
}: ContractModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
            Mesafeli Satış Sözleşmesi
          </DialogTitle>
          <div className="text-center text-sm text-gray-600 mt-2">
            <p>
              <strong>Sürüm:</strong> {new Date().toLocaleDateString("tr-TR")}
            </p>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1 py-4">
          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 1 – Taraflar
              </h3>
              <p>
                Taraflar arasında imza altına alınacak işbu sözleşme aşağıda
                belirtilen şart ve hükümler kapsamında tarafların ortak
                mutabakatı ile imzalanmıştır. Taraflar arasında, 4077 sayılı
                Tüketicilerin Korunması Hakkındaki Kanun ve Mesafeli
                Sözleşmeleri Uygulama Esas ve Usulleri Hakkında Yönetmelik
                hükümlerine uygun olarak, hak ve yükümlülüklerin belirlenmesine
                dairdir.
              </p>
              <div className="space-y-2">
                <p>
                  <strong>ALICI:</strong> Satın alım yapan kişi
                </p>
                <p>
                  <strong>AD-SOYAD:</strong> Sipariş sırasında belirtilir
                </p>
                <p>
                  <strong>ADRES:</strong> Sipariş sırasında belirtilir
                </p>
                <p>
                  <strong>SATICI:</strong> Nutriga Akademi
                </p>
                <p>
                  <strong>ŞİRKET UNVANI:</strong> Nutriga Akademi
                </p>
                <p>
                  <strong>ADRES:</strong> Türkali Mah. Ihlamurdere Cad. Güven
                  Apartmanı No: 124 İç Kapı No: 11 Beşiktaş/İstanbul
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 2 – Tanımlar
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>a) Dijital içerik:</strong> Bilgisayar programı,
                  uygulama, oyun, müzik, video ve metin gibi dijital şekilde
                  sunulan her türlü veriyi,
                </p>
                <p>
                  <strong>b) Hizmet:</strong> Bir ücret veya menfaat
                  karşılığında yapılan ya da yapılması taahhüt edilen mal
                  sağlama dışındaki her türlü tüketici işleminin konusunu,
                </p>
                <p>
                  <strong>c) Kalıcı veri saklayıcısı:</strong> Tüketicinin
                  gönderdiği veya kendisine gönderilen bilgiyi, bu bilginin
                  amacına uygun olarak makul bir süre incelemesine elverecek
                  şekilde kaydedilmesini ve değiştirilmeden kopyalanmasını
                  sağlayan ve bu bilgiye aynen ulaşılmasına imkan veren kısa
                  mesaj, elektronik posta, internet, disk, CD, DVD, hafıza kartı
                  ve benzeri her türlü araç veya ortamı,
                </p>
                <p>
                  <strong>ç) Kanun:</strong> 6502 sayılı Tüketicinin Korunması
                  Hakkında Kanunu,
                </p>
                <p>
                  <strong>d) Mal:</strong> Alışverişe konu olan; taşınır eşya,
                  konut veya tatil amaçlı taşınmaz mallar ile elektronik ortamda
                  kullanılmak üzere hazırlanan yazılım, ses, görüntü ve benzeri
                  her türlü gayri maddi malları,
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 3 – Konu ve Kapsam
              </h3>
              <p>
                <strong>3.1.</strong> İşbu Sözleşme, ALICI &apos;nın Platform
                üzerinden [kurs/abone planı/ürün adı] eğitim hizmetini satın
                almasına ve bu kapsamda dijital içeriğe erişimine ilişkin olarak
                tarafların hak ve yükümlülüklerini düzenler.
              </p>
              <p>
                <strong>3.2.</strong> Sözleşme, mesafeli sözleşmelere ilişkin
                zorunlu unsurları kapsar ve Ön Bilgilendirme Formu ile birlikte
                bir bütündür.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 8 – Cayma Hakkı ve İstisnalar
              </h3>
              <p>
                <strong>8.1.</strong> ALICI, hizmet sözleşmelerinde{" "}
                <strong>
                  sözleşmenin kurulduğu günden itibaren 14 gün içinde
                </strong>{" "}
                herhangi bir gerekçe göstermeksizin cayma hakkına sahiptir.
                Cayma bildirimi yazılı veya kalıcı veri saklayıcısı ile yapılır;
                Platform üzerinden cayma iletildiğinde alındı teyidi derhal
                verilir.
              </p>
              <p>
                <strong>8.2. İstisnalar (MSY m.15):</strong>
              </p>
              <div className="ml-4 space-y-2">
                <p>
                  a){" "}
                  <strong>
                    Elektronik ortamda anında ifa edilen hizmetler veya
                    tüketiciye anında teslim edilen gayrimaddi mallar
                  </strong>{" "}
                  için cayma hakkı <strong>kullanılamaz</strong>. Nutriga
                  Akademi tarafından sağlanan hizmet bu kapsamda olup cayma
                  hakkı kullanılamaz.
                </p>
                <p>
                  b){" "}
                  <strong>
                    Cayma süresi dolmadan, ALICI&apos;nın açık onayıyla ifasına
                    başlanan hizmetlere
                  </strong>{" "}
                  ilişkin sözleşmelerde{" "}
                  <strong>cayma hakkı kullanılamaz</strong>.
                </p>
              </div>
              <p>
                <strong>8.3.</strong> Bu istisnalar nedeniyle,{" "}
                <strong>anında erişim</strong> sağlanan ürünler için{" "}
                <strong>sipariş ekranında</strong> aşağıdaki ifadeye onay
                alınır:
              </p>
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                <p className="italic font-medium text-red-600">
                  &quot;
                  <strong>
                    Dijital içeriğin anında ifasına başlanmasına onay veriyorum
                    ve bu nedenle cayma hakkımı kaybedeceğimi biliyorum.
                  </strong>
                  &quot;
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 9 – Fikri ve Sınai Mülkiyet Hakları / Lisans
              </h3>
              <p>
                <strong>9.1.</strong> Tüm eğitim içerikleri Nutriga Akademi veya
                ilgili hak sahiplerine aittir. ALICI&apos;ya{" "}
                <strong>kişisel, devredilemez ve münhasır olmayan</strong>{" "}
                sınırlı bir kullanım hakkı tanınır.
              </p>
              <p>
                <strong>9.2.</strong> İçeriklerin{" "}
                <strong>
                  kopyalanması, paylaşılması, yeniden satışı, umuma iletimi,
                  üçüncü kişilere kullandırılması
                </strong>{" "}
                yasaktır.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 13 – Şikayet ve Uyuşmazlık Çözümü
              </h3>
              <p>
                <strong>13.1.</strong> ALICI, her türlü talep ve şikâyetini{" "}
                <strong>info@nutrigaakademi.com</strong> kanalıyla iletebilir.
              </p>
              <p>
                <strong>13.2.</strong> ALICI, parasal sınırlar dahilinde{" "}
                <strong>İstanbul Tüketici Hakem Heyeti</strong>ne; üzerindeki
                tutarlar için <strong>İstanbul Tüketici Mahkemeleri</strong>ne
                başvurabilir.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 15 – Yürürlük
              </h3>
              <p>
                <strong>15.1.</strong> ALICI&apos;nın Platform üzerinden
                &quot;Siparişi Tamamla – Ödeme Yükümlülüğü&quot; butonuna
                basmasıyla işbu Sözleşme yürürlüğe girer. (Sürüm:{" "}
                <strong>{new Date().toLocaleDateString("tr-TR")}</strong>)
              </p>
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
