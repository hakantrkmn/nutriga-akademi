"use client";

import { Toaster as SonnerToaster, toast } from "sonner";

export const toaster = toast;

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      theme="light"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#ffffff",
          color: "#1a202c",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      }}
    />
  );
}
