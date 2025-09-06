"use client";

import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Text,
  Icon,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Menu,
  Portal,
  Drawer,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";

const navLinkStyles = {
  fontSize: "md",
  fontWeight: "medium",
  color: "gray.700",
  _hover: { color: "green.500" },
  cursor: "pointer",
  transition: "color 0.2s ease",
};

export default function Header() {
  const { open, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const NavItems = () => (
    <>
      <Link href="/">
        <Text {...navLinkStyles}>Ana Sayfa</Text>
      </Link>

      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            variant="ghost"
            fontSize="md"
            fontWeight="medium"
            color="gray.700"
            bg="transparent"
            _hover={{ color: "green.500", bg: "transparent" }}
            _active={{ bg: "transparent" }}
            _focus={{ boxShadow: "none" }}
            p={0}
            h="auto"
            minH="auto"
          >
            Kurumsal
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              shadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              borderRadius="12px"
              p={2}
              minW="180px"
              mt={2}
              overflow="hidden"
            >
              <Menu.Item 
                value="hakkimizda" 
                px={4}
                py={3}
                borderRadius="8px" 
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
                _hover={{ 
                  bg: "green.50",
                  color: "green.600"
                }}
                _focus={{ 
                  bg: "green.50",
                  color: "green.600"
                }}
                cursor="pointer"
                transition="all 0.2s ease"
                asChild
              >
                <Link href="/hakkimizda">Hakkımızda</Link>
              </Menu.Item>
              <Menu.Item 
                value="misyon" 
                px={4}
                py={3}
                borderRadius="8px" 
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
                _hover={{ 
                  bg: "green.50",
                  color: "green.600"
                }}
                _focus={{ 
                  bg: "green.50",
                  color: "green.600"
                }}
                cursor="pointer"
                transition="all 0.2s ease"
                asChild
              >
                <Link href="/misyon">Misyonumuz</Link>
              </Menu.Item>
              <Menu.Item 
                value="vizyon" 
                px={4}
                py={3}
                borderRadius="8px" 
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
                _hover={{ 
                  bg: "green.50",
                  color: "green.600"
                }}
                _focus={{ 
                  bg: "green.50",
                  color: "green.600"
                }}
                cursor="pointer"
                transition="all 0.2s ease"
                asChild
              >
                <Link href="/vizyon">Vizyonumuz</Link>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <Link href="/egitimler">
        <Text {...navLinkStyles}>Eğitimler</Text>
      </Link>

      <Link href="/blog">
        <Text {...navLinkStyles}>Blog</Text>
      </Link>

      <Link href="/iletisim">
        <Text {...navLinkStyles}>İletişim</Text>
      </Link>
    </>
  );

  return (
    <Box 
      as="header" 
      bg="white" 
      shadow="sm" 
      borderBottom="1px" 
      borderColor="gray.100"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link href="/">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="green.500"
            cursor="pointer"
            _hover={{ color: "green.600" }}
          >
            NutriHome Akademi
          </Text>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <HStack gap={8}>
            <NavItems />
          </HStack>
        )}

        {/* Desktop Auth Buttons */}
        {!isMobile && (
          <HStack gap={3}>
            <Button
              variant="ghost"
              borderRadius="12px"
              color="gray.700"
              _hover={{ bg: "gray.50" }}
            >
              Giriş Yap
            </Button>
            <Button
              bg="orange.500"
              color="white"
              borderRadius="12px"
              _hover={{ bg: "orange.600" }}
            >
              Kayıt Ol
            </Button>
          </HStack>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <IconButton
            aria-label="Open menu"
            onClick={onOpen}
            variant="ghost"
          >
            <Icon>
              <HiMenu />
            </Icon>
          </IconButton>
        )}
      </Flex>

      {/* Mobile Drawer */}
      <Drawer.Root open={open} onOpenChange={(details) => details.open ? onOpen() : onClose()}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Menü</Drawer.Title>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body pt={6}>
              <VStack gap={6} align="start" w="full">
                <NavItems />
                
                <Box pt={6} w="full">
                  <VStack gap={3} w="full">
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="start"
                      borderRadius="12px"
                      color="gray.700"
                      _hover={{ bg: "gray.50" }}
                    >
                      Giriş Yap
                    </Button>
                    <Button
                      bg="orange.500"
                      color="white"
                      w="full"
                      borderRadius="12px"
                      _hover={{ bg: "orange.600" }}
                    >
                      Kayıt Ol
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}