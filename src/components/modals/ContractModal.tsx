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
                  <strong>ALICI:</strong> [Müşteri bilgileri]
                </p>
                <p>
                  <strong>AD-SOYAD:</strong> [Müşteri adı]
                </p>
                <p>
                  <strong>ADRES:</strong> [Müşteri adresi]
                </p>
                <p>
                  <strong>SATICI:</strong> NutriHome Akademi
                </p>
                <p>
                  <strong>ŞİRKET UNVANI:</strong> [Şirket unvanı]
                </p>
                <p>
                  <strong>ADRES:</strong> [Şirket adresi]
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
                İşbu Sözleşme, ALICI&apos;nın Platform üzerinden eğitim
                hizmetini satın almasına ve bu kapsamda dijital içeriğe
                erişimine ilişkin olarak tarafların hak ve yükümlülüklerini
                düzenler.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 8 – Cayma Hakkı ve İstisnalar
              </h3>
              <p>
                ALICI, hizmet sözleşmelerinde sözleşmenin kurulduğu günden
                itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma
                hakkına sahiptir. Cayma bildirimi yazılı veya kalıcı veri
                saklayıcısı ile yapılır.
              </p>
              <p>
                <strong>İstisnalar:</strong> Elektronik ortamda anında ifa
                edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi
                mallar için cayma hakkı kullanılamaz.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Madde 15 – Yürürlük
              </h3>
              <p>
                ALICI&apos;nın Platform üzerinden &quot;Siparişi Tamamla – Ödeme
                Yükümlülüğü&quot; butonuna basmasıyla işbu Sözleşme yürürlüğe
                girer.
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
