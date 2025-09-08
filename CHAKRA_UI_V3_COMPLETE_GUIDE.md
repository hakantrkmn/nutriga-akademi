# Chakra UI v3 Complete Guide

Bu dokümantasyon, [Chakra UI v3](https://github.com/chakra-ui/chakra-ui/tree/main/apps/www/content/docs/components) resmi dokümantasyonuna dayanarak hazırlanmıştır ve projenizde kullanılan componentleri kapsar.

## İçindekiler

1. [Kurulum ve Yapılandırma](#kurulum-ve-yapılandırma)
2. [Temel Componentler](#temel-componentler)
3. [Layout Componentleri](#layout-componentleri)
4. [Form Componentleri](#form-componentleri)
5. [Navigation Componentleri](#navigation-componentleri)
6. [Feedback Componentleri](#feedback-componentleri)
7. [Overlay Componentleri](#overlay-componentleri)
8. [Data Display Componentleri](#data-display-componentleri)
9. [Media Componentleri](#media-componentleri)
10. [Utility Hooks](#utility-hooks)
11. [Tema ve Styling](#tema-ve-styling)
12. [Best Practices](#best-practices)

---

## Kurulum ve Yapılandırma

### Paket Kurulumu

```bash
npm install @chakra-ui/react @chakra-ui/button @chakra-ui/form-control @chakra-ui/input @chakra-ui/layout @chakra-ui/menu @chakra-ui/modal
```

### Provider Yapılandırması

```tsx
// src/components/ui/provider.tsx
"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#FFF8F5" },
          100: { value: "#FEECE4" },
          500: { value: "#F7C5A8" }, // primary
          600: { value: "#F4B691" }, // primary-hover
        },
        // ... diğer renkler
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
```

---

## Temel Componentler

### Box

En temel layout componenti. Div wrapper olarak kullanılır.

```tsx
import { Box } from "@chakra-ui/react"

// Temel kullanım
<Box bg="white" p={4} borderRadius="md">
  İçerik
</Box>

// Responsive padding
<Box p={{ base: 4, md: 6, lg: 8 }}>
  Responsive içerik
</Box>

// Shadow ve border
<Box
  bg="white"
  shadow="lg"
  border="1px solid"
  borderColor="gray.200"
  borderRadius="xl"
>
  Kart içeriği
</Box>
```

### Text

Metin gösterimi için kullanılır.

```tsx
import { Text } from "@chakra-ui/react"

// Temel kullanım
<Text fontSize="md" color="gray.700">
  Normal metin
</Text>

// Başlık stilleri
<Text fontSize="2xl" fontWeight="bold" color="green.500">
  Başlık
</Text>

// Responsive font boyutu
<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
  Responsive metin
</Text>

// Line height ve spacing
<Text lineHeight="tall" mb={4}>
  Uzun metin içeriği
</Text>
```

### Heading

Başlık elementleri için özel component.

```tsx
import { Heading } from "@chakra-ui/react"

// Temel kullanım
<Heading as="h1" size="xl" color="gray.900">
  Ana Başlık
</Heading>

// Size varyantları
<Heading size="2xl">Büyük Başlık</Heading>
<Heading size="lg">Orta Başlık</Heading>
<Heading size="md">Küçük Başlık</Heading>

// HTML semantik elementleri
<Heading as="h2" size="lg" color="green.500">
  Alt Başlık
</Heading>
```

---

## Layout Componentleri

### Container

İçeriği merkezler ve maksimum genişlik sağlar.

```tsx
import { Container } from "@chakra-ui/react"

<Container maxW="1200px" px={{ base: 4, md: 6 }}>
  İçerik
</Container>

// Farklı maxW değerleri
<Container maxW="container.sm">Küçük</Container>
<Container maxW="container.md">Orta</Container>
<Container maxW="container.lg">Büyük</Container>
<Container maxW="container.xl">Çok Büyük</Container>
```

### VStack

Dikey stack layout.

```tsx
import { VStack } from "@chakra-ui/react"

<VStack gap={4} align="stretch">
  <Box>İtem 1</Box>
  <Box>İtem 2</Box>
  <Box>İtem 3</Box>
</VStack>

// Alignment seçenekleri
<VStack align="center" justify="center" minH="100vh">
  Merkezi içerik
</VStack>

// Responsive gap
<VStack gap={{ base: 2, md: 4, lg: 6 }}>
  Responsive spacing
</VStack>
```

### HStack

Yatay stack layout.

```tsx
import { HStack } from "@chakra-ui/react"

<HStack gap={3} justify="space-between">
  <Text>Sol</Text>
  <Text>Orta</Text>
  <Text>Sağ</Text>
</HStack>

// Wrap özelliği
<HStack gap={2} wrap="wrap">
  {items.map(item => <Box key={item.id}>{item.name}</Box>)}
</HStack>
```

### Flex

Flexbox layout için esnek component.

```tsx
import { Flex } from "@chakra-ui/react"

<Flex direction="column" align="center" justify="center">
  Dikey flex
</Flex>

<Flex direction={{ base: "column", md: "row" }} gap={4}>
  Responsive flex
</Flex>
```

---

## Form Componentleri

### Input

Temel input componenti.

```tsx
import { Input } from "@chakra-ui/react"

// Temel kullanım
<Input
  placeholder="Email adresinizi girin"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Styling
<Input
  borderRadius="lg"
  borderColor="gray.300"
  _focus={{
    borderColor: "green.500",
    boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
  }}
/>

// Size varyantları
<Input size="sm" />  // Küçük
<Input size="md" />  // Orta (default)
<Input size="lg" />  // Büyük
```

### Textarea

Çok satırlı metin girişi.

```tsx
import { Textarea } from "@chakra-ui/react";

<Textarea
  placeholder="Mesajınızı yazın..."
  rows={4}
  resize="vertical"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>;
```

### Button

Aksiyon butonları.

```tsx
import { Button } from "@chakra-ui/react"

// Temel kullanım
<Button colorScheme="green" onClick={handleClick}>
  Kaydet
</Button>

// Variant'lar
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Size'lar
<Button size="sm">Küçük</Button>
<Button size="md">Orta</Button>
<Button size="lg">Büyük</Button>

// Loading state
<Button
  loading={isLoading}
  loadingText="Kaydediliyor..."
  colorScheme="green"
>
  Kaydet
</Button>

// Icon ile
<Button leftIcon={<FiSave />} colorScheme="green">
  Kaydet
</Button>
```

### FormControl

Form alanları için wrapper.

```tsx
import * as FormControl from "@chakra-ui/form-control";

<FormControl.Root>
  <FormControl.Label>Email Adresi</FormControl.Label>
  <Input type="email" />
  <FormControl.HelperText>Email adresinizi girin</FormControl.HelperText>
  <FormControl.ErrorText>Geçerli bir email adresi girin</FormControl.ErrorText>
</FormControl.Root>;
```

---

## Navigation Componentleri

### Menu

Dropdown menü componenti.

```tsx
import * as Menu from "@chakra-ui/menu";

<Menu.Root>
  <Menu.Trigger asChild>
    <Button variant="outline">
      Menü <ChevronDownIcon />
    </Button>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item>Profil</Menu.Item>
      <Menu.Item>Ayarlar</Menu.Item>
      <Menu.Separator />
      <Menu.Item color="red.500">Çıkış</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>;
```

---

## Overlay Componentleri

### Modal

Modal dialog componenti.

```tsx
import * as Modal from "@chakra-ui/modal";

function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Modal Aç</Button>

      <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop />
        <Modal.Positioner>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Modal Başlığı</Modal.Title>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>Modal içeriği buraya gelir</Modal.Body>
            <Modal.Footer>
              <Button variant="outline" mr={3}>
                İptal
              </Button>
              <Button colorScheme="green">Kaydet</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Positioner>
      </Modal.Root>
    </>
  );
}
```

### Drawer

Yan panel drawer componenti.

```tsx
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

function ExampleDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Drawer Aç</Button>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Drawer Başlığı</DrawerHeader>
          <DrawerBody>Drawer içeriği</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

---

## Data Display Componentleri

### Card

Kart componenti.

```tsx
import { Card } from "@chakra-ui/react";

<Card.Root>
  <Card.Header>
    <Heading size="md">Kart Başlığı</Heading>
  </Card.Header>
  <Card.Body>
    <Text>Kart içeriği</Text>
  </Card.Body>
  <Card.Footer>
    <Button colorScheme="green">Aksiyon</Button>
  </Card.Footer>
</Card.Root>;
```

### Badge

Etiket componenti.

```tsx
import { Badge } from "@chakra-ui/react"

<Badge colorScheme="green">Aktif</Badge>
<Badge colorScheme="red">Pasif</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="subtle">Subtle</Badge>
```

### Avatar

Kullanıcı avatar'ı.

```tsx
import { Avatar } from "@chakra-ui/react"

<Avatar name="John Doe" src="https://bit.ly/dan-abramov" />
<Avatar size="sm" />
<Avatar size="md" />
<Avatar size="lg" />
<Avatar size="xl" />
```

---

## Media Componentleri

### Icon

İkon componenti.

```tsx
import { Icon } from "@chakra-ui/react"
import { FiHome, FiUser, FiSettings } from "react-icons/fi"

<Icon as={FiHome} w={5} h={5} />
<Icon as={FiUser} w={6} h={6} color="green.500" />
<Icon as={FiSettings} w={4} h={4} color="gray.500" />
```

### Image

Resim componenti.

```tsx
import { Image } from "@chakra-ui/react";

<Image
  src="https://bit.ly/dan-abramov"
  alt="Dan Abramov"
  borderRadius="full"
  boxSize="150px"
  objectFit="cover"
/>;
```

---

## Utility Hooks

### useDisclosure

Modal, drawer gibi componentlerin açık/kapalı durumunu yönetir.

```tsx
import { useDisclosure } from "@chakra-ui/react";

function MyComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Aç</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* Modal içeriği */}
      </Modal>
    </>
  );
}
```

### useBreakpointValue

Responsive değerler için kullanılır.

```tsx
import { useBreakpointValue } from "@chakra-ui/react";

function ResponsiveComponent() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  return (
    <Text fontSize={fontSize}>
      {isMobile ? "Mobil görünüm" : "Desktop görünüm"}
    </Text>
  );
}
```

---

## Tema ve Styling

### Renk Sistemi

```tsx
// Tema renkleri
const colors = {
  brand: {
    50: "#FFF8F5",
    100: "#FEECE4",
    500: "#F7C5A8", // primary
    600: "#F4B691", // primary-hover
  },
  gray: {
    50: "#FEFBF6", // background
    100: "#FBF8F1", // background-alt
    800: "#5C5B57", // foreground
  }
}

// Kullanım
<Box bg="brand.500" color="white">
  Brand rengi
</Box>

<Text color="gray.800">
  Foreground rengi
</Box>
```

### Spacing Sistemi

```tsx
// Spacing değerleri (4px base)
<Box p={1}>4px padding</Box>
<Box p={2}>8px padding</Box>
<Box p={4}>16px padding</Box>
<Box p={8}>32px padding</Box>

// Responsive spacing
<Box p={{ base: 4, md: 6, lg: 8 }}>
  Responsive padding
</Box>
```

### Border Radius

```tsx
<Box borderRadius="none">Köşesiz</Box>
<Box borderRadius="sm">Küçük</Box>
<Box borderRadius="md">Orta</Box>
<Box borderRadius="lg">Büyük</Box>
<Box borderRadius="xl">Çok büyük</Box>
<Box borderRadius="full">Tam yuvarlak</Box>
```

### Shadow

```tsx
<Box shadow="xs">Çok hafif</Box>
<Box shadow="sm">Hafif</Box>
<Box shadow="md">Orta</Box>
<Box shadow="lg">Büyük</Box>
<Box shadow="xl">Çok büyük</Box>
<Box shadow="2xl">En büyük</Box>
```

---

## Best Practices

### 1. Responsive Design

```tsx
// ✅ İyi
<Box p={{ base: 4, md: 6, lg: 8 }}>
  <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
    Responsive içerik
  </Text>
</Box>

// ❌ Kötü
<Box p={6}>
  <Text fontSize="md">
    Sabit boyutlar
  </Text>
</Box>
```

### 2. Semantic HTML

```tsx
// ✅ İyi
<Heading as="h1" size="xl">
  Ana Başlık
</Heading>
<Heading as="h2" size="lg">
  Alt Başlık
</Heading>

// ❌ Kötü
<Text fontSize="2xl" fontWeight="bold">
  Başlık
</Text>
```

### 3. Accessibility

```tsx
// ✅ İyi
<Button aria-label="Kapat">
  <Icon as={FiX} />
</Button>

<Input aria-describedby="email-help" />
<Text id="email-help">Email adresinizi girin</Text>

// ❌ Kötü
<Button>
  <Icon as={FiX} />
</Button>
```

### 4. Performance

```tsx
// ✅ İyi - Lazy loading
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Spinner />,
});

// ✅ İyi - Memoization
const MemoizedComponent = memo(({ data }) => {
  return <ComplexComponent data={data} />;
});
```

### 5. State Management

```tsx
// ✅ İyi - useDisclosure kullanımı
function ModalExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Aç</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* İçerik */}
      </Modal>
    </>
  );
}
```

---

## Proje Özel Kullanımlar

### Admin Panel Layout

```tsx
// src/app/admin/layout.tsx
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-layout site-theme-sage site-font-sage">
      <AdminHeader />
      {children}
    </div>
  );
}
```

### TipTap Editor Integration

```tsx
// Modal kullanımı
<Modal.Root open={isOpen} onOpenChange={setIsOpen}>
  <Modal.Backdrop />
  <Modal.Positioner>
    <Modal.Content>
      <Modal.Header>
        <Modal.Title>YouTube Videosu Ekle</Modal.Title>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Body>
        <FormControl.Root>
          <FormControl.Label>YouTube Video URL</FormControl.Label>
          <Input type="url" placeholder="https://www.youtube.com/watch?v=..." />
        </FormControl.Root>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" mr={3}>
          İptal
        </Button>
        <Button colorScheme="green">Ekle</Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal.Positioner>
</Modal.Root>
```

### Theme Integration

```tsx
// CSS variables ile tema entegrasyonu
<Button bg="var(--primary)" _hover={{ bg: "var(--primary-hover)" }}>
  Tema Butonu
</Button>
```

---

## Kaynaklar

- [Chakra UI v3 Resmi Dokümantasyon](https://github.com/chakra-ui/chakra-ui/tree/main/apps/www/content/docs/components)
- [Chakra UI GitHub Repository](https://github.com/chakra-ui/chakra-ui)
- [React Icons](https://react-icons.github.io/react-icons/) - İkon kütüphanesi

---

Bu dokümantasyon, projenizde kullanılan Chakra UI v3 componentlerini kapsar ve sürekli güncellenmektedir. Yeni componentler eklendiğinde bu dokümantasyon da güncellenecektir.
