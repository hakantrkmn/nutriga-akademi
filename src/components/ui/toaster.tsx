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
        classNames: {
          toast: "!bg-white !border !border-gray-200 !rounded-xl !shadow-lg",
          title: "!text-gray-900 !font-semibold",
          description: "!text-gray-600",
          actionButton:
            "!bg-primary-600 !text-white !rounded-lg !px-4 !py-2 !font-medium hover:!bg-primary-700",
          cancelButton:
            "!bg-gray-100 !text-gray-700 !rounded-lg !px-4 !py-2 !font-medium hover:!bg-gray-200",
          closeButton: "!text-gray-400 hover:!text-gray-600",
        },
      }}
      icons={{
        success: (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-3 w-3 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ),
        error: (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-3 w-3 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ),
        warning: (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100">
            <svg
              className="h-3 w-3 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ),
        info: (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-3 w-3 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ),
      }}
    />
  );
}
