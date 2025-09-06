"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
} from "@chakra-ui/react";
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiClock,
} from "react-icons/hi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

interface ContactItemProps {
  icon: React.ElementType;
  title: string;
  content: string;
  subtitle?: string;
}

const ContactItem = ({ icon: IconComponent, title, content, subtitle }: ContactItemProps) => (
  <HStack align="start" gap={4}>
    <Box
      bg="green.50"
      p={3}
      borderRadius="12px"
      color="green.500"
    >
      <Icon boxSize={6}>
        <IconComponent />
      </Icon>
    </Box>
    <VStack align="start" gap={1}>
      <Text 
        fontSize="sm" 
        fontWeight="semibold" 
        color="gray.800"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {title}
      </Text>
      <Text fontSize="md" color="gray.700" fontWeight="medium">
        {content}
      </Text>
      {subtitle && (
        <Text fontSize="sm" color="gray.500">
          {subtitle}
        </Text>
      )}
    </VStack>
  </HStack>
);

export default function ContactInfo() {
  return (
    <Box maxW="500px" w="full">
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading 
            as="h2" 
            size="lg" 
            color="gray.800" 
            mb={3}
          >
            İletişim Bilgileri
          </Heading>
          <Text color="gray.600" fontSize="md" lineHeight="tall">
            Beslenme eğitimlerimiz ve hizmetlerimiz hakkında detaylı bilgi almak için 
            bizimle iletişime geçebilirsiniz.
          </Text>
        </Box>

        {/* Contact Details */}
        <VStack gap={6} align="stretch">
          <ContactItem
            icon={HiLocationMarker}
            title="Adres"
            content="İstanbul, Türkiye"
            subtitle="Merkez ofis lokasyonu"
          />

          <ContactItem
            icon={HiPhone}
            title="Telefon"
            content="+90 (212) 555 0123"
            subtitle="Pazartesi - Cuma, 09:00 - 18:00"
          />

          <ContactItem
            icon={HiMail}
            title="E-posta"
            content="info@nutrihome.com"
            subtitle="24 saat içinde yanıtlıyoruz"
          />

          <ContactItem
            icon={HiClock}
            title="Çalışma Saatleri"
            content="Pazartesi - Cuma: 09:00 - 18:00"
            subtitle="Cumartesi: 10:00 - 16:00"
          />
        </VStack>

        {/* Social Media */}
        <Box 
          pt={6} 
          borderTop="1px solid" 
          borderColor="gray.100"
        >
          <Text 
            fontSize="sm" 
            fontWeight="semibold" 
            color="gray.800"
            textTransform="uppercase"
            letterSpacing="wide"
            mb={4}
          >
            Sosyal Medya
          </Text>
          
          <HStack gap={4}>
            {[
              { icon: FaFacebook, color: "#1877F2", label: "Facebook" },
              { icon: FaTwitter, color: "#1DA1F2", label: "Twitter" },
              { icon: FaInstagram, color: "#E4405F", label: "Instagram" },
              { icon: FaLinkedin, color: "#0A66C2", label: "LinkedIn" },
              { icon: FaYoutube, color: "#FF0000", label: "YouTube" },
            ].map((social, index) => (
              <Box
                key={index}
                as="button"
                w={12}
                h={12}
                bg="gray.50"
                borderRadius="12px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="gray.200"
                color="gray.600"
                _hover={{
                  bg: "white",
                  borderColor: social.color,
                  color: social.color,
                  transform: "translateY(-2px)",
                  shadow: "md"
                }}
                transition="all 0.2s ease"
                aria-label={`${social.label} sayfamızı ziyaret edin`}
              >
                <Icon boxSize={5}>
                  <social.icon />
                </Icon>
              </Box>
            ))}
          </HStack>
          
          <Text fontSize="sm" color="gray.500" mt={3}>
            Bizi takip edin ve güncel içeriklerimizden haberdar olun!
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}