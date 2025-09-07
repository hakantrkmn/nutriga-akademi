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
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_WORK_HOURS, COMPANY_WORK_HOURS_WEEKEND, COMPANY_FACEBOOK_URL, COMPANY_TWITTER_URL, COMPANY_INSTAGRAM_URL, COMPANY_LINKEDIN_URL, COMPANY_YOUTUBE_URL } from "@/constants";

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
            content={COMPANY_ADDRESS}
            subtitle="Merkez ofis lokasyonu"
          />

          <ContactItem
            icon={HiPhone}
            title="Telefon"
            content={COMPANY_PHONE}
            subtitle="Pazartesi - Cuma, 09:00 - 18:00"
          />

          <ContactItem
            icon={HiMail}
            title="E-posta"
            content={COMPANY_EMAIL}
            subtitle="24 saat içinde yanıtlıyoruz"
          />

          <ContactItem
            icon={HiClock}
            title="Çalışma Saatleri"
            content={COMPANY_WORK_HOURS}
            subtitle={COMPANY_WORK_HOURS_WEEKEND}
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
              { icon: FaFacebook, color: "#1877F2", label: "Facebook", href: COMPANY_FACEBOOK_URL },
              { icon: FaTwitter, color: "#1DA1F2", label: "Twitter", href: COMPANY_TWITTER_URL },
              { icon: FaInstagram, color: "#E4405F", label: "Instagram", href: COMPANY_INSTAGRAM_URL },
              { icon: FaLinkedin, color: "#0A66C2", label: "LinkedIn", href: COMPANY_LINKEDIN_URL },
              { icon: FaYoutube, color: "#FF0000", label: "YouTube", href: COMPANY_YOUTUBE_URL },
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
                onClick={() => window.open(social.href, "_blank")}
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