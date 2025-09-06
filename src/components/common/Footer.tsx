import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube 
} from "react-icons/fa";

const quickLinks = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Misyonumuz", href: "/misyon" },
  { name: "Vizyonumuz", href: "/vizyon" },
  { name: "Eğitimler", href: "/egitimler" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/nutrihome",
    icon: FaFacebook,
    color: "#1877F2"
  },
  {
    name: "Twitter", 
    href: "https://twitter.com/nutrihome",
    icon: FaTwitter,
    color: "#1DA1F2"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nutrihome",
    icon: FaInstagram,
    color: "#E4405F"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/nutrihome",
    icon: FaLinkedin,
    color: "#0A66C2"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/nutrihome",
    icon: FaYoutube,
    color: "#FF0000"
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" bg="gray.800" color="white" py={12}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {/* Logo ve Açıklama */}
          <VStack align="start" gap={4}>
            <Link href="/">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="green.400"
                cursor="pointer"
                _hover={{ color: "green.300" }}
                transition="color 0.2s ease"
              >
                NutriHome Akademi
              </Text>
            </Link>
            
            <Text 
              fontSize="sm" 
              color="gray.300" 
              lineHeight="tall"
              maxW="280px"
            >
              Beslenme alanında en güncel ve kaliteli eğitimlerle diyetisyenlerin 
              mesleki gelişimine katkı sağlayan öncü akademi.
            </Text>
          </VStack>

          {/* Hızlı Linkler */}
          <VStack align="start" gap={4}>
            <Heading as="h4" size="md" color="white">
              Hızlı Linkler
            </Heading>
            
            <VStack align="start" gap={2}>
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Text
                    fontSize="sm"
                    color="gray.300"
                    _hover={{ 
                      color: "green.400",
                      textDecoration: "underline" 
                    }}
                    cursor="pointer"
                    transition="all 0.2s ease"
                  >
                    {link.name}
                  </Text>
                </Link>
              ))}
            </VStack>
          </VStack>

          {/* İletişim Bilgileri */}
          <VStack align="start" gap={4}>
            <Heading as="h4" size="md" color="white">
              İletişim
            </Heading>
            
            <VStack align="start" gap={3} fontSize="sm" color="gray.300">
              <Text>
                <Text as="span" fontWeight="semibold" color="white">Adres:</Text><br />
                İstanbul, Türkiye
              </Text>
              
              <Text>
                <Text as="span" fontWeight="semibold" color="white">Telefon:</Text><br />
                +90 (212) 555 0123
              </Text>
              
              <Text>
                <Text as="span" fontWeight="semibold" color="white">E-posta:</Text><br />
                info@nutrihome.com
              </Text>
              
              <Text>
                <Text as="span" fontWeight="semibold" color="white">Çalışma Saatleri:</Text><br />
                Pazartesi - Cuma: 09:00 - 18:00
              </Text>
            </VStack>
          </VStack>

          {/* Sosyal Medya */}
          <VStack align="start" gap={4}>
            <Heading as="h4" size="md" color="white">
              Takip Edin
            </Heading>
            
            <Text fontSize="sm" color="gray.300" lineHeight="tall">
              Güncel içerikler ve eğitim duyuruları için bizi takip edin!
            </Text>
            
            <HStack gap={3} flexWrap="wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} sayfamızı ziyaret edin`}
                >
                  <Box
                    w={10}
                    h={10}
                    bg="gray.700"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.300"
                    _hover={{
                      bg: "gray.600",
                      color: social.color,
                      transform: "translateY(-2px)",
                      shadow: "md"
                    }}
                    transition="all 0.2s ease"
                  >
                    <Icon boxSize={5}>
                      <social.icon />
                    </Icon>
                  </Box>
                </a>
              ))}
            </HStack>
          </VStack>
        </SimpleGrid>

        {/* Alt Çizgi ve Copyright */}
        <Box 
          mt={12} 
          pt={8} 
          borderTop="1px solid" 
          borderColor="gray.600"
        >
          <VStack gap={4} textAlign="center">
            <HStack 
              justify="center" 
              gap={6} 
              flexWrap="wrap"
              fontSize="sm" 
              color="gray.400"
            >
              <Link href="/gizlilik-politikasi">
                <Text 
                  _hover={{ color: "green.400" }} 
                  cursor="pointer"
                  transition="color 0.2s ease"
                >
                  Gizlilik Politikası
                </Text>
              </Link>
              <Link href="/kullanim-kosullari">
                <Text 
                  _hover={{ color: "green.400" }} 
                  cursor="pointer"
                  transition="color 0.2s ease"
                >
                  Kullanım Koşulları
                </Text>
              </Link>
              <Link href="/cerez-politikasi">
                <Text 
                  _hover={{ color: "green.400" }} 
                  cursor="pointer"
                  transition="color 0.2s ease"
                >
                  Çerez Politikası
                </Text>
              </Link>
            </HStack>
            
            <Text fontSize="sm" color="gray.400">
              © {currentYear} NutriHome Akademi. Tüm hakları saklıdır.
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}