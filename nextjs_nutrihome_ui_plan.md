# NutriHome Akademi - UI Projesi Planı (Next.js + Chakra UI)

## 1️⃣ Genel Konsept
- Amacımız kullanıcı dostu, samimi, gözü yormayan bir diyetisyen / eğitim odaklı web UI.
- UI geliştirme aşamasında **henüz ödeme entegrasyonu yok**, dummy content kullanılacak.
- Her küçük UI parçası ayrı **component** olarak tasarlanacak.
- `page.tsx` sayfalarında yalnızca component çağrısı olacak.
- Tekrarlanan parçalar `/components/common` altında tutulacak.
- Tüm UI responsive olacak (desktop / tablet / mobile).

---

## 2️⃣ Tech Stack
| Katman | Teknoloji | Kullanım Amacı |
|--------|-----------|----------------|
| Frontend | Next.js | Sayfa yapısı, routing, SSR/SSG |
| UI / Component | Chakra UI | Responsive ve modern UI |
| Rich Text Editor | TipTap | Blog ve eğitim içerikleri için WYSIWYG |
| Database | Supabase (PostgreSQL) | Eğitim, blog, dummy kullanıcı verileri |
| Storage | Supabase Storage | Görseller için |
| Auth | Supabase Auth | Admin giriş kontrolü |
| Ödeme | Stripe (ileride) | Eğitim satın alma (dummy şimdilik) |
| Ekstra | React Hook Form, React Icons | Form ve ikon yönetimi |

---

## 3️⃣ Renk Paleti ve Typography
- **Ana Renk:** Soft yeşil (#4CAF50)
- **Accent / CTA:** Turuncu (#FF9800)
- **Arka plan:** Beyaz / soft gri (#FAFAFA / #F5F5F5)
- **Yazı rengi:** Koyu gri (#212121)
- **Fontlar:** Başlık - Poppins / Nunito, Metin - Inter / Roboto
- **UI Öğeleri:** Borderradius 8-12px, bol padding/margin, hover efektleri yumuşak

---

## 4️⃣ Sayfa Yapısı ve Componentler

### **Header**
- Logo + Menü (Ana Sayfa, Kurumsal dropdown, Eğitimler, Blog, İletişim)
- Kayıt Ol (CTA) ve Giriş Yap (Outline)
- Responsive: Hamburger menü mobile/tablet

### **Footer**
- Logo + kısa açıklama
- Hızlı linkler
- Sosyal medya ikonları
- Copyright

### **Hero Section**
- Büyük görsel + başlık + CTA buton
- Responsive: Desktop yan yana, mobile stacked

### **Ana Sayfa**
- Hero Section
- Popüler / Satılan Eğitimler (EgitimCard)
- Blog Yazıları (BlogCard)
- Footer

### **Eğitimler Sayfası**
- EğitimCard grid / liste
- Detay sayfasına yönlendirme (slug)
- Eğitim detay: Başlık, tarih, görsel, TipTap içerik, fiyat, Sepete Ekle butonu

### **Blog Sayfası**
- BlogCard grid / stacked layout
- Kategori filtreleme (dropdown/sidebar)
- Blog detay sayfası: TipTap render + görsel + kategori etiketi

### **Sepet Sayfası**
- SepetItem listesi
- Toplam fiyat
- Ödeme Yap butonu (dummy)

### **İletişim Sayfası**
- Form: İsim, Email, Mesaj, Gönder
- İletişim bilgileri + sosyal medya

### **Kayıt / Giriş Sayfası**
- Supabase Auth admin için
- Giriş sonrası Admin Panel erişimi

### **Admin Paneli**
- Sidebar: Dashboard, Eğitimler, Blog, Çıkış
- Ana içerik: AdminForm + TipTapEditor
- Eğitim/Blog ekleme ve düzenleme
- Sales count ve fiyat yönetimi

---

## 5️⃣ Veritabanı Şeması (Supabase)

### Eğitimler Tablosu
```sql
CREATE TABLE egitimler (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content jsonb,
  image_url text,
  slug text UNIQUE NOT NULL,
  price numeric(10,2),
  sales_count integer DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### Blog Tablosu
```sql
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content jsonb NOT NULL,
  image_url text,
  slug text UNIQUE NOT NULL,
  category text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### Sepet / Geçici Sipariş (opsiyonel)
```sql
CREATE TABLE cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  education_id uuid REFERENCES egitimler(id),
  quantity integer DEFAULT 1,
  created_at timestamp DEFAULT now()
);
```

---

## 6️⃣ Component ve Dosya Organizasyonu

### Klasör Yapısı
```
/components
 ├─ /common      # Tekrarlanan UI parçaları
 │    ├─ Button.tsx
 │    ├─ Card.tsx
 │    ├─ Badge.tsx
 │    ├─ Input.tsx
 │    └─ Modal.tsx
 ├─ Header.tsx
 ├─ Footer.tsx
 ├─ Hero.tsx
 ├─ EğitimCard.tsx
 ├─ BlogCard.tsx
 ├─ SepetItem.tsx
 ├─ TipTapEditor.tsx
 └─ AdminForm.tsx
```

- Her component kendi UI mantığını içerir.
- `page.tsx` sadece component çağırır.
- Admin paneli form ve TipTapEditor ile modüler.

### Örnek page.tsx
```tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularEgitimler />
      <BlogSection />
    </>
  )
}
```

---

## 7️⃣ Routing / Dinamik Sayfalar
- **BlogCard** → `/blog/[slug]` detay sayfasına yönlendirir
- **EgitimCard** → `/egitimler/[slug]` detay sayfasına yönlendirir
- `slug` URL’den alınır ve Supabase’den içerik çekilir

---

## 8️⃣ TipTap Styling / Wrapper
- TipTap içerik default değil, wrapper ile design uyumlu hale getirilir
```tsx
<Box className="tiptap-content" sx={{
  'h1': { fontSize: '2xl', mb: 4, fontWeight: 'bold' },
  'p': { fontSize: 'md', mb: 3, lineHeight: 'tall' },
  'ul': { pl: 5, mb: 3 },
  'li': { mb: 1 },
  'a': { color: 'green.500', _hover: { textDecoration: 'underline' } }
}}>
  <TipTapEditor content={content} readOnly />
</Box>
```
- Chakra UI theme renkleri ve spacing ile tutarlı
- Responsive ve gözü yormayan UI

---

**Not:**
- Şu aşamada sadece **UI odaklı**, ödeme / backend entegrasyonu ileride yapılacak.
- Tüm componentler ayrı, page.tsx kısa, maintainable ve reusable olacak.

