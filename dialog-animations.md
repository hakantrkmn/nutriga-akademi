# Dialog Animasyon Seçenekleri

Modal açılma/kapanma animasyonları için farklı seçenekler:

## Şu anki: Merkeze Fade + Scale (Önerilen)
```css
duration-300 
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-95 
data-[state=open]:zoom-in-95
```

## Alternatif 1: Yukarıdan Aşağı Slide
```css
duration-300 
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0 
data-[state=closed]:slide-out-to-top-full 
data-[state=open]:slide-in-from-top-full
```

## Alternatif 2: Aşağıdan Yukarı (Mobil stilinde)
```css
duration-300 
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0 
data-[state=closed]:slide-out-to-bottom-full 
data-[state=open]:slide-in-from-bottom-full
```

## Alternatif 3: Sağdan Sol Slide
```css
duration-300 
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0 
data-[state=closed]:slide-out-to-right-full 
data-[state=open]:slide-in-from-right-full
```

## Alternatif 4: Sadece Fade (En basit)
```css
duration-200 
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0
```

## Alternatif 5: Bounce Effect
```css
duration-500 
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-75 
data-[state=open]:zoom-in-110
```

Değiştirmek için `src/components/ui/dialog.tsx` dosyasındaki 41. satırdaki class'ları değiştirin.