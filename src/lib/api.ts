// Type-safe API client

import { Egitim } from "@/types";
import { BlogPost } from "@prisma/client";
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AdminStats {
  totalEgitimler: number;
  totalBlogYazilari: number;
  totalKullanicilar: number;
  totalSatislar: number;
}

// API Base URL
const API_BASE = "/api";

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call error:", error);
    return {
      success: false,
      error: "Network error occurred",
    };
  }
}

// Eğitimler API
export const egitimlerApi = {
  // Tüm eğitimleri getir
  getAll: (): Promise<ApiResponse<Egitim[]>> => apiCall<Egitim[]>("/egitimler"),

  // Tek eğitim getir
  getById: (id: string): Promise<ApiResponse<Egitim>> =>
    apiCall<Egitim>(`/egitimler/${id}`),

  // Yeni eğitim oluştur
  create: (
    data: Omit<Egitim, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Egitim>> =>
    apiCall<Egitim>("/egitimler", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Eğitim güncelle
  update: (id: string, data: Partial<Egitim>): Promise<ApiResponse<Egitim>> =>
    apiCall<Egitim>(`/egitimler/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Eğitim sil
  delete: (id: string): Promise<ApiResponse<void>> =>
    apiCall<void>(`/egitimler/${id}`, {
      method: "DELETE",
    }),
};

// Blog Posts API
export const blogApi = {
  // Tüm blog yazılarını getir
  getAll: (): Promise<ApiResponse<BlogPost[]>> => apiCall<BlogPost[]>("/blog"),

  // Tek blog yazısı getir
  getById: (id: string): Promise<ApiResponse<BlogPost>> =>
    apiCall<BlogPost>(`/blog/${id}`),

  // Yeni blog yazısı oluştur
  create: (
    data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<BlogPost>> =>
    apiCall<BlogPost>("/blog", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Blog yazısı güncelle
  update: (
    id: string,
    data: Partial<BlogPost>
  ): Promise<ApiResponse<BlogPost>> =>
    apiCall<BlogPost>(`/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Blog yazısı sil
  delete: (id: string): Promise<ApiResponse<void>> =>
    apiCall<void>(`/blog/${id}`, {
      method: "DELETE",
    }),
};

// Admin API
export const adminApi = {
  // Dashboard istatistikleri
  getStats: (): Promise<ApiResponse<AdminStats>> =>
    apiCall<AdminStats>("/admin/stats"),
};

// Cart API
export interface CartItemDTO {
  id: string;
  userId: string;
  educationId: string;
  quantity: number;
  createdAt: string;
  education?: Egitim;
}

export const cartApi = {
  get: (): Promise<ApiResponse<CartItemDTO[]>> =>
    apiCall<CartItemDTO[]>("/cart"),

  add: (educationId: string, quantity = 1): Promise<ApiResponse<CartItemDTO>> =>
    apiCall<CartItemDTO>("/cart", {
      method: "POST",
      body: JSON.stringify({ educationId, quantity }),
    }),

  updateQuantity: (
    id: string,
    quantity: number
  ): Promise<ApiResponse<CartItemDTO>> =>
    apiCall<CartItemDTO>(`/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),

  remove: (id: string): Promise<ApiResponse<void>> =>
    apiCall<void>(`/cart/${id}`, { method: "DELETE" }),
};
