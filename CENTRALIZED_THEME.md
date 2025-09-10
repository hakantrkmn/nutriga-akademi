# 🎨 Centralized Theme System - Nutriga Akademi

Bu dokümantasyon, Nutriga Akademi projesinde uygulanan centralized tema sistemini açıklar.

## 📋 Genel Bakış

Proje artık tamamen centralized tema kontrolüne sahiptir. Tüm renkler CSS değişkenleri ile yönetilir ve tek bir yerden kontrol edilebilir.

## 🎯 Özellikler

- ✅ **Centralized Control**: Tüm renkler `globals.css` dosyasında tanımlı
- ✅ **CSS Variables**: Modern CSS değişkenleri kullanımı
- ✅ **Utility Classes**: Kolay kullanım için utility class'lar
- ✅ **Consistent Design**: Tüm bileşenler aynı renk paletini kullanır
- ✅ **Easy Maintenance**: Renk değişiklikleri tek dosyadan yapılır

## 🎨 Mevcut Tema: Adaçayı (Sage)

- **Primary**: `#4a7c59` (Koyu yeşil)
- **Primary Hover**: `#2d5a3f` (Daha koyu yeşil)
- **Accent**: `#9ed2c6` (Mint yeşili)
- **Accent Hover**: `#82c3b4` (Daha koyu mint yeşili)

Bu tema beslenme ve sağlık alanı için mükemmel - doğal, güvenilir ve profesyonel bir görünüm sunuyor.

## 🛠️ Teknik Detaylar

### CSS Değişkenleri

```css
/* Ana renkler */
--primary: #4a7c59;
--primary-hover: #2d5a3f;
--accent: #9ed2c6;
--accent-hover: #82c3b4;

/* Renk skalası */
--primary-50: #f0fdf4;
--primary-100: #dcfce7;
--primary-200: #bbf7d0;
--primary-300: #86efac;
--primary-400: #4ade80;
--primary-500: #22c55e;
--primary-600: #16a34a;
--primary-700: #15803d;
--primary-800: #166534;
--primary-900: #14532d;

/* Gri skalası */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### Utility Classes

```css
/* Primary renkler */
.site-root .bg-primary-600 {
  background-color: var(--primary-600);
}
.site-root .text-primary-600 {
  color: var(--primary-600);
}
.site-root .border-primary-600 {
  border-color: var(--primary-600);
}

/* Hover efektleri */
.site-root .hover\:bg-primary-700:hover {
  background-color: var(--primary-700);
}
.site-root .hover\:text-primary-600:hover {
  color: var(--primary-600);
}
```

## 📁 Dosya Yapısı

```
src/
└── app/
    └── globals.css                 # CSS değişkenleri ve utility class'lar
```

## 🚀 Kullanım

### Bileşenlerde Renk Kullanımı

Artık hardcoded renkler yerine CSS değişkenleri kullanın:

```tsx
// ❌ Eski yöntem
<div className="bg-green-600 text-white">

// ✅ Yeni yöntem
<div className="bg-primary-600 text-white">
```

### Tema Değişikliği

Tema değiştirmek için `globals.css` dosyasındaki CSS değişkenlerini güncelleyin:

```css
.site-root.site-theme-sage {
  --primary: #your-new-color;
  --primary-hover: #your-new-hover-color;
  /* ... diğer renkler */
}
```

## 🔧 Güncellenen Bileşenler

Aşağıdaki bileşenler centralized tema sistemine uygun hale getirildi:

- ✅ `Header.tsx` - Primary renkler
- ✅ `HomeHero.tsx` - CSS değişkenleri kullanımı
- ✅ `CoursesCard.tsx` - Primary renkler
- ✅ `BlogCard.tsx` - Primary renkler
- ✅ `Footer.tsx` - Primary renkler
- ✅ `AdminHeader.tsx` - Primary renkler
- ✅ `ContactInfo.tsx` - Primary renkler
- ✅ `StatCard.tsx` - Primary renkler
- ✅ `BlogManagement.tsx` - Primary renkler

## 🎯 Faydalar

1. **Kolay Bakım**: Tüm renkler tek dosyadan yönetilir
2. **Tutarlılık**: Tüm bileşenler aynı renk paletini kullanır
3. **Hızlı Değişim**: Renk değişiklikleri anında tüm projeye yansır
4. **Modern Yaklaşım**: CSS değişkenleri ile modern web standartları
5. **Performans**: Optimized CSS yapısı

## 📝 Notlar

- Tüm renkler accessibility standartlarına uygun seçilmiştir
- Admin sayfaları tema sisteminden etkilenmez
- CSS değişkenleri modern tarayıcılarda desteklenir
- Utility class'lar kolay kullanım için optimize edilmiştir
