'use client'

import { useState } from 'react'
import { Box, VStack, HStack, Button, Text, Heading, Container } from '@chakra-ui/react'
import TipTapEditor from '@/components/admin/TipTapEditor'

export default function TestEditorPage() {
  const [content, setContent] = useState<object | null>(null)
  const [savedContent, setSavedContent] = useState<object | null>(null)

  const handleSave = () => {
    if (!content) {
      alert('Kaydedilecek içerik bulunamadı!')
      return
    }

    setSavedContent(content)
    
    // JSON dosyası olarak indir
    const dataStr = JSON.stringify(content, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `tiptap-content-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log('Saved content:', content)
  }

  const handleClear = () => {
    setContent(null)
    setSavedContent(null)
  }

  const handleLoadSample = () => {
    const sampleContent = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'TipTap Editör Test Sayfası' }]
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Bu bir ' },
            { type: 'text', marks: [{ type: 'bold' }], text: 'kalın' },
            { type: 'text', text: ' ve ' },
            { type: 'text', marks: [{ type: 'italic' }], text: 'italik' },
            { type: 'text', text: ' metin örneğidir.' }
          ]
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Özellikler' }]
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Görsel yükleme ve boyutlandırma' }]
                }
              ]
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Tablo ekleme' }]
                }
              ]
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Kod blokları' }]
                }
              ]
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Link ekleme' }]
                }
              ]
            }
          ]
        },
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Kod Örneği' }]
        },
        {
          type: 'codeBlock',
          attrs: { language: 'javascript' },
          content: [
            {
              type: 'text',
              text: 'const editor = useEditor({\n  extensions: [StarterKit],\n  content: \'<p>Hello World!</p>\',\n})'
            }
          ]
        },
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Alıntı' }]
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'TipTap, modern web uygulamaları için güçlü bir rich text editörüdür.' }
              ]
            }
          ]
        }
      ]
    }
    setContent(sampleContent)
  }

  return (
    <Container maxW="full" p={0} h="100vh">
      <VStack h="100vh" spacing={0}>
        {/* Header */}
        <Box w="full" bg="gray.50" p={4} borderBottom="1px" borderColor="gray.200">
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="lg" color="gray.800">
                TipTap Editör Test Sayfası
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Tüm editör özelliklerini test edebilirsiniz
              </Text>
            </VStack>
            <HStack spacing={3}>
              <Button
                onClick={handleLoadSample}
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                Örnek İçerik Yükle
              </Button>
              <Button
                onClick={handleSave}
                colorScheme="green"
                size="sm"
              >
                Kaydet
              </Button>
              <Button
                onClick={handleClear}
                colorScheme="red"
                variant="outline"
                size="sm"
              >
                Temizle
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* Editor */}
        <Box w="full" flex="1" p={4} position="relative">
          <TipTapEditor
            content={content}
            onChange={setContent}
            placeholder="Buraya yazmaya başlayın... Tüm editör özelliklerini test edebilirsiniz!"
          />
          
          {/* Floating Save Button - Sağ alt köşe */}
          <Button
            onClick={handleSave}
            colorScheme="green"
            size="lg"
            position="fixed"
            bottom="20px"
            right="20px"
            borderRadius="full"
            boxShadow="lg"
            zIndex={1000}
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: 'xl'
            }}
            transition="all 0.2s"
            isDisabled={!content}
          >
            💾 Kaydet
          </Button>
        </Box>

        {/* Footer - Content Preview */}
        {savedContent && (
          <Box w="full" bg="gray.100" p={4} borderTop="1px" borderColor="gray.200" maxH="200px" overflow="auto">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" color="gray.700">
                Kaydedilen İçerik (JSON):
              </Text>
              <Box
                bg="white"
                p={3}
                borderRadius="md"
                border="1px"
                borderColor="gray.300"
                w="full"
                fontSize="xs"
                fontFamily="mono"
                overflow="auto"
              >
                <pre>{JSON.stringify(savedContent, null, 2)}</pre>
              </Box>
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  )
}
