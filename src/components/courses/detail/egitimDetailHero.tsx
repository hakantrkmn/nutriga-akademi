
import { Box, Grid, Container, VStack, Icon, Button, Link, HStack, Badge, Heading, Text, Image } from "@chakra-ui/react";
import { FiArrowLeft, FiImage, FiUser } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import {  EgitimDetailHeroProps } from "@/types";




export default function EgitimDetailHero({ egitim, isImageError, setIsImageError }: EgitimDetailHeroProps) {
  return (
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
    )
}