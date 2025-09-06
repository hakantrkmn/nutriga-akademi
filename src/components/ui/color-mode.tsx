"use client"

import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider } from "next-themes"

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider 
      attribute="class" 
      disableTransitionOnChange 
      enableSystem={false}
      defaultTheme="light"
      {...props} 
    />
  )
}