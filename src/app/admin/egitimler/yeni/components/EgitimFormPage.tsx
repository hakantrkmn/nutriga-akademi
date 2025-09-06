'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon,
  Grid,
  GridItem,
  Card,
  Input,
  NativeSelectField,
  NativeSelectRoot
} from '@chakra-ui/react'
import { 
  FiArrowLeft, 
  FiClock, 
  FiShoppingCart, 
  FiBarChart, 
  FiAward,
  FiSave
} from 'react-icons/fi'
import { egitimlerApi, EgitimData } from '@/lib/api'
import TipTapEditor from '@/components/admin/TipTapEditor'

export default function EgitimFormPage({ egitimId }: { egitimId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [, setInitialData] = useState<EgitimData | null>(null)
  const [loadingData, setLoadingData] = useState(!!egitimId)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: null as object | null,
    imageUrl: '',
    slug: '',
    price: 299,
    category: 'Temel Beslenme',
    level: 'Başlangıç',
    duration: '8 saat',
    instructor: 'Dr. Ahmet Yılmaz',
    salesCount: 156
  })

  const isEditing = !!egitimId

  // Eğitim verilerini yükle (düzenleme modunda)
  useEffect(() => {
    if (egitimId) {
      const loadEgitimData = async () => {
        try {
          setLoadingData(true)
          const response = await egitimlerApi.getById(egitimId)
          
          if (response.success && response.data) {
            setInitialData(response.data)
          } else {
            console.error('Eğitim verileri yüklenemedi')
            router.push('/admin/egitimler')
          }
        } catch (error) {
          console.error('Eğitim verileri yüklenirken hata:', error)
          router.push('/admin/egitimler')
        } finally {
          setLoadingData(false)
        }
      }

      loadEgitimData()
    }
  }, [egitimId, router])

  // Form kaydetme
  const handleSave = async () => {
    try {
      setLoading(true)
      const data = {
        ...formData,
        content: JSON.stringify(formData.content)
      }
      
      let response

      if (isEditing && egitimId) {
        // Güncelle
        response = await egitimlerApi.update(egitimId, data)
      } else {
        // Yeni oluştur
        response = await egitimlerApi.create(data as Omit<EgitimData, 'id' | 'createdAt' | 'updatedAt'>)
      }

      if (response.success) {
        console.log(isEditing ? 'Eğitim güncellendi' : 'Eğitim oluşturuldu')
        router.push('/admin/egitimler')
      } else {
        console.error('İşlem başarısız:', response.error)
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  // Slug oluştur
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  // JSON dosyası olarak kaydet
  const handleSaveAsJSON = () => {
    const dataToSave = {
      ...formData,
      content: formData.content,
      savedAt: new Date().toISOString(),
      version: '1.0'
    }

    const jsonString = JSON.stringify(dataToSave, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `egitim-${formData.slug || 'yeni'}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // İptal
  const handleCancel = () => {
    router.push('/admin/egitimler')
  }

  if (loadingData) {
    return (
      <Box>
        <VStack gap={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                Eğitim Yükleniyor...
              </Heading>
              <Text color="gray.600">
                Eğitim verileri yükleniyor, lütfen bekleyin
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    )
  }

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Admin Header */}
      <Box bg="white" borderBottom="1px solid" borderColor="gray.100" shadow="sm">
        <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                {isEditing ? 'Eğitim Düzenle' : 'Yeni Eğitim Ekle'}
              </Heading>
              <Text color="gray.600">
                {isEditing ? 'Eğitim bilgilerini düzenleyin' : 'Yeni bir eğitim oluşturun'}
              </Text>
            </Box>
            <HStack gap={3}>
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                <Icon as={FiArrowLeft} mr={2} />
                Geri Dön
              </Button>
              <Button
                colorScheme="green"
                onClick={handleSave}
                loading={loading}
                loadingText="Kaydediliyor..."
              >
                <Icon as={FiSave} mr={2} />
                Kaydet
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", lg: "2.5fr 1.5fr" }} gap={{ base: 12, lg: 10 }}>
          
          {/* Left Column: Editor */}
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
              {/* Content Editor */}
              <TipTapEditor
                content={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Eğitim içeriğini yazın..."
              />
            </Box>
          </GridItem>

          {/* Right Column: Preview & Settings */}
          <GridItem>
            <VStack gap={6} position={{ lg: "sticky" }} top="6rem">
              {/* Preview Card */}
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
                        ₺{formData.price}
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
                          <Text fontWeight="semibold" color="gray.800">{formData.duration}</Text>
                        </HStack>
                        <HStack justify="space-between" w="full" p={3} bg="gray.50" borderRadius="8px">
                          <HStack gap={3}>
                            <Icon as={FiBarChart} color="green.500" boxSize={4} />
                            <Text fontWeight="medium" color="gray.700">Seviye</Text>
                          </HStack>
                          <Text fontWeight="semibold" color="gray.800">{formData.level}</Text>
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
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Settings Card */}
              <Card.Root 
                w="full" 
                shadow="lg" 
                borderRadius="16px" 
                bg="white" 
                border="1px solid" 
                borderColor="gray.200"
              >
                <Card.Body p={6}>
                  <VStack gap={4} align="stretch">
                    <Heading as="h3" size="md" color="gray.800" fontFamily="Poppins, sans-serif">
                      Eğitim Ayarları
                    </Heading>
                    
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Eğitim Başlığı
                      </Text>
                      <Input
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value
                          setFormData(prev => ({
                            ...prev,
                            title,
                            slug: generateSlug(title)
                          }))
                        }}
                        placeholder="Eğitim başlığını girin..."
                        size="sm"
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Açıklama
                      </Text>
                      <Input
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Eğitim açıklamasını girin..."
                        size="sm"
                      />
                    </Box>
                    
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Fiyat (₺)
                      </Text>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                        placeholder="299"
                        size="sm"
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Kategori
                      </Text>
                      <NativeSelectRoot size="sm">
                        <NativeSelectField
                          value={formData.category}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="Temel Beslenme">Temel Beslenme</option>
                          <option value="Klinik Beslenme">Klinik Beslenme</option>
                          <option value="Sporcu Beslenmesi">Sporcu Beslenmesi</option>
                          <option value="Pediatrik Beslenme">Pediatrik Beslenme</option>
                          <option value="Geriatrik Beslenme">Geriatrik Beslenme</option>
                          <option value="Beslenme Danışmanlığı">Beslenme Danışmanlığı</option>
                          <option value="Fonksiyonel Beslenme">Fonksiyonel Beslenme</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Seviye
                      </Text>
                      <NativeSelectRoot size="sm">
                        <NativeSelectField
                          value={formData.level}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                        >
                          <option value="Başlangıç">Başlangıç</option>
                          <option value="Orta">Orta</option>
                          <option value="İleri">İleri</option>
                          <option value="Uzman">Uzman</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Süre
                      </Text>
                      <Input
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="8 saat"
                        size="sm"
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Eğitmen
                      </Text>
                      <Input
                        value={formData.instructor}
                        onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                        placeholder="Dr. Ahmet Yılmaz"
                        size="sm"
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                        Slug
                      </Text>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="egitim-slug"
                        size="sm"
                      />
                    </Box>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </VStack>
          </GridItem>
        </Grid>

        {/* JSON Kaydet Butonu */}
        <Box mt={8} textAlign="center">
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={handleSaveAsJSON}
            size="lg"
            borderRadius="12px"
            px={8}
            py={6}
            fontSize="md"
            fontWeight="semibold"
            _hover={{
              bg: "blue.50",
              borderColor: "blue.300",
              transform: "translateY(-1px)",
              shadow: "md"
            }}
            transition="all 0.2s ease"
          >
            <Icon as={FiSave} mr={3} />
            JSON Olarak Kaydet
          </Button>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Editör içeriğini JSON dosyası olarak bilgisayarınıza indirin
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
