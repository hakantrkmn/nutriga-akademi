"use client";

import {
  Box,
  VStack,
  Button,
  Text,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulated form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    
    // Show success message (you can add toast later)
    alert("Mesajınız başarıyla gönderildi!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="12px"
      shadow="lg"
      maxW="600px"
      w="full"
    >
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading 
            as="h2" 
            size="lg" 
            color="gray.800" 
            mb={2}
          >
            Bizimle İletişime Geçin
          </Heading>
          <Text color="gray.600" fontSize="md">
            Sorularınız için bize mesaj gönderin, size en kısa sürede dönüş yapalım.
          </Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack gap={5}>
            {/* Name Input */}
            <Box w="full">
              <Text 
                fontSize="sm" 
                fontWeight="medium" 
                color="gray.700" 
                mb={2}
              >
                İsim Soyisim *
              </Text>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                w="full"
                p={3}
                border="2px solid"
                borderColor="gray.100"
                borderRadius="8px"
                fontSize="md"
                bg="gray.50"
                _hover={{ borderColor: "gray.200" }}
                _focus={{
                  outline: "none",
                  borderColor: "green.500",
                  bg: "white"
                }}
                placeholder="Adınızı ve soyadınızı girin"
              />
            </Box>

            {/* Email Input */}
            <Box w="full">
              <Text 
                fontSize="sm" 
                fontWeight="medium" 
                color="gray.700" 
                mb={2}
              >
                E-posta Adresi *
              </Text>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                w="full"
                p={3}
                border="2px solid"
                borderColor="gray.100"
                borderRadius="8px"
                fontSize="md"
                bg="gray.50"
                _hover={{ borderColor: "gray.200" }}
                _focus={{
                  outline: "none",
                  borderColor: "green.500",
                  bg: "white"
                }}
                placeholder="email@example.com"
              />
            </Box>

            {/* Message Textarea */}
            <Box w="full">
              <Text 
                fontSize="sm" 
                fontWeight="medium" 
                color="gray.700" 
                mb={2}
              >
                Mesajınız *
              </Text>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                w="full"
                p={3}
                border="2px solid"
                borderColor="gray.100"
                borderRadius="8px"
                fontSize="md"
                bg="gray.50"
                minH="120px"
                resize="vertical"
                _hover={{ borderColor: "gray.200" }}
                _focus={{
                  outline: "none",
                  borderColor: "green.500",
                  bg: "white"
                }}
                placeholder="Mesajınızı buraya yazın..."
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              bg="green.500"
              color="white"
              size="lg"
              w="full"
              borderRadius="12px"
              _hover={{ bg: "green.600" }}
              _active={{ bg: "green.700" }}
              loading={isSubmitting}
              loadingText="Gönderiliyor..."
            >
              Mesaj Gönder
            </Button>
          </VStack>
        </Box>

        <Box 
          pt={4} 
          borderTop="1px solid" 
          borderColor="gray.100"
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.500">
            * işaretli alanlar zorunludur
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}