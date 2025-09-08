'use client';

import { Toaster as HotToaster, toast } from 'react-hot-toast';

export const toaster = toast;

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#ffffff',
          color: '#1a202c',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '16px',
        },
        success: {
          style: {
            borderColor: '#38A169', // green.500
          },
          iconTheme: {
            primary: '#38A169',
            secondary: '#ffffff',
          },
        },
        error: {
          style: {
            borderColor: '#E53E3E', // red.500
          },
          iconTheme: {
            primary: '#E53E3E',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}