'use client'

import { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  Image,
  NativeSelectRoot,
  NativeSelectField,
  Card,
} from '@chakra-ui/react'
import { Egitim } from '@/types'

interface EgitimSettingsProps {
  formData: Egitim
  setFormData: (formData: Egitim) => void
  generateSlug: (title: string) => string
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  uploading: boolean
  uploadedImage: string
}

export default function EgitimSettings({
  formData,
  setFormData,
  generateSlug,
  handleImageUpload,
  uploading,
  uploadedImage
}: EgitimSettingsProps) {
  return (
    <Card.Root 
      w="full" 
      shadow="sm" 
      borderRadius="12px" 
      bg="white" 
      border="1px solid" 
      borderColor="gray.200"
    >
      <Card.Body p={6}>
        <VStack gap={4} align="stretch">
          <Heading as="h3" size="lg" color="gray.900" fontFamily="Poppins, sans-serif">
            Eğitim Ayarları
          </Heading>
          
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Eğitim Başlığı
            </Text>
            <Input
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value
                setFormData({
                  ...formData,
                  title,
                  slug: generateSlug(title)
                })
              }}
              placeholder="Eğitim başlığını girin..."
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Açıklama
            </Text>
            <Input
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Eğitim açıklamasını girin..."
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>
          
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Fiyat (₺)
            </Text>
            <Input
              type="number"
              step="0.01"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="299"
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Kategori
            </Text>
            <NativeSelectRoot size="md">
              <NativeSelectField
                value={formData.category || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
                borderRadius="8px"
                borderColor="gray.200"
                bg="white"
                color="gray.800"
                _focus={{
                  borderColor: "green.500",
                  boxShadow: "0 0 0 1px var(--primary)"
                }}
                className="custom-select"
              >
                <option value="" style={{ color: '#9CA3AF', backgroundColor: 'white' }}>Kategori seçin...</option>
                <option value="Temel Beslenme" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Temel Beslenme</option>
                <option value="Klinik Beslenme" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Klinik Beslenme</option>
                <option value="Sporcu Beslenmesi" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Sporcu Beslenmesi</option>
                <option value="Pediatrik Beslenme" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Pediatrik Beslenme</option>
                <option value="Geriatrik Beslenme" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Geriatrik Beslenme</option>
                <option value="Beslenme Danışmanlığı" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Beslenme Danışmanlığı</option>
                <option value="Fonksiyonel Beslenme" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Fonksiyonel Beslenme</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Seviye
            </Text>
            <NativeSelectRoot size="md">
              <NativeSelectField
                value={formData.level || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, level: e.target.value })}
                borderRadius="8px"
                borderColor="gray.200"
                bg="white"
                color="gray.800"
                _focus={{
                  borderColor: "green.500",
                  boxShadow: "0 0 0 1px var(--primary)"
                }}
                className="custom-select"
              >
                <option value="" style={{ color: '#9CA3AF', backgroundColor: 'white' }}>Seviye seçin...</option>
                <option value="Başlangıç" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Başlangıç</option>
                <option value="Orta" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Orta</option>
                <option value="İleri" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>İleri</option>
                <option value="Uzman" className="custom-option" style={{ color: '#1F2937', backgroundColor: 'white' }}>Uzman</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Eğitmen
            </Text>
            <Input
              value={formData.instructor || ''}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              placeholder="Dr. Ahmet Yılmaz"
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Slug
            </Text>
            <Input
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="egitim-slug"
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Eğitim Görseli
            </Text>
            <VStack gap={3} align="stretch">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <Button
                variant="outline"
                size="md"
                colorScheme="green"
                borderRadius="8px"
                loading={uploading}
                loadingText="Yükleniyor..."
                cursor="pointer"
                onClick={() => document.getElementById('image-upload')?.click()}
                _hover={{
                  borderColor: "green.500",
                  color: "green.600"
                }}
              >
                {uploadedImage ? 'Görseli Değiştir' : 'Görsel Yükle'}
              </Button>
              {uploadedImage && (
                <Box>
                  <Text fontSize="xs" color="green.600" mb={2}>
                    ✓ Görsel yüklendi
                  </Text>
                  <Image
                    src={uploadedImage}
                    alt="Eğitim görseli"
                    w="100%"
                    h="120px"
                    objectFit="cover"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="gray.200"
                    shadow="sm"
                  />
                </Box>
              )}
            </VStack>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}