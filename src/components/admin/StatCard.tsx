'use client'

import {
  Box,
  VStack,
  HStack,
  Text,
  Card,
  Icon
} from '@chakra-ui/react'

interface StatCardProps {
  title: string
  value: number | string
  icon: React.ComponentType
  color: string
  loading?: boolean
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  color, 
  loading = false 
}: StatCardProps) {
  return (
    <Card.Root p={6} h="full" bg="white" border="1px" borderColor="gray.200" borderRadius="lg">
      <VStack gap={4} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
              {loading ? '...' : value}
            </Text>
          </Box>
          <Box
            p={3}
            borderRadius="lg"
            bg={`${color}.100`}
            color={`${color}.600`}
          >
            <Icon as={icon} boxSize={6} />
          </Box>
        </HStack>
      </VStack>
    </Card.Root>
  )
}
