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

// Detaylı rapor interface'leri
export interface RecentSalesData {
  createdAt: Date;
  _count: {
    _all: number;
  };
}

export interface FailedPaymentData {
  id: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  reason: string | null;
  createdAt: Date;
}

export interface SuccessfulPaymentData {
  id: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  paidPrice: number;
  installment: number;
  paymentMethod: string | null;
  createdAt: Date;
}

export interface SalesReport {
  totalRevenue: number;
  recentSales: RecentSalesData[];
  failedPayments: FailedPaymentData[];
  successfulPayments: SuccessfulPaymentData[];
}

export interface UserPurchaseData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  createdAt: Date;
  _count: {
    cartItems: number;
  };
}

export interface ProfessionStatsData {
  profession: string;
  _count: {
    _all: number;
  };
}

export interface RecentUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  createdAt: Date;
}

export interface UserSpendingData {
  userId: string;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    profession: string;
  } | null;
  totalPurchases: number;
  totalSpent: number;
  totalItems: number;
}

export interface UsersReport {
  userPurchaseStats: UserPurchaseData[];
  professionStats: ProfessionStatsData[];
  recentUsers: RecentUserData[];
  userSpending: UserSpendingData[];
  totalPurchases: number;
  authUserCount: number;
}

// Analiz Raporu Interface'leri
export interface AnalizFilters {
  dateFrom?: string;
  dateTo?: string;
  userId?: string | string[];
  educationId?: string | string[];
  profession?: string | string[];
  category?: string | string[];
}

export interface SimpleUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
}

export interface UserAnalysisData {
  totalSpent: number;
  purchaseCount: number;
  purchasedEducations: {
    id: string;
    userName: string;
    title: string;
    price: number;
    paidPrice: number;
    purchaseDate: Date;
    status: string;
  }[];
}

export interface EducationAnalysisData {
  salesCount: number;
  totalRevenue: number;
  buyers: {
    id: string;
    name: string;
    email: string;
    profession: string;
    educationTitle: string;
    paidPrice: number;
    purchaseDate: Date;
  }[];
}

export interface AnalizResponse {
  userAnalysis?: UserAnalysisData;
  educationAnalysis?: EducationAnalysisData;
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

  // Eğitim aktif/pasif durumunu değiştir
  toggleActive: (id: string): Promise<ApiResponse<Egitim>> =>
    apiCall<Egitim>(`/egitimler/${id}/toggle-active`, {
      method: "PATCH",
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

  // Detaylı raporlar
  getSalesReport: (): Promise<ApiResponse<SalesReport>> =>
    apiCall<SalesReport>("/admin/reports/sales"),

  getUsersReport: (): Promise<ApiResponse<UsersReport>> =>
    apiCall<UsersReport>("/admin/reports/users"),

  // Tüm kullanıcıları getir (seçim için)
  getUsers: (): Promise<ApiResponse<SimpleUser[]>> =>
    apiCall<SimpleUser[]>("/admin/users"),

  // Analiz raporu
  getAnaliz: (filters: AnalizFilters): Promise<ApiResponse<AnalizResponse>> => {
    const queryParams = new URLSearchParams();
    if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);

    if (filters.userId) {
      if (Array.isArray(filters.userId)) {
        filters.userId.forEach((id) => queryParams.append("userId", id));
      } else {
        queryParams.append("userId", filters.userId);
      }
    }

    if (filters.educationId) {
      if (Array.isArray(filters.educationId)) {
        filters.educationId.forEach((id) =>
          queryParams.append("educationId", id)
        );
      } else {
        queryParams.append("educationId", filters.educationId);
      }
    }

    if (filters.profession) {
      if (Array.isArray(filters.profession)) {
        filters.profession.forEach((p) => queryParams.append("profession", p));
      } else {
        queryParams.append("profession", filters.profession);
      }
    }

    if (filters.category) {
      if (Array.isArray(filters.category)) {
        filters.category.forEach((c) => queryParams.append("category", c));
      } else {
        queryParams.append("category", filters.category);
      }
    }

    return apiCall<AnalizResponse>(`/admin/analiz?${queryParams.toString()}`);
  },
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
