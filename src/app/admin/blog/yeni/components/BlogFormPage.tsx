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
  Input,
  NativeSelectField,
  NativeSelectRoot
} from '@chakra-ui/react'
import { 
  FiArrowLeft, 
  FiSave
} from 'react-icons/fi'
import { blogApi, BlogPostData } from '@/lib/api'
import TipTapEditor from '@/components/admin/TipTapEditor'

export default function BlogFormPage({ blogId }: { blogId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [, setInitialData] = useState<BlogPostData | null>(null)
  const [loadingData, setLoadingData] = useState(!!blogId)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: null as object | null,
    imageUrl: '',
    slug: '',
    category: 'Genel',
    author: 'Admin',
    publishedAt: new Date().toISOString().split('T')[0]
  })

  const isEditing = !!blogId

  // Blog verilerini yükle (düzenleme modunda)
  useEffect(() => {
    if (blogId) {
      const loadBlogData = async () => {
        try {
          setLoadingData(true)
          const response = await blogApi.getById(blogId)
          
          if (response.success && response.data) {
            setInitialData(response.data)
            setFormData({
              title: response.data.title || '',
              description: response.data.excerpt || '',
              content: typeof response.data.content === 'object' ? response.data.content : null,
              imageUrl: response.data.imageUrl || '',
              slug: response.data.slug || '',
              category: response.data.category || 'Genel',
              author: response.data.author || 'Admin',
              publishedAt: response.data.createdAt ? new Date(response.data.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            })
          } else {
            console.error('Blog verileri yüklenemedi')
            router.push('/admin/blog')
          }
        } catch (error) {
          console.error('Blog verileri yüklenirken hata:', error)
          router.push('/admin/blog')
        } finally {
          setLoadingData(false)
        }
      }

      loadBlogData()
    }
  }, [blogId, router])

  // Form kaydetme
  const handleSave = async () => {
    try {
      setLoading(true)
      const data = {
        title: formData.title,
        excerpt: formData.description,
        content: JSON.stringify(formData.content),
        imageUrl: formData.imageUrl,
        slug: formData.slug,
        category: formData.category,
        author: formData.author
      }
      
      let response

      if (isEditing && blogId) {
        // Güncelle
        response = await blogApi.update(blogId, data)
      } else {
        // Yeni oluştur
        response = await blogApi.create(data as Omit<BlogPostData, 'id' | 'createdAt' | 'updatedAt'>)
      }

      if (response.success) {
        console.log(isEditing ? 'Blog yazısı güncellendi' : 'Blog yazısı oluşturuldu')
        router.push('/admin/blog')
      } else {
        console.error('İşlem başarısız:', response.error)
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  // İptal
  const handleCancel = () => {
    router.push('/admin/blog')
  }

  if (loadingData) {
    return (
      <Container maxW="800px" p={6}>
        <VStack gap={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                Blog Yükleniyor...
              </Heading>
              <Text color="gray.600">
                Blog verileri yükleniyor, lütfen bekleyin
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="800px" p={6}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="lg" color="gray.900">
              {isEditing ? 'Blog Yazısı Düzenle' : 'Yeni Blog Yazısı Ekle'}
            </Heading>
            <Text color="gray.600">
              {isEditing ? 'Blog yazısı bilgilerini düzenleyin' : 'Yeni bir blog yazısı oluşturun'}
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
              {isEditing ? 'Güncelle' : 'Kaydet'}
            </Button>
          </HStack>
        </HStack>

        {/* Blog Bilgileri - Üstte */}
        <Box p={6} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200" shadow="sm">
          <VStack gap={4} align="stretch">
            <Heading size="md" color="gray.900">
              Blog Bilgileri
            </Heading>
            
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              {/* Başlık */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Blog Başlığı
                  </Text>
                  <Input
                    placeholder="Blog yazısının başlığını girin..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    size="lg"
                  />
                </Box>
              </GridItem>

              {/* Slug */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    URL Slug
                  </Text>
                  <Input
                    placeholder="blog-yazisi-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </Box>
              </GridItem>

              {/* Kategori */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Kategori
                  </Text>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Genel">Genel</option>
                      <option value="Beslenme">Beslenme</option>
                      <option value="Sağlık">Sağlık</option>
                      <option value="Yaşam Tarzı">Yaşam Tarzı</option>
                      <option value="Haberler">Haberler</option>
                      <option value="İpuçları">İpuçları</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Box>
              </GridItem>

              {/* Yazar */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Yazar
                  </Text>
                  <Input
                    placeholder="Yazar adı"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </Box>
              </GridItem>

              {/* Yayın Tarihi */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Yayın Tarihi
                  </Text>
                  <Input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  />
                </Box>
              </GridItem>

              {/* Görsel URL */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Görsel URL
                  </Text>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </Box>
              </GridItem>
            </Grid>

            {/* Açıklama - Tam genişlik */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                Kısa Açıklama
              </Text>
              <Input
                placeholder="Blog yazısının kısa açıklamasını girin..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                size="lg"
              />
            </Box>
          </VStack>
        </Box>

        {/* İçerik Editor - Tam genişlik */}
        <Box p={6} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200" shadow="sm">
          <VStack gap={4} align="stretch">
            <Heading size="md" color="gray.900">
              Blog İçeriği
            </Heading>
            <TipTapEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Blog yazısının içeriğini buraya yazın..."
            />
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}