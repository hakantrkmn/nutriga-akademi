"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        green: {
          50: { value: "#E8F5E8" },
          100: { value: "#C8E6C9" },
          500: { value: "#4CAF50" },
          600: { value: "#43A047" },
        },
        orange: {
          50: { value: "#FFF3E0" },
          100: { value: "#FFE0B2" },
          500: { value: "#FF9800" },
          600: { value: "#F57C00" },
        },
        blue: {
          50: { value: "#E3F2FD" },
          100: { value: "#BBDEFB" },
          500: { value: "#2196F3" },
          600: { value: "#1976D2" },
        },
        purple: {
          50: { value: "#F3E5F5" },
          100: { value: "#E1BEE7" },
          500: { value: "#9C27B0" },
          600: { value: "#7B1FA2" },
        },
        gray: {
          50: { value: "#FAFAFA" },
          100: { value: "#F5F5F5" },
          200: { value: "#E5E5E5" },
          500: { value: "#9E9E9E" },
          600: { value: "#757575" },
          700: { value: "#616161" },
          800: { value: "#424242" },
          900: { value: "#212121" },
        },
      },
    },
  },
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}