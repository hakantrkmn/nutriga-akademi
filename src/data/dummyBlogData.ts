import { BlogPost } from "@/types";

export const blogCategories = [
  "Tümü",
  "Beslenme Bilimi",
  "Diyet Rehberi",
  "Sağlıklı Tarifler",
  "Sporcu Beslenmesi",
  "Çocuk Beslenmesi",
  "Yaşlı Beslenmesi",
  "Hastalık ve Beslenme"
];

export const dummyBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Protein İhtiyacınızı Doğru Hesaplama Yöntemleri",
    content: {
      "type": "doc",
      "content": [
        {
          "type": "heading",
          "attrs": { "level": 2 },
          "content": [
            { "type": "text", "text": "Protein Nedir ve Neden Önemlidir?" }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            { "type": "text", "text": "Protein, vücudumuzun temel yapı taşlarından biridir. Kas dokularının onarımı, hormon üretimi ve bağışıklık sistemi fonksiyonları için kritik öneme sahiptir." }
          ]
        },
        {
          "type": "heading",
          "attrs": { "level": 3 },
          "content": [
            { "type": "text", "text": "Günlük Protein İhtiyacı Nasıl Hesaplanır?" }
          ]
        },
        {
          "type": "bulletList",
          "content": [
            {
              "type": "listItem",
              "content": [
                {
                  "type": "paragraph",
                  "content": [
                    { "type": "text", "text": "Sedanter bireyler: 0.8-1.0 g/kg vücut ağırlığı" }
                  ]
                }
              ]
            },
            {
              "type": "listItem",
              "content": [
                {
                  "type": "paragraph",
                  "content": [
                    { "type": "text", "text": "Aktif bireyler: 1.2-1.6 g/kg vücut ağırlığı" }
                  ]
                }
              ]
            },
            {
              "type": "listItem",
              "content": [
                {
                  "type": "paragraph",
                  "content": [
                    { "type": "text", "text": "Sporcular: 1.6-2.2 g/kg vücut ağırlığı" }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "attrs": { "level": 3 },
          "content": [
            { "type": "text", "text": "Kaliteli Protein Kaynakları" }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            { "type": "text", "text": "Tam protein içeren gıdalar arasında yumurta, et, balık, süt ürünleri ve kinoa yer alır. Bitkisel protein kaynakları da çeşitlendirilerek kombinlenmelidir." }
          ]
        }
      ]
    },
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "protein-ihtiyacini-dogru-hesaplama-yontemleri",
    category: "Beslenme Bilimi",
    excerpt: "Günlük protein ihtiyacınızı doğru hesaplama yöntemlerini öğrenerek sağlıklı beslenme planınızı optimize edin.",
    author: "Dr. Ayşe Nutritionist",
    created_at: "2024-01-15",
    updated_at: "2024-01-15"
  },
  {
    id: "2", 
    title: "Kış Aylarında Bağışıklık Güçlendiren Beslenme",
    content: `
      <h2>Kış Aylarında Bağışıklık Sistemi</h2>
      <p>Soğuk havalarda bağışıklık sistemimiz daha fazla zorlanır. Doğru beslenme ile bu süreci destekleyebiliriz.</p>
      
      <h3>Bağışıklık Güçlendiren Vitaminler</h3>
      <ul>
        <li><strong>Vitamin C:</strong> Narenciye, kırmızı biber, brokoli</li>
        <li><strong>Vitamin D:</strong> Balık, yumurta sarısı, güneş ışığı</li>
        <li><strong>Çinko:</strong> Et, kabuklu yemişler, tohum</li>
      </ul>

      <p>Bu besinleri günlük diyetinize dahil ederek kış aylarında sağlıklı kalabilirsiniz.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "kis-aylarinda-bagisiklik-guclendiren-beslenme",
    category: "Beslenme Bilimi",
    excerpt: "Kış aylarında bağışıklık sisteminizi güçlendiren besinler ve beslenme önerileri ile sağlıklı kalın.",
    author: "Dyt. Mehmet Beslenme",
    created_at: "2024-01-10",
    updated_at: "2024-01-10"
  },
  {
    id: "3",
    title: "Çocuklarda Sağlıklı Atıştırmalık Seçenekleri",
    content: `
      <h2>Çocuklarda Atıştırmalık Önemi</h2>
      <p>Çocukların büyüme ve gelişimi için düzenli beslenme kritiktir. Sağlıklı atıştırmalıklar enerji seviyelerini dengeler.</p>
      
      <h3>Sağlıklı Atıştırmalık Önerileri</h3>
      <ul>
        <li>Meyveli yoğurt</li>
        <li>Çiğ sebze çubukları ile humus</li>
        <li>Tam tahıl krakerleri ve peynir</li>
        <li>Ev yapımı smoothie</li>
        <li>Kabuklu yemiş karışımları (yaş uygunsa)</li>
      </ul>

      <h3>Kaçınılması Gerekenler</h3>
      <p>İşlenmiş gıdalar, şekerli içecekler ve trans yağ içeren atıştırmalıklardan uzak durulmalıdır.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "cocuklarda-saglikli-atistirmalik-secenekleri",
    category: "Çocuk Beslenmesi",
    excerpt: "Çocuklarınız için sağlıklı ve besleyici atıştırmalık seçenekleri ile doğru beslenme alışkanlıkları kazandırın.",
    author: "Dyt. Zeynep Çocuk",
    created_at: "2024-01-08",
    updated_at: "2024-01-08"
  },
  {
    id: "4",
    title: "Spor Öncesi ve Sonrası Beslenme Rehberi",
    content: `
      <h2>Spor Performansında Beslenmenin Rolü</h2>
      <p>Doğru beslenme timing'i spor performansını ve toparlanmayı doğrudan etkiler.</p>
      
      <h3>Spor Öncesi Beslenme (2-3 saat önce)</h3>
      <ul>
        <li>Karbonhidrat ağırlıklı öğünler</li>
        <li>Orta miktarda protein</li>
        <li>Düşük yağ ve lif içeriği</li>
        <li>Bol sıvı tüketimi</li>
      </ul>

      <h3>Spor Sonrası Beslenme (30-60 dakika içinde)</h3>
      <ul>
        <li>Protein ve karbonhidrat kombinasyonu</li>
        <li>3:1 karbonhidrat:protein oranı</li>
        <li>Sıvı kaybının yerine konması</li>
      </ul>
    `,
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "spor-oncesi-ve-sonrasi-beslenme-rehberi", 
    category: "Sporcu Beslenmesi",
    excerpt: "Spor performansınızı artırmak için spor öncesi ve sonrası beslenme stratejilerini öğrenin.",
    author: "Dr. Ahmet Sporcu",
    created_at: "2024-01-05",
    updated_at: "2024-01-05"
  },
  {
    id: "5",
    title: "Evde Kolayca Yapabileceğiniz Sağlıklı Tarifler",
    content: `
      <h2>Pratik ve Sağlıklı Yemek Tarifleri</h2>
      <p>Yoğun tempoda sağlıklı beslenmeyi sürdürmek için pratik tarifler büyük önem taşır.</p>
      
      <h3>Quinoa Salatası</h3>
      <p><strong>Malzemeler:</strong> 1 su bardağı quinoa, domates, salatalık, maydanoz, limon, zeytinyağı</p>
      <p><strong>Hazırlanışı:</strong> Quinoa'yı haşlayın, sebzeleri doğrayıp karıştırın, sosla lezzetlendirin.</p>

      <h3>Fırında Sebzeli Tavuk</h3>
      <p>Düşük yağlı, yüksek proteinli ve lezzetli bir ana yemek seçeneği.</p>
      
      <h3>Chia Pudingi</h3>
      <p>Omega-3 bakımından zengin, tok tutan sağlıklı bir tatlı alternatifi.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", 
    slug: "evde-kolayca-yapabileceginiz-saglikli-tarifler",
    category: "Sağlıklı Tarifler",
    excerpt: "Evde kolayca uygulayabileceğiniz besleyici ve lezzetli tariflerle sağlıklı beslenmeyi sürdürün.",
    author: "Dyt. Fatma Tarif",
    created_at: "2024-01-03",
    updated_at: "2024-01-03"
  },
  {
    id: "6",
    title: "Yaşlılıkta Beslenme: Dikkat Edilmesi Gerekenler",
    content: `
      <h2>Yaşlılık Döneminde Beslenme Değişiklikleri</h2>
      <p>Yaş ilerledikçe metabolizma yavaşlar ve besin ihtiyaçları değişir. Bu dönemde beslenme özellikle önemlidir.</p>
      
      <h3>Yaşlılarda Artan İhtiyaçlar</h3>
      <ul>
        <li><strong>Protein:</strong> Kas kaybını önlemek için</li>
        <li><strong>Kalsiyum ve Vitamin D:</strong> Kemik sağlığı için</li>
        <li><strong>B12 Vitamini:</strong> Emilim sorunları nedeniyle</li>
        <li><strong>Sıvı:</strong> Susama hissinin azalması nedeniyle</li>
      </ul>

      <h3>Beslenme Önerileri</h3>
      <p>Küçük sık öğünler, yumuşak dokulu gıdalar ve çeşitli besin gruplarından seçimler yapılmalıdır.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "yaslilkta-beslenme-dikkat-edilmesi-gerekenler",
    category: "Yaşlı Beslenmesi", 
    excerpt: "Yaşlılık döneminde sağlıklı beslenme için dikkat edilmesi gereken noktalar ve özel beslenme önerileri.",
    author: "Prof. Dr. Aylin Geriatri",
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }
];