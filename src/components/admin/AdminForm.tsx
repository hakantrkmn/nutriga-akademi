'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Card,
  Icon
} from '@chakra-ui/react'
import { FiSave, FiX } from 'react-icons/fi'
import TipTapEditor from './TipTapEditor'

interface AdminFormProps {
  type: 'egitim' | 'blog'
  initialData?: Record<string, unknown>
  onSave: (data: Record<string, unknown>) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export default function AdminForm({ 
  type, 
  initialData, 
  onSave, 
  onCancel, 
  loading = false 
}: AdminFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    slug: '',
    price: 0,
    category: '',
    excerpt: '',
    author: ''
  })
  const [content, setContent] = useState<object | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: (initialData.title as string) || '',
        description: (initialData.description as string) || '',
        content: '',
        imageUrl: (initialData.imageUrl as string) || (initialData.image_url as string) || '',
        slug: (initialData.slug as string) || '',
        price: (initialData.price as number) || 0,
        category: (initialData.category as string) || '',
        excerpt: (initialData.excerpt as string) || '',
        author: (initialData.author as string) || ''
      })
      // TipTap content'i JSON olarak parse et
      try {
        const contentData = initialData.content
        if (typeof contentData === 'string') {
          // Eğer string ise, JSON parse etmeye çalış
          try {
            setContent(JSON.parse(contentData))
          } catch {
            // JSON değilse, basit bir paragraph olarak oluştur
            setContent({
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: contentData
                    }
                  ]
                }
              ]
            })
          }
        } else if (typeof contentData === 'object' && contentData !== null) {
          setContent(contentData)
        } else {
          setContent(null)
        }
      } catch (error) {
        console.error('Content parse hatası:', error)
        setContent(null)
      }
    }
  }, [initialData])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: generateSlug(value)
    }))
  }

  const handleSave = async () => {
    try {
      const dataToSave = {
        ...formData,
        content: content ? JSON.stringify(content) : '',
        imageUrl: formData.imageUrl,
        slug: formData.slug || generateSlug(formData.title)
      }

      await onSave(dataToSave)
      console.log(`${type === 'egitim' ? 'Eğitim' : 'Blog yazısı'} başarıyla kaydedildi.`)
    } catch (error) {
      console.error('Kaydetme işlemi başarısız oldu:', error)
    }
  }

  const isEgitim = type === 'egitim'
  const isBlog = type === 'blog'

  return (
    <Card.Root p={6} maxW="6xl" mx="auto" h="full">
      <VStack gap={6} align="stretch" h="full">
        {/* Header - Sadece fullscreen değilse göster */}
        <Box display={{ base: 'block', lg: 'none' }}>
          <Heading size="lg" color="gray.900" mb={2}>
            {initialData ? 'Düzenle' : 'Yeni Ekle'} - {isEgitim ? 'Eğitim' : 'Blog Yazısı'}
          </Heading>
          <Text color="gray.600">
            {isEgitim ? 'Yeni bir eğitim ekleyin veya mevcut eğitimi düzenleyin.' : 'Yeni bir blog yazısı ekleyin veya mevcut yazıyı düzenleyin.'}
          </Text>
        </Box>

        {/* Form Fields */}
        <VStack gap={4} align="stretch" flex="1" overflow="auto">
          {/* Title */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
              Başlık *
            </Text>
            <Input
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder={isEgitim ? 'Eğitim başlığı' : 'Blog yazısı başlığı'}
              size="lg"
              required
            />
          </Box>

          {/* Slug */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
              URL Slug *
            </Text>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-slug"
              size="lg"
              required
            />
            <Text fontSize="xs" color="gray.500" mt={1}>
              URL: /{isEgitim ? 'egitimler' : 'blog'}/{formData.slug || 'url-slug'}
            </Text>
          </Box>

          {/* Description (Eğitim için) */}
          {isEgitim && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
                Açıklama
              </Text>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Eğitim açıklaması"
                rows={3}
                resize="vertical"
              />
            </Box>
          )}

          {/* Excerpt (Blog için) */}
          {isBlog && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
                Özet
              </Text>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Blog yazısı özeti"
                rows={3}
                resize="vertical"
              />
            </Box>
          )}

          {/* Author (Blog için) */}
          {isBlog && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
                Yazar
              </Text>
              <Input
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Yazar adı"
                size="lg"
              />
            </Box>
          )}

          {/* Category */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
              Kategori
            </Text>
            <Input
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Kategori girin"
              size="lg"
              list="category-list"
            />
            <datalist id="category-list">
              {isEgitim ? (
                <>
                  <option value="Temel Beslenme" />
                  <option value="Klinik Beslenme" />
                  <option value="Sporcu Beslenmesi" />
                  <option value="Pediatrik Beslenme" />
                  <option value="Geriatrik Beslenme" />
                  <option value="Beslenme Danışmanlığı" />
                  <option value="Fonksiyonel Beslenme" />
                </>
              ) : (
                <>
                  <option value="Beslenme Bilimi" />
                  <option value="Diyet Rehberi" />
                  <option value="Sağlıklı Tarifler" />
                  <option value="Sporcu Beslenmesi" />
                  <option value="Çocuk Beslenmesi" />
                  <option value="Yaşlı Beslenmesi" />
                  <option value="Hastalık ve Beslenme" />
                </>
              )}
            </datalist>
          </Box>

          {/* Price (Eğitim için) */}
          {isEgitim && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
                Fiyat (₺)
              </Text>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                min={0}
                step={0.01}
                placeholder="0.00"
                size="lg"
              />
            </Box>
          )}

          {/* Image URL */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
              Görsel URL
            </Text>
            <Input
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              size="lg"
            />
          </Box>

          {/* Content Editor */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.800">
              İçerik *
            </Text>
            <TipTapEditor
              content={content}
              onChange={setContent}
              placeholder={isEgitim ? 'Eğitim içeriğini buraya yazın...' : 'Blog yazısı içeriğini buraya yazın...'}
            />
          </Box>
        </VStack>

        {/* Actions */}
        <HStack justify="flex-end" gap={3} pt={4} flexShrink={0}>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            <Icon as={FiX} mr={2} />
            İptal
          </Button>
          <Button
            colorScheme="green"
            onClick={handleSave}
            loading={loading}
            loadingText="Kaydediliyor..."
          >
            <Icon as={FiSave} mr={2} />
            {initialData ? 'Güncelle' : 'Kaydet'}
          </Button>
        </HStack>
      </VStack>
    </Card.Root>
  )
}
