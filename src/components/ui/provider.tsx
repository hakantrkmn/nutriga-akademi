"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#FFF8F5" },
          100: { value: "#FEECE4" },
          200: { value: "#FDDACF" },
          300: { value: "#FBC8BA" },
          400: { value: "#F9B6A5" },
          500: { value: "#F7C5A8" }, // primary
          600: { value: "#F4B691" }, // primary-hover
          700: { value: "#F1A77B" },
          800: { value: "#EE9864" },
          900: { value: "#EB894D" },
        },
        accent: {
          50: { value: "#F5FCFB" },
          100: { value: "#EBF9F7" },
          200: { value: "#E0F6F4" },
          300: { value: "#D6F3F0" },
          400: { value: "#CCF0ED" },
          500: { value: "#A0C1B8" }, // accent
          600: { value: "#8EAEa4" }, // accent-hover
          700: { value: "#7D9B90" },
          800: { value: "#6B887C" },
          900: { value: "#5A7568" },
        },
        gray: {
          50: { value: "#FEFBF6" }, // background
          100: { value: "#FBF8F1" }, // background-alt
          200: { value: "#F6F3ED" },
          300: { value: "#F1EDE8" },
          400: { value: "#ECE8E3" },
          500: { value: "#B8B8B3" },
          600: { value: "#9A9994" },
          700: { value: "#7A7975" },
          800: { value: "#5C5B57" }, // foreground
          900: { value: "#3D3D3D" },
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