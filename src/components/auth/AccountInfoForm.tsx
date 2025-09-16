"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ScrollArea } from "../../components/ui/scroll-area";

interface AccountInfoFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  kvkkAccepted: boolean;
  setKvkkAccepted: (value: boolean) => void;
  notificationPermission: boolean;
  setNotificationPermission: (value: boolean) => void;
}

export function AccountInfoForm({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  kvkkAccepted,
  setKvkkAccepted,
  notificationPermission,
  setNotificationPermission,
}: AccountInfoFormProps) {
  const [isKvkkModalOpen, setIsKvkkModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Şifre *</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Şifre (Tekrar) *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {/* KVKK Onay Checkbox */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="kvkk-accept"
            checked={kvkkAccepted}
            onCheckedChange={(checked: boolean) => setKvkkAccepted(checked)}
            className="mt-1"
          />
          <div className="text-sm leading-relaxed">
            <Label
              htmlFor="kvkk-accept"
              className="text-gray-700 font-normal cursor-pointer"
            >
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel
              verilerimin işlenmesine ilişkin{" "}
              <Dialog open={isKvkkModalOpen} onOpenChange={setIsKvkkModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary-600 hover:text-primary-700 underline font-medium"
                    onClick={() => setIsKvkkModalOpen(true)}
                  >
                    Aydınlatma Metni&apos;ni
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                      6698 SAYILI KİŞİSEL VERİLERİN KORUNMASI KANUNU VE BU KANUN
                      KAPSAMINDAKİ HAKLARINIZ İLE İLGİLİ BİLGİLENDİRME, BEYAN VE
                      ONAY FORMU
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-4 text-sm leading-relaxed">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          Şirketimiz, tarafımıza iletmiş olduğunuz kişisel
                          bilgilerinizin güvenliğinin sağlanmasına son derece
                          önem vermektedir. 6698 Sayılı &ldquo;Kişisel Verilerin
                          Korunması Kanunu&rdquo; yürürlüğe girmiştir.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Kişisel Veri:
                        </h3>
                        <p className="text-gray-700">
                          Kimliği belirli veya belirlenebilir gerçek kişiye
                          ilişkin her türlü bilgiyi.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Kişisel Verilerin İşlenmesi:
                        </h3>
                        <p className="text-gray-700">
                          Kişisel verilerin tamamen veya kısmen otomatik olan ya
                          da herhangi bir veri kayıt sisteminin parçası olmak
                          kaydıyla otomatik olmayan yollarla elde edilmesi,
                          kaydedilmesi, depolanması, muhafaza edilmesi,
                          değiştirilmesi, yeniden düzenlenmesi, açıklanması,
                          aktarılması, devralınması, elde edilebilir hâle
                          getirilmesi, sınıflandırılması ya da kullanılmasının
                          engellenmesi gibi veriler üzerinde gerçekleştirilen
                          her türlü işlemi.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Veri İşleyen:
                        </h3>
                        <p className="text-gray-700">
                          Veri sorumlusunun verdiği yetkiye dayanarak onun adına
                          kişisel verileri işleyen gerçek veya tüzel kişiyi.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Veri Kayıt Sistemi:
                        </h3>
                        <p className="text-gray-700">
                          Kişisel verilerin belirli kriterlere göre
                          yapılandırılarak işlendiği kayıt sistemi.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Veri Sorumlusu:
                        </h3>
                        <p className="text-gray-700">
                          Kişisel verilerin işleme amaçlarını ve vasıtalarını
                          belirleyen, veri kayıt sisteminin kurulmasından ve
                          yönetilmesinden sorumlu olan gerçek veya tüzel kişiyi.
                        </p>
                        <p className="text-gray-700 mt-2">
                          Kanun kapsamında şirketimiz veri sorumlusu olarak
                          hareket etmektedir.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Kişisel Verilerinizin İşlenmesi:
                        </h3>
                        <p className="text-gray-700">
                          Veri sorumlusu sıfatı ile Şirketimiz ve Şirketimiz
                          adına şubelerimiz, alt acentelerimiz, çağrı
                          merkezimiz, bağlı şirketlerimiz tarafından ya da
                          internet sitelerimiz ile sosyal medya sayfalarımız
                          veya ve bunlarla sınırlı olmamak üzere her türlü
                          kanallar aracılığı ile; kişisel ve/veya özel nitelikli
                          kişisel verileriniz; tamamen veya kısmen elde
                          edilebilir, kaydedilebilir, depolanabilir,
                          değiştirilebilir, güncellenebilir, periyodik olarak
                          kontrol edilebilir, yeniden düzenlenebilir,
                          sınıflandırılabilir, işlendikleri amaç için gerekli
                          olan ya da ilgili kanunda öngörülen süre kadar
                          muhafaza edilebilir, kanuni ya da hizmete bağlı fiili
                          gereklilikler halinde Şirketimizin birlikte çalıştığı
                          ya da kanunen yükümlü olduğu kamu kurum ve
                          kuruluşlarıyla ve/veya T&uuml;rkiye&apos;de veya yurt
                          dışında mukim olan 3. kişi gerçek kişi/tüzel kişi,
                          hizmet sağlayıcı ve tedarikçi firmalar, sigorta
                          şirketleri ile Şirketimiz ve/veya Şirketimizin alt
                          acenteleri ile paylaşılabilir, kanuni ya da hizmete
                          bağlı fiili gereklilikler halinde yurtdışına
                          aktarılabilir ya da kullanılmasının engellenmesi de
                          dahil olmak üzere işlenebilir.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Müşterilerimizin Hakları:
                        </h3>
                        <p className="text-gray-700 mb-2">
                          6698 sayılı kanunun 11. Maddesi çerçevesinde
                          şirketimize başvurarak;
                        </p>
                        <ul className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                          <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                          <li>
                            Kişisel verileri işlenmişse buna ilişkin bilgi talep
                            etme,
                          </li>
                          <li>
                            Kişisel verilerin işlenme amacını ve bunların
                            amacına uygun kullanıp kullanılmadığını öğrenme,
                          </li>
                          <li>
                            Yurt içinde veya yurt dışında kişisel verilerin
                            aktarıldığı üçüncü kişileri bilme,
                          </li>
                          <li>
                            Kişisel verilerin eksik veya yanlış işlenmiş olması
                            hâlinde bunların düzeltilmesini isteme,
                          </li>
                          <li>
                            Kanun&apos;un 7 nci maddesinde öngörülen şartlar
                            çerçevesinde kişisel verilerin silinmesini veya yok
                            edilmesini isteme,
                          </li>
                          <li>
                            Yukarıdaki 5 ve 6. talepler uyarınca yapılan
                            işlemlerin, kişisel verilerin aktarıldığı üçüncü
                            kişilere bildirilmesini isteme,
                          </li>
                          <li>
                            İşlenen verilerin münhasıran otomatik sistemler
                            vasıtasıyla analiz edilmesi suretiyle kişinin
                            kendisi aleyhine bir sonucun ortaya çıkmasına itiraz
                            etme,
                          </li>
                          <li>
                            Kişisel verilerin kanuna aykırı olarak işlenmesi
                            sebebiyle zarara uğraması hâlinde zararın
                            giderilmesini talep etme haklarına sahipsiniz.
                          </li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          <strong>Önemli:</strong> Yukarıda yapılan açıklamalar
                          çerçevesinde işbu bilgilendirme, beyan ve onay
                          formunu, yüz yüze veya Mesafeli Sözleşmeler
                          Yönetmeliği&apos;nin 4. maddesi&apos;nin (c) bendi
                          uyarınca, kısa mesaj, elektronik posta, internet,
                          disk, CD, DVD, hafıza kartı ve benzeri her türlü araç
                          veya ortamdan birini kullanarak okuyup, anladığımı ve
                          bu şekilde alınan aşağıdaki beyanımın geçerli olduğunu
                          kabul ediyorum.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="flex justify-end mt-4">
                    <Button onClick={() => setIsKvkkModalOpen(false)}>
                      Kapat
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>{" "}
              &apos;ni okudum ve kişisel verilerimin yukarıda açıklanan şekilde
              işlenmesine onay veriyorum. *
            </Label>
          </div>
        </div>

        {/* Notification Permission Checkbox */}
        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="notification-permission"
            checked={notificationPermission}
            onCheckedChange={(checked: boolean) =>
              setNotificationPermission(checked)
            }
            className="mt-1"
          />
          <div className="text-sm leading-relaxed">
            <Label
              htmlFor="notification-permission"
              className="text-gray-700 font-normal cursor-pointer"
            >
              Dijital posta, e-posta bildirim, kampanya ve bilgilendirmelerden
              haberdar olmak istiyorum.
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
