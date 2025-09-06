"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        green: {
          500: { value: "#4CAF50" },
          600: { value: "#43A047" },
        },
        orange: {
          500: { value: "#FF9800" },
          50: { value: "#FFF3E0" },
        },
        gray: {
          50: { value: "#FAFAFA" },
          100: { value: "#F5F5F5" },
          700: { value: "#616161" },
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