"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { heroData } from "@/data/heroData";

export default function Hero() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg="linear-gradient(135deg, #4CAF50 0%, #45a049 100%)"
      color="white"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        backgroundImage="url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={{ base: 8, lg: 12 }}
          minH={{ base: "auto", lg: "500px" }}
        >
          {/* Content */}
          <VStack
            align={{ base: "center", lg: "start" }}
            gap={6}
            flex="1"
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              maxW="600px"
            >
              {heroData.title.main}
              <Text as="span" color="orange.300" display="block">
                {heroData.title.highlight}
              </Text>
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              maxW="500px"
              opacity="0.9"
              lineHeight="1.6"
            >
              {heroData.description}
            </Text>

            <HStack
              gap={4}
              flexWrap="wrap"
              justify={{ base: "center", lg: "start" }}
            >
              <Link href={heroData.buttons.primary.href}>
                <Button
                  size="lg"
                  bg="orange.500"
                  color="white"
                  borderRadius="12px"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  _hover={{
                    bg: "orange.600",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(255, 152, 0, 0.3)",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                  transition="all 0.3s ease"
                >
                  {heroData.buttons.primary.text}
                </Button>
              </Link>

              <Link href={heroData.buttons.secondary.href}>
                <Button
                  variant="outline"
                  size="lg"
                  borderColor="white"
                  color="white"
                  borderRadius="12px"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  _hover={{
                    bg: "white",
                    color: "green.500",
                    transform: "translateY(-2px)",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                  transition="all 0.3s ease"
                >
                  {heroData.buttons.secondary.text}
                </Button>
              </Link>
            </HStack>

            {/* Stats */}
            <HStack
              gap={8}
              pt={4}
              flexWrap="wrap"
              justify={{ base: "center", lg: "start" }}
            >
              {heroData.stats.map((stat, index) => (
                <VStack key={index} gap={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="orange.300">
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" opacity="0.8">
                    {stat.label}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </VStack>

          {/* Hero Image */}
          {!isMobile && (
            <Box flex="1" maxW="500px">
              <Box
                position="relative"
                borderRadius="20px"
                overflow="hidden"
                boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
              >
                <Image
                  src={heroData.image.src}
                  alt={heroData.image.alt}
                  width={500}
                  height={400}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    aspectRatio: "5/4"
                  }}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(255, 152, 0, 0.1))"
                />
              </Box>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
