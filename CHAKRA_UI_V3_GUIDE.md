# Chakra UI v3 Kapsamlı Rehberi

## 📋 İçindekiler
- [Genel Bakış](#genel-bakış)
- [Kurulum](#kurulum)
- [Ana Değişiklikler](#ana-değişiklikler)
- [Provider Kurulumu](#provider-kurulumu)
- [Tema Sistemi](#tema-sistemi)
- [Component Değişiklikleri](#component-değişiklikleri)
- [Migrasyon Rehberi](#migrasyon-rehberi)
- [Next.js Entegrasyonu](#nextjs-entegrasyonu)

## 🎯 Genel Bakış

Chakra UI v3, framework'ün temelinden yeniden yazıldığı büyük bir sürümdür. Breaking changes neredeyse tüm alanları etkiler:
- Dependencies değişti
- Component API'ları yenilendi
- Props isimleri değişti
- Theme sistemi yeniden tasarlandı
- Paket yapısı optimize edildi

### Minimum Gereksinimler
- **Node.js**: v20.x+
- **React**: v18+
- **Next.js**: v14+ (App Router önerili)

---

## ⚙️ Kurulum

### 1. Eski Paketleri Kaldır
```bash
npm uninstall @emotion/styled framer-motion @chakra-ui/icons
```

### 2. Gerekli Paketleri Yükle
```bash
npm install @chakra-ui/react@latest @emotion/react@latest
```

### 3. İkon Kütüphanesi Yükle
```bash
npm install react-icons
# veya
npm install lucide-react
```

### 4. CLI Snippet'leri Ekle (İsteğe bağlı)
```bash
npx @chakra-ui/cli snippet add
```

---

## 🔄 Ana Değişiklikler

### Kaldırılan Paketler
| v2 Paketi | v3 Alternatifi |
|-----------|----------------|
| `@emotion/styled` | ❌ Artık gerekli değil |
| `framer-motion` | ❌ Vanilla CSS animations |
| `@chakra-ui/icons` | `react-icons` veya `lucide-react` |
| `@chakra-ui/hooks` | `react-use`, `usehooks-ts` |
| `@chakra-ui/next-js` | `asChild` prop kullan |

### Prop Değişiklikleri
| v2 | v3 |
|----|----| 
| `spacing={4}` | `gap={4}` |
| `isDisabled={true}` | `disabled={true}` |
| `isLoading={true}` | `loading={true}` |
| `isRequired={true}` | `required={true}` |

### Kalan Chakra UI Hooks
- `useBreakpointValue`
- `useDisclosure`  
- `useMediaQuery`

---

## 🎨 Provider Kurulumu

### v2 vs v3 Karşılaştırması

#### v2 Yaklaşımı
```tsx
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: { brand: "#4CAF50" }
})

export default function App({ children }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
```

#### v3 Yaklaşımı
```tsx
// components/ui/provider.tsx
"use client"
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: { value: "#4CAF50" }
      }
    }
  }
})

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}
```

### Next.js App Router Setup
```tsx
// app/layout.tsx
import { Provider } from "@/components/ui/provider"

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
```

---

## 🎭 Tema Sistemi

### Token Yapısı Değişikliği
```tsx
// v2
const theme = extendTheme({
  colors: {
    brand: {
      500: "#4CAF50",
      600: "#43A047"
    }
  },
  fonts: {
    heading: "Poppins, sans-serif"
  }
})

// v3
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: "#4CAF50" },
          600: { value: "#43A047" }
        }
      },
      fonts: {
        heading: { value: "Poppins, sans-serif" }
      }
    }
  }
})
```

### Önemli Tema Değişiklikleri
- **Token değerleri**: Tüm değerler `{ value: "..." }` objesi içinde
- **styleConfig kaldırıldı**: Recipes kullan
- **multiStyleConfig kaldırıldı**: Slot recipes kullan
- **resetCss prop**: `preflight: false` kullan

---

## 🧩 Component Değişiklikleri

### İkon Kullanımı
```tsx
// v2
import { HamburgerIcon } from "@chakra-ui/icons"
<IconButton icon={<HamburgerIcon />} />

// v3  
import { Icon } from "@chakra-ui/react"
import { HiMenu } from "react-icons/hi"
<IconButton>
  <Icon>
    <HiMenu />
  </Icon>
</IconButton>
```

### Composition Pattern
```tsx
// v3 Composition Yaklaşımı
<Accordion.Root>
  <Accordion.Item>
    <Accordion.ItemTrigger />
    <Accordion.ItemContent />
  </Accordion.Item>
</Accordion.Root>
```

### Drawer Komponenti
```tsx
// v2
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react"

const { isOpen, onOpen, onClose } = useDisclosure()

<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Title</DrawerHeader>
    <DrawerBody>Content</DrawerBody>
  </DrawerContent>
</Drawer>

// v3 - Yeni composition yapısı
import { Drawer } from "@chakra-ui/react"

const { open, onOpen, onClose } = useDisclosure() // isOpen artık open

<Drawer.Root open={open} onOpenChange={(details) => details.open ? onOpen() : onClose()}>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Title</Drawer.Title>
        <Drawer.CloseTrigger />
      </Drawer.Header>
      <Drawer.Body>Content</Drawer.Body>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

### Menu/Dropdown Components
```tsx
// v2
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
<Menu>
  <MenuButton>Actions</MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
  </MenuList>
</Menu>

// v3 - Doğru yapı
import { Menu, Portal } from "@chakra-ui/react"
<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="download">Download</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

### Form Components
```tsx
// v2
import { FormLabel, FormControl } from "@chakra-ui/react"
<FormControl>
  <FormLabel>Email</FormLabel>
</FormControl>

// v3
import { Field } from "@chakra-ui/react"
<Field>
  <Field.Label>Email</Field.Label>
</Field>
```

### Toast Sistemi
```tsx
// v2
const toast = useToast()
toast({ title: "Success!" })

// v3
import { Toaster, toaster } from "@/components/ui/toaster"
// App'e <Toaster /> ekle
toaster.create({ title: "Success!" })
```

---

## 📦 Migrasyon Rehberi

### Adım 1: Dependency Güncellemesi
```bash
# Eski paketleri kaldır
npm uninstall @emotion/styled framer-motion @chakra-ui/icons

# Yeni paketleri yükle
npm install @chakra-ui/react@latest @emotion/react@latest react-icons
```

### Adım 2: Provider Kurulumu
1. `components/ui/provider.tsx` oluştur
2. `layout.tsx`'da import et ve sarmalaa
3. Tema konfigürasyonunu v3 formatına çevir

### Adım 3: Component Güncellemeleri
1. İkon import'larını güncelle
2. Props isimlerini değiştir (`spacing` → `gap`)
3. Boolean props'ları güncelle (`isDisabled` → `disabled`)

### Adım 4: Test ve Doğrulama
1. Tüm sayfaları kontrol et
2. Responsive davranışları test et
3. Accessibility özelliklerini doğrula

---

## ⚡ Next.js Entegrasyonu

### Bundle Optimizasyonu
```js
// next.config.mjs
export default {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"]
  }
}
```

### Hydration Sorunları
```tsx
// Hydration hatalarını önlemek için
<html suppressHydrationWarning>
```

```json
// package.json - Turbo flag'ini kaldır
{
  "scripts": {
    "dev": "next dev"  // --turbopack kaldırıldı
  }
}
```

### Server Components
```tsx
// Server Component'larda
import { Box, Text } from "@chakra-ui/react"

// Client Component gereken durumlar
"use client"
import { useDisclosure } from "@chakra-ui/react"
```

---

## 🎯 Best Practices

### 1. Component Composition
```tsx
// ✅ İyi
<VStack gap={4}>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</VStack>

// ❌ Kötü
<div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>
```

### 2. Responsive Design
```tsx
// ✅ İyi - useBreakpointValue kullan
const isMobile = useBreakpointValue({ base: true, lg: false })

// ✅ İyi - Responsive props
<Box p={{ base: 4, md: 6, lg: 8 }}>
```

### 3. Theming
```tsx
// ✅ İyi - Token sistem
<Button bg="green.500" _hover={{ bg: "green.600" }}>

// ❌ Kötü - Hard-coded değerler  
<Button style={{backgroundColor: '#4CAF50'}}>
```

---

## 🚀 Performans İpuçları

1. **Bundle boyutunu azalt**: Sadece kullandığın component'leri import et
2. **Server Components kullan**: Mümkün olduğunca server-side render et
3. **Responsive değerleri optimize et**: Gereksiz breakpoint'leri kullanma
4. **Icon kütüphanelerini tree-shake et**: Sadece gerekli iconları import et

---

## 🔗 Faydalı Kaynaklar

- [Chakra UI v3 Docs](https://chakra-ui.com)
- [Migration Guide](https://chakra-ui.com/docs/get-started/migration)  
- [Next.js Integration](https://chakra-ui.com/docs/get-started/frameworks/next-app)
- [Components Overview](https://chakra-ui.com/docs/components/concepts/overview)

---

---

## 🚨 Header Component İyileştirmeleri (Pratik Deneyim)

### useDisclosure Hook Değişiklikleri
```tsx
// v2
const { isOpen, onOpen, onClose } = useDisclosure()

// v3
const { open, onOpen, onClose } = useDisclosure() // isOpen → open
```

### Menu CSS Best Practices
```tsx
// Optimal menu styling
<Menu.Content
  bg="white"
  border="1px solid"
  borderColor="gray.100"
  shadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  borderRadius="12px"
  p={2}
  minW="180px"
  mt={2}
  overflow="hidden"
>
  <Menu.Item 
    value="item1"
    px={4}
    py={3}
    borderRadius="8px" 
    fontSize="sm"
    fontWeight="medium"
    color="gray.700"
    _hover={{ 
      bg: "green.50",
      color: "green.600"
    }}
    _focus={{ 
      bg: "green.50",
      color: "green.600"
    }}
    cursor="pointer"
    transition="all 0.2s ease"
  >
    Menu Item
  </Menu.Item>
</Menu.Content>
```

### Portal Kullanımının Önemi
- **z-index sorunları**: Portal olmadan menüler header altında kalabilir
- **Render problemleri**: Portal DOM hierarchy dışında render eder
- **Responsive davranış**: Mobil cihazlarda daha iyi çalışır

### Sık Karşılaşılan Hatalar ve Çözümleri

#### 1. Menu İçeriği Gözükmeme Sorunu
```tsx
// ❌ Yanlış - Portal eksik
<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Menu</Button>
  </Menu.Trigger>
  <Menu.Content> {/* Portal olmadan render olmuyor */}
    <Menu.Item>Item</Menu.Item>
  </Menu.Content>
</Menu.Root>

// ✅ Doğru - Portal ile
<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Menu</Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item>Item</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

#### 2. Header Layout Bozulması
```tsx
// ❌ Yanlış - Button padding/margin ayarları
<Menu.Trigger asChild>
  <Button>Menu</Button> {/* Default padding header'ı büyütür */}
</Menu.Trigger>

// ✅ Doğru - Layout için optimize edilmiş
<Menu.Trigger asChild>
  <Button
    variant="ghost"
    bg="transparent"
    p={0}
    h="auto"
    minH="auto"
    _focus={{ boxShadow: "none" }}
  >
    Menu
  </Button>
</Menu.Trigger>
```

#### 3. Responsive Davranış
```tsx
// Mobile ve desktop için tutarlı davranış
const isMobile = useBreakpointValue({ base: true, lg: false })

// Desktop navigation
{!isMobile && (
  <HStack gap={8}>
    <Menu.Root>
      {/* Menu yapısı */}
    </Menu.Root>
  </HStack>
)}

// Mobile drawer
{isMobile && (
  <Drawer.Root>
    {/* Drawer yapısı */}
  </Drawer.Root>
)}
```

---

## 📝 Not

Bu rehber, Chakra UI v3.26+ sürümü baz alınarak hazırlanmıştır. Sürekli güncellenen bir kütüphane olduğu için resmi dokümantasyonu da takip etmeniz önerilir.

**Proje durumu**: NutriHome Akademi projesi Chakra UI v3 ile uyumlu olarak yapılandırılmıştır. ✅

**Son güncelleme**: Header component optimizasyonları ve Menu dropdown best practices eklendi.