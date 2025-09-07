import { Egitim } from "@/types";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/constants";
import { Prisma } from '@prisma/client' // ✅ Prisma Decimal'ini import edin

export const dummyEgitimler: Egitim[] = [
  {
    id: "1",
    title: "Temel Beslenme İlkeleri ve Makro Besinler",
    description: "Beslenmenin temel prensiplerini, makro besinlerin vücuttaki rollerini ve dengeli beslenme planlamasını kapsamlı olarak öğrenin.",
    content: {
      "type": "doc",
      "content": [
        {
          "type": "heading",
          "attrs": {
            "textAlign": null,
            "level": 1
          },
          "content": [
            {
              "type": "text",
              "text": "çok önemli bir konu"
            }
          ]
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          },
          "content": [
            {
              "type": "imageResize",
              "attrs": {
                "src": "/uploads/1757182098651-IMG_9899.png",
                "alt": null,
                "title": null,
                "width": "160",
                "height": null,
                "containerStyle": "position: relative; width: 160px; height: auto; cursor: pointer; display: inline-block;",
                "wrapperStyle": "display: inline-block; float: left; padding-right: 8px;"
              }
            }
          ]
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          },
          "content": [
            {
              "type": "text",
              "marks": [
                {
                  "type": "textStyle",
                  "attrs": {
                    "color": "#999999"
                  }
                }
              ],
              "text": "bak şu işe yaw."
            },
            {
              "type": "text",
              "marks": [
                {
                  "type": "textStyle",
                  "attrs": {
                    "color": "#999999"
                  }
                },
                {
                  "type": "bold"
                }
              ],
              "text": "kalın yazıoz"
            },
            {
              "type": "text",
              "marks": [
                {
                  "type": "textStyle",
                  "attrs": {
                    "color": "#999999"
                  }
                },
                {
                  "type": "bold"
                },
                {
                  "type": "italic"
                }
              ],
              "text": "italik"
            },
            {
              "type": "text",
              "marks": [
                {
                  "type": "textStyle",
                  "attrs": {
                    "color": "#999999"
                  }
                },
                {
                  "type": "bold"
                },
                {
                  "type": "italic"
                },
                {
                  "type": "underline"
                }
              ],
              "text": "altçizgiliz "
            },
            {
              "type": "text",
              "marks": [
                {
                  "type": "textStyle",
                  "attrs": {
                    "color": "#999999"
                  }
                },
                {
                  "type": "bold"
                },
                {
                  "type": "italic"
                },
                {
                  "type": "underline"
                },
                {
                  "type": "highlight",
                  "attrs": {
                    "color": null
                  }
                }
              ],
              "text": "asdasd"
            },
            {
              "type": "text",
              "marks": [
                {
                  "type": "textStyle",
                  "attrs": {
                    "color": "#999999"
                  }
                }
              ],
              "text": "ad"
            }
          ]
        }
      ]
    },
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "temel-beslenme-ilkeleri-ve-makro-besinler",
    price: 299,
    salesCount: 156,
    level: COURSE_LEVELS[1],
    instructor: "Prof. Dr. Ayşe Beslenme",
    category: COURSE_CATEGORIES[1],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    title: "Klinik Beslenme ve Hastalık Yönetimi",
    description: "Diabetes, hipertansiyon, obezite gibi kronik hastalıklarda beslenme müdahalelerini ve tedavi protokollerini öğrenin.",
    content: `
      <h2>Klinik Beslenme Eğitimi</h2>
      <p>Kronik hastalıkların yönetiminde beslenmenin kritik rolünü ve kanıta dayalı müdahale stratejilerini kapsamlı olarak ele alacağız.</p>
      
      <h3>1. Diabetes Mellitus ve Beslenme</h3>
      <ul>
        <li>Tip 1 ve Tip 2 diabetes arasındaki farklar</li>
        <li>Karbonhidrat sayımı ve porsyon kontrolü</li>
        <li>Glisemik kontrolde beslenmenin rolü</li>
        <li>İnsülin direnci ve beslenme stratejileri</li>
      </ul>

      <h3>2. Kardiyovasküler Hastalıklar</h3>
      <ul>
        <li>DASH diyeti prensipleri</li>
        <li>Kolesterol ve trigliserit yönetimi</li>
        <li>Sodyum kısıtlaması teknikleri</li>
        <li>Akdeniz diyetinin kardiyoprotektif etkileri</li>
      </ul>

      <h3>3. Obezite Yönetimi</h3>
      <ul>
        <li>Enerji dengesi ve kilo kontrolü</li>
        <li>Davranış değişikliği stratejileri</li>
        <li>Bariatrik cerrahi sonrası beslenme</li>
        <li>Metabolik sendrom yaklaşımları</li>
      </ul>

      <p><strong>Sertifikasyon:</strong> Bu eğitimi başarıyla tamamlayanlar, klinik beslenme uzmanlık sertifikası alacaklardır.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "klinik-beslenme-ve-hastalik-yonetimi",
    price: 599,
    salesCount: 89,
    level: COURSE_LEVELS[3],
    instructor: "Doç. Dr. Mehmet Klinik",
    category: COURSE_CATEGORIES[2],
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "3",
    title: "Sporcu Beslenmesi ve Performans Optimizasyonu",
    description: "Spor dallarına özgü beslenme stratejileri, supplementasyon ve performans artırıcı beslenme protokollerini öğrenin.",
    content: `
      <h2>Sporcu Beslenmesi Uzmanlığı</h2>
      <p>Farklı spor dalları için beslenme stratejileri geliştirmeyi ve sporcu performansını optimize etmeyi öğreneceksiniz.</p>
      
      <h3>1. Spor Fizyolojisi ve Beslenme</h3>
      <ul>
        <li>Enerji sistemleri ve metabolizma</li>
        <li>Anaerobik ve aerobik performans</li>
        <li>Kasılma çeşitleri ve besin gereksinimleri</li>
        <li>Toparlanma süreçleri</li>
      </ul>

      <h3>2. Spor Dallarına Özgü Beslenme</h3>
      <ul>
        <li>Dayanıklılık sporları (maraton, bisiklet, yüzme)</li>
        <li>Güç sporları (halter, powerlifting)</li>
        <li>Takım sporları (futbol, basketbol)</li>
        <li>Estetik sporlar (jimnastik, balet)</li>
      </ul>

      <h3>3. Supplementasyon</h3>
      <ul>
        <li>Bilimsel kanıtlarla desteklenen supplementler</li>
        <li>Kreatin, beta-alanin, kafein kullanımı</li>
        <li>Protein tozu ve amino asit takviyesi</li>
        <li>Doping kontrolü ve yasaklı maddeler</li>
      </ul>

      <p><strong>Bonus:</strong> Gerçek sporcu vaka analizleri ve beslenme planı örnekleri dahildir.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "sporcu-beslenmesi-ve-performans-optimizasyonu",
    price: 449,
    salesCount: 134,
    level: COURSE_LEVELS[2],
    instructor: "Dr. Ahmet Spor",
    category: COURSE_CATEGORIES[3],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "4",
    title: "Çocuk ve Adölesan Beslenmesi",
    description: "0-18 yaş arası çocuklarda büyüme dönemlerine özel beslenme, mama geçişi ve beslenme sorunları yönetimini öğrenin.",
    content: `
      <h2>Pediatrik Beslenme Uzmanlaşması</h2>
      <p>Çocukluk döneminin kritik beslenme ihtiyaçlarını ve gelişimsel özelliklerini kapsamlı olarak ele alacağız.</p>
      
      <h3>1. Bebek Beslenmesi (0-12 ay)</h3>
      <ul>
        <li>Anne sütü ve formüla beslenme</li>
        <li>Ek besinlere geçiş (6. aydan itibaren)</li>
        <li>Alerjik reaksiyonlar ve önleme</li>
        <li>Büyüme ve gelişim takibi</li>
      </ul>

      <h3>2. Okul Öncesi Dönem (1-5 yaş)</h3>
      <ul>
        <li>Seçici yeme davranışları</li>
        <li>Porsiyon boyutları ve öğün planlaması</li>
        <li>Sosyal yeme alışkanlıkları</li>
        <li>Beslenme eğitimi teknikleri</li>
      </ul>

      <h3>3. Okul Çağı ve Adölesan (6-18 yaş)</h3>
      <ul>
        <li>Hızlı büyüme dönemlerinde beslenme</li>
        <li>Okul kantini ve dışarıda yeme</li>
        <li>Spor yapan çocuklarda beslenme</li>
        <li>Ergen beslenme sorunları (anoreksiya, bulimia)</li>
      </ul>

      <h3>Özel Durumlar</h3>
      <ul>
        <li>Çölyak hastalığı ve glütensiz beslenme</li>
        <li>Besin alerjileri yönetimi</li>
        <li>Otizm spektrum bozukluğunda beslenme</li>
      </ul>
    `,
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "cocuk-ve-adolesan-beslenmesi",
    price: 399,
    salesCount: 78,
    level: COURSE_LEVELS[2],
    instructor: "Dr. Zeynep Pediatri",
    category: COURSE_CATEGORIES[4],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-22")
  },
  {
    id: "5",
    title: "Yaşlı Beslenmesi ve Geriatrik Yaklaşımlar",
    description: "65 yaş üstü bireylerde yaşa bağlı fizyolojik değişiklikler, beslenme sorunları ve özel bakım gereksinimleri.",
    content: `
      <h2>Geriatrik Beslenme Uzmanlığı</h2>
      <p>Yaşlılık döneminin unique beslenme challenges'larını ve evidence-based çözüm yaklaşımlarını öğreneceksiniz.</p>
      
      <h3>1. Yaşlanma ve Fizyolojik Değişiklikler</h3>
      <ul>
        <li>Metabolizma yavaşlaması ve enerji ihtiyaçları</li>
        <li>Kas kaybı (sarkopeni) ve protein gereksinimleri</li>
        <li>Duyusal değişiklikler (tat, koku kaybı)</li>
        <li>Diş ve çiğneme problemleri</li>
      </ul>

      <h3>2. Yaygın Beslenme Sorunları</h3>
      <ul>
        <li>Malnütrisyon ve erken tanı</li>
        <li>Dehidratasyon ve sıvı dengesi</li>
        <li>İştahsızlık ve kilo kaybı</li>
        <li>Konstipasyon yönetimi</li>
      </ul>

      <h3>3. Kronik Hastalıklar ve Beslenme</h3>
      <ul>
        <li>Alzheimer ve demans hastalarında beslenme</li>
        <li>Parkinson hastalığında yutma güçlükleri</li>
        <li>KOAH'ta beslenme desteği</li>
        <li>Osteoporoz önleme stratejileri</li>
      </ul>

      <h3>Pratik Uygulamalar</h3>
      <p>Yaşlı bakımevleri için menü planlama, texture modified foods, ve aile eğitimi konularını kapsar.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "yasli-beslenmesi-ve-geriatrik-yaklasimlar",
    price: 349,
    salesCount: 45,
    level: COURSE_LEVELS[2],
    instructor: "Prof. Dr. Aylin Geriatri",
    category: COURSE_CATEGORIES[5],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25")
  },
  {
    id: "6",
    title: "Beslenme Danışmanlığı ve Müvekkil İletişimi",
    description: "Etkili danışmanlık teknikleri, motivasyonel görüşme, davranış değişikliği ve uzun vadeli başarı stratejileri.",
    content: `
      <h2>Profesyonel Beslenme Danışmanlığı</h2>
      <p>Danışanlarınızla etkili iletişim kurma, motivasyon sağlama ve sürdürülebilir davranış değişikliği yaratma becerilerini geliştirin.</p>
      
      <h3>1. İletişim Becerileri</h3>
      <ul>
        <li>Aktif dinleme teknikleri</li>
        <li>Empati kurma ve güven oluşturma</li>
        <li>Kültürel hassasiyet</li>
        <li>Zor danışanlarla başa çıkma</li>
      </ul>

      <h3>2. Motivasyonel Görüşme</h3>
      <ul>
        <li>Değişime hazırlık değerlendirmesi</li>
        <li>Ambivalans ile çalışma</li>
        <li>Değişim konuşması güçlendirme</li>
        <li>Dirençle karşılaşma stratejileri</li>
      </ul>

      <h3>3. Davranış Değişikliği</h3>
      <ul>
        <li>Transteoretik model uygulaması</li>
        <li>Hedef belirleme (SMART goals)</li>
        <li>Self-monitoring teknikleri</li>
        <li>Sosyal destek sistemleri</li>
      </ul>

      <h3>4. Danışmanlık Süreci</h3>
      <ul>
        <li>İlk değerlendirme ve anamnez</li>
        <li>Beslenme planı geliştirme</li>
        <li>Takip ve modifikasyon</li>
        <li>Başarı ölçümü ve raporlama</li>
      </ul>

      <p><strong>Özel Bonus:</strong> Gerçek danışmanlık seansı örnekleri ve rol play egzersizleri.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "beslenme-danismanligi-ve-muvekkil-iletisimi",
    price: 549,
    salesCount: 92,
    level: COURSE_LEVELS[3],
    instructor: "Dr. Fatma İletişim",
    category: COURSE_CATEGORIES[6],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-28")
  },
  {
    id: "8",
    title: "Test Eğitimi - Görsel ve İçerik Testi",
    description: "TipTap editor ile oluşturulan içerik test eğitimi. Görseller, başlıklar ve linkler içerir.",
    content: {
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          },
          "content": [
            {
              "type": "image",
              "attrs": {
                "src": "/uploads/1757183684311-instagram_post_image.jpg",
                "alt": "",
                "title": "",
                "width": 197,
                "height": 197,
                "data-keep-ratio": true,
                "className": "",
                "caption": ""
              }
            },
            {
              "type": "image",
              "attrs": {
                "src": "/uploads/1757183576468-instagram_post_image (1).jpg",
                "alt": "",
                "title": "",
                "width": 176,
                "height": 176,
                "data-keep-ratio": true,
                "className": "",
                "caption": ""
              }
            }
          ]
        },
        {
          "type": "heading",
          "attrs": {
            "textAlign": null,
            "level": 1
          },
          "content": [
            {
              "type": "text",
              "text": "Test Başlığı"
            }
          ]
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          },
          "content": [
            {
              "type": "text",
              "marks": [
                {
                  "type": "link",
                  "attrs": {
                    "href": "http://localhost:3000/admin/egitimler/yeni",
                    "target": "_blank",
                    "rel": "noopener noreferrer nofollow",
                    "class": "tiptap-link"
                  }
                }
              ],
              "text": "http://localhost:3000/admin/egitimler/yeni"
            }
          ]
        },
        {
          "type": "heading",
          "attrs": {
            "textAlign": null,
            "level": 2
          },
          "content": [
            {
              "type": "text",
              "text": "Alt Başlık"
            }
          ]
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          },
          "content": [
            {
              "type": "text",
              "text": "Test paragrafı içeriği"
            }
          ]
        },
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": null
          }
        }
      ]
    },
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "test-egitimi-gorsel-ve-icerik-testi",
    price: 299,
    salesCount: 0,
    level: COURSE_LEVELS[1],
    instructor: "Test Eğitmeni",
    category: COURSE_CATEGORIES[1],
    createdAt: new Date("2025-09-06"),
    updatedAt: new Date("2025-09-06")
  }
];