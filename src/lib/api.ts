// Type-safe API client

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface EgitimData {
  id?: string
  title: string
  description?: string
  content: object | string
  imageUrl?: string
  slug: string
  price?: number
  category?: string
  salesCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface BlogPostData {
  id?: string
  title: string
  content: object | string
  imageUrl?: string
  slug: string
  category?: string
  excerpt?: string
  author?: string
  createdAt?: string
  updatedAt?: string
}

export interface AdminStats {
  totalEgitimler: number
  totalBlogYazilari: number
  totalKullanicilar: number
  totalSatislar: number
}

// API Base URL
const API_BASE = '/api'

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API call error:', error)
    return {
      success: false,
      error: 'Network error occurred'
    }
  }
}

// Eğitimler API
export const egitimlerApi = {
  // Tüm eğitimleri getir
  getAll: (): Promise<ApiResponse<EgitimData[]>> => 
    apiCall<EgitimData[]>('/egitimler'),

  // Tek eğitim getir
  getById: (id: string): Promise<ApiResponse<EgitimData>> => 
    apiCall<EgitimData>(`/egitimler/${id}`),

  // Yeni eğitim oluştur
  create: (data: Omit<EgitimData, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<EgitimData>> => 
    apiCall<EgitimData>('/egitimler', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Eğitim güncelle
  update: (id: string, data: Partial<EgitimData>): Promise<ApiResponse<EgitimData>> => 
    apiCall<EgitimData>(`/egitimler/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // Eğitim sil
  delete: (id: string): Promise<ApiResponse<void>> => 
    apiCall<void>(`/egitimler/${id}`, {
      method: 'DELETE'
    })
}

// Blog Posts API
export const blogApi = {
  // Tüm blog yazılarını getir
  getAll: (): Promise<ApiResponse<BlogPostData[]>> => 
    apiCall<BlogPostData[]>('/blog'),

  // Tek blog yazısı getir
  getById: (id: string): Promise<ApiResponse<BlogPostData>> => 
    apiCall<BlogPostData>(`/blog/${id}`),

  // Yeni blog yazısı oluştur
  create: (data: Omit<BlogPostData, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<BlogPostData>> => 
    apiCall<BlogPostData>('/blog', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Blog yazısı güncelle
  update: (id: string, data: Partial<BlogPostData>): Promise<ApiResponse<BlogPostData>> => 
    apiCall<BlogPostData>(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // Blog yazısı sil
  delete: (id: string): Promise<ApiResponse<void>> => 
    apiCall<void>(`/blog/${id}`, {
      method: 'DELETE'
    })
}

// Admin API
export const adminApi = {
  // Dashboard istatistikleri
  getStats: (): Promise<ApiResponse<AdminStats>> => 
    apiCall<AdminStats>('/admin/stats')
}
