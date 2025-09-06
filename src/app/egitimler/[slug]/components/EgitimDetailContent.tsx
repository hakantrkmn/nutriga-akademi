"use client";

import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Badge,
  Button,
  Icon,
  Grid,
  GridItem,
  Card,
} from "@chakra-ui/react";
import Link from "next/link";
import { 
  FiClock, 
  FiUser, 
  FiArrowLeft, 
  FiShoppingCart, 
  FiBarChart, 
  FiCheckCircle,
  FiLock,
  FiAward,
  FiImage,
  FiUsers
} from "react-icons/fi";
import { Egitim } from "@/data/dummyEgitimData";
import TipTapWrapper from "@/components/common/TipTapWrapper";

interface EgitimDetailContentProps {
  egitim: Egitim;
}

export default function EgitimDetailContent({ egitim }: EgitimDetailContentProps) {
  const [isImageError, setIsImageError] = React.useState(false);

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Header/Hero Section */}
      <Box bg="white" borderBottom="1px solid" borderColor="gray.100" shadow="sm">
        <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={{ base: 8, md: 12 }} alignItems="start">
            <VStack gap={6} align="start">
              <Link href="/egitimler">
                <Button
                  variant="ghost"
                  color="green.600"
                  _hover={{ 
                    bg: "green.50",
                    color: "green.700",
                    textDecoration: 'none'
                  }}
                  size="sm"
                  borderRadius="8px"
                  px={3}
                  py={2}
                  transition="all 0.2s ease"
                >
                  <HStack gap={2}>
                    <Icon as={FiArrowLeft} boxSize={4} />
                    <Text fontWeight="medium">Tüm Eğitimler</Text>
                  </HStack>
                </Button>
              </Link>

              <HStack gap={3} flexWrap="wrap">
                <Badge 
                  colorScheme="green" 
                  variant="solid" 
                  fontSize="xs" 
                  px={3} 
                  py={1}
                  borderRadius="8px"
                  fontWeight="medium"
                >
                  {egitim.category}
                </Badge>
                <Badge 
                  colorScheme="orange" 
                  variant="outline" 
                  fontSize="xs" 
                  px={3} 
                  py={1}
                  borderRadius="8px"
                  borderColor="orange.300"
                  color="orange.600"
                  fontWeight="medium"
                >
                  {egitim.level}
                </Badge>
              </HStack>

              <Heading 
                as="h1" 
                size={{ base: "xl", md: "2xl" }} 
                color="gray.800"
                fontWeight="bold"
                lineHeight="short"
                fontFamily="Poppins, sans-serif"
              >
                {egitim.title}
              </Heading>

              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color="gray.600" 
                maxW="90%"
                lineHeight="tall"
                fontFamily="Inter, sans-serif"
              >
                {egitim.description}
              </Text>

              <HStack gap={8} pt={2} color="gray.600" fontSize="sm" flexWrap="wrap">
                <HStack gap={2}>
                  <Icon as={FiUser} color="green.500" boxSize={4} />
                  <Text fontWeight="medium">Eğitmen: <Text as="span" color="gray.800">{egitim.instructor}</Text></Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={FiUsers} color="green.500" boxSize={4} />
                  <Text fontWeight="medium"><Text as="span" color="gray.800">{egitim.sales_count}</Text> öğrenci</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={FiClock} color="green.500" boxSize={4} />
                  <Text fontWeight="medium"><Text as="span" color="gray.800">{egitim.duration}</Text></Text>
                </HStack>
              </HStack>
            </VStack>
            
            <Box 
              h={{ base: "280px", md: "380px" }} 
              w="full" 
              bg="gray.100" 
              borderRadius="16px" 
              overflow="hidden"
              shadow="xl"
              border="1px solid"
              borderColor="gray.200"
              _hover={{
                shadow: "2xl",
                transform: "translateY(-2px)",
                transition: "all 0.3s ease"
              }}
            >
              {!isImageError ? (
                <Image
                  src={egitim.image_url}
                  alt={egitim.title}
                  h="full"
                  w="full"
                  objectFit="cover"
                  onError={() => setIsImageError(true)}
                />
              ) : (
                <VStack h="full" w="full" justify="center" bg="gray.100" color="gray.400" gap={4}>
                  <Icon as={FiImage} boxSize={16} />
                  <Text fontSize="sm" fontWeight="medium">Eğitim görseli bulunamadı</Text>
                </VStack>
              )}
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", lg: "2.5fr 1.5fr" }} gap={{ base: 12, lg: 10 }}>
          
          {/* Left Column: Course Content */}
          <GridItem>
            <Box 
              w="full"
              bg="white"
              borderRadius="12px"
              p={8}
              shadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <TipTapWrapper 
                content={egitim.content}
                className="egitim-content"
              />
            </Box>
          </GridItem>

          {/* Right Column: Sticky Sidebar */}
          <GridItem>
            <VStack gap={6} position={{ lg: "sticky" }} top="6rem">
              <Card.Root 
                w="full" 
                shadow="xl" 
                borderRadius="16px" 
                bg="white" 
                border="1px solid" 
                borderColor="gray.200"
                _hover={{ shadow: "2xl" }}
                transition="all 0.3s ease"
              >
                <Card.Body p={8}>
                  <VStack gap={6}>
                    <VStack gap={2} align="center">
                      <Text fontSize="5xl" fontWeight="bold" color="green.500" fontFamily="Poppins, sans-serif">
                        ₺{egitim.price}
                      </Text>
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        Tek seferlik ödeme
                      </Text>
                    </VStack>

                    <VStack gap={4} w="full">
                      <Button 
                        colorScheme="green" 
                        size="lg" 
                        w="full" 
                        borderRadius="12px" 
                        py={7}
                        fontSize="md"
                        fontWeight="semibold"
                        _hover={{
                          bg: "green.600",
                          transform: "translateY(-1px)",
                          shadow: "lg"
                        }}
                        transition="all 0.2s ease"
                      >
                        <HStack gap={3}>
                          <Icon as={FiShoppingCart} boxSize={5} />
                          <Text>Eğitimi Satın Al</Text>
                        </HStack>
                      </Button>
                      <Button 
                        colorScheme="orange" 
                        variant="outline" 
                        size="lg" 
                        w="full" 
                        borderRadius="12px" 
                        py={7}
                        fontSize="md"
                        fontWeight="semibold"
                        borderColor="orange.300"
                        color="orange.600"
                        _hover={{
                          bg: "orange.50",
                          borderColor: "orange.400",
                          transform: "translateY(-1px)"
                        }}
                        transition="all 0.2s ease"
                      >
                        Sepete Ekle
                      </Button>
                    </VStack>
                    
                    <Box w="full" h="1px" bg="gray.200" />

                    <VStack gap={4} align="start" w="full">
                      <Heading as="h3" size="md" color="gray.800" fontFamily="Poppins, sans-serif">
                        Bu Eğitim İçerir:
                      </Heading>
                      <VStack gap={3} w="full">
                        <HStack justify="space-between" w="full" p={3} bg="gray.50" borderRadius="8px">
                          <HStack gap={3}>
                            <Icon as={FiClock} color="green.500" boxSize={4} />
                            <Text fontWeight="medium" color="gray.700">Süre</Text>
                          </HStack>
                          <Text fontWeight="semibold" color="gray.800">{egitim.duration}</Text>
                        </HStack>
                        <HStack justify="space-between" w="full" p={3} bg="gray.50" borderRadius="8px">
                          <HStack gap={3}>
                            <Icon as={FiBarChart} color="green.500" boxSize={4} />
                            <Text fontWeight="medium" color="gray.700">Seviye</Text>
                          </HStack>
                          <Text fontWeight="semibold" color="gray.800">{egitim.level}</Text>
                        </HStack>
                        <HStack justify="space-between" w="full" p={3} bg="gray.50" borderRadius="8px">
                          <HStack gap={3}>
                            <Icon as={FiAward} color="green.500" boxSize={4} />
                            <Text fontWeight="medium" color="gray.700">Sertifika</Text>
                          </HStack>
                          <Text fontWeight="semibold" color="gray.800">Evet</Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <Box w="full" h="1px" bg="gray.200" />

                    <VStack gap={3} align="start" w="full">
                      <VStack gap={2} align="start" w="full">
                        <HStack gap={3}>
                          <Icon as={FiCheckCircle} color="green.500" boxSize={4} />
                          <Text fontSize="sm" color="gray.600" fontWeight="medium">7 gün iade garantisi</Text>
                        </HStack>
                        <HStack gap={3}>
                          <Icon as={FiLock} color="green.500" boxSize={4} />
                          <Text fontSize="sm" color="gray.600" fontWeight="medium">Güvenli ödeme</Text>
                        </HStack>
                        <HStack gap={3}>
                          <Icon as={FiUsers} color="green.500" boxSize={4} />
                          <Text fontSize="sm" color="gray.600" fontWeight="medium">Sınırsız erişim</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </VStack>
          </GridItem>
        </Grid>

        {/* CTA Section */}
        <Box mt={{ base: 12, md: 20 }}>
          <Card.Root 
            bg="gradient-to-r"
            bgGradient="linear(to-r, green.50, green.100)"
            borderRadius="20px" 
            w="full"
            border="1px solid"
            borderColor="green.200"
            shadow="lg"
            _hover={{ shadow: "xl" }}
            transition="all 0.3s ease"
          >
            <Card.Body p={{ base: 10, md: 12 }}>
              <VStack gap={6} textAlign="center" maxW="700px" mx="auto">
                <VStack gap={3}>
                  <Icon as={FiAward} color="green.500" boxSize={12} />
                  <Heading as="h3" size="xl" color="green.600" fontFamily="Poppins, sans-serif">
                    Kariyerinde Bir Sonraki Adımı At
                  </Heading>
                </VStack>
                
                <Text 
                  maxW="600px" 
                  fontSize="lg" 
                  color="gray.700" 
                  lineHeight="tall"
                  fontFamily="Inter, sans-serif"
                >
                  Bu eğitim ile beslenme alanındaki bilginizi derinleştirin ve 
                  profesyonel kariyerinizde fark yaratın. Uzman eğitmenlerden 
                  öğrenin, sertifikanızı alın.
                </Text>
                
                <HStack gap={4} flexWrap="wrap" justify="center" pt={2}>
                  <Button 
                    colorScheme="green"
                    size="lg"
                    px={10}
                    py={7}
                    borderRadius="12px"
                    fontSize="md"
                    fontWeight="semibold"
                    _hover={{
                      bg: "green.600",
                      transform: "translateY(-2px)",
                      shadow: "xl"
                    }}
                    transition="all 0.3s ease"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Hemen Başla - ₺{egitim.price}
                  </Button>
                  
                  <Button 
                    colorScheme="orange"
                    variant="outline"
                    size="lg"
                    px={8}
                    py={7}
                    borderRadius="12px"
                    fontSize="md"
                    fontWeight="semibold"
                    borderColor="orange.300"
                    color="orange.600"
                    _hover={{
                      bg: "orange.50",
                      borderColor: "orange.400",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Detayları İncele
                  </Button>
                </HStack>
                
                <HStack gap={8} pt={4} fontSize="sm" color="gray.600" flexWrap="wrap" justify="center">
                  <HStack gap={2}>
                    <Icon as={FiCheckCircle} color="green.500" boxSize={4} />
                    <Text fontWeight="medium">7 gün iade garantisi</Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FiUsers} color="green.500" boxSize={4} />
                    <Text fontWeight="medium">Sınırsız erişim</Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FiAward} color="green.500" boxSize={4} />
                    <Text fontWeight="medium">Sertifika dahil</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>
      </Container>
    </Box>
  );
}