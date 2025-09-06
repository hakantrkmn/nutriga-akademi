import { prisma } from './prisma'
import { createSupabaseAdmin } from './supabase'
import { Egitim } from '@/data/dummyEgitimData'
import { BlogPost } from '@/data/dummyBlogData'

// Admin işlemleri için helper fonksiyonlar

export async function seedEgitimler() {
  console.log('🌱 Eğitimler seed ediliyor...')
  
  try {
    // Önce mevcut eğitimleri temizle
    await prisma.egitim.deleteMany()
    
    // Dummy data'dan eğitimleri al
    const { dummyEgitimler } = await import('@/data/dummyEgitimData')
    
    for (const egitim of dummyEgitimler) {
      await prisma.egitim.create({
        data: {
          id: egitim.id,
          title: egitim.title,
          description: egitim.description,
          content: egitim.content,
          imageUrl: egitim.image_url,
          slug: egitim.slug,
          price: egitim.price,
          salesCount: egitim.sales_count,
          createdAt: new Date(egitim.created_at),
          updatedAt: new Date(egitim.updated_at)
        }
      })
    }
    
    console.log(`✅ ${dummyEgitimler.length} eğitim başarıyla seed edildi!`)
  } catch (error) {
    console.error('❌ Eğitimler seed edilirken hata:', error)
    throw error
  }
}

export async function seedBlogPosts() {
  console.log('🌱 Blog yazıları seed ediliyor...')
  
  try {
    // Önce mevcut blog yazılarını temizle
    await prisma.blogPost.deleteMany()
    
    // Dummy data'dan blog yazılarını al
    const { dummyBlogPosts } = await import('@/data/dummyBlogData')
    
    for (const post of dummyBlogPosts) {
      await prisma.blogPost.create({
        data: {
          id: post.id,
          title: post.title,
          content: post.content,
          imageUrl: post.image_url,
          slug: post.slug,
          category: post.category,
          excerpt: post.excerpt,
          author: post.author,
          createdAt: new Date(post.created_at),
          updatedAt: new Date(post.updated_at)
        }
      })
    }
    
    console.log(`✅ ${dummyBlogPosts.length} blog yazısı başarıyla seed edildi!`)
  } catch (error) {
    console.error('❌ Blog yazıları seed edilirken hata:', error)
    throw error
  }
}

export async function seedAll() {
  console.log('🚀 Tüm veriler seed ediliyor...')
  
  try {
    await seedEgitimler()
    await seedBlogPosts()
    console.log('🎉 Tüm veriler başarıyla seed edildi!')
  } catch (error) {
    console.error('❌ Seed işlemi başarısız:', error)
    throw error
  }
}

// Admin kontrolü
export function isAdminEmail(email: string): boolean {
  return email === process.env.ADMIN_EMAIL || email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
}

// Eğitim CRUD işlemleri
export async function createEgitim(data: {
  title: string
  description?: string
  content?: any
  imageUrl?: string
  slug: string
  price?: number
}) {
  return await prisma.egitim.create({
    data: {
      ...data,
      imageUrl: data.imageUrl,
      salesCount: 0
    }
  })
}

export async function updateEgitim(id: string, data: {
  title?: string
  description?: string
  content?: any
  imageUrl?: string
  slug?: string
  price?: number
}) {
  return await prisma.egitim.update({
    where: { id },
    data
  })
}

export async function deleteEgitim(id: string) {
  return await prisma.egitim.delete({
    where: { id }
  })
}

// Blog CRUD işlemleri
export async function createBlogPost(data: {
  title: string
  content: any
  imageUrl?: string
  slug: string
  category?: string
  excerpt?: string
  author?: string
}) {
  return await prisma.blogPost.create({
    data
  })
}

export async function updateBlogPost(id: string, data: {
  title?: string
  content?: any
  imageUrl?: string
  slug?: string
  category?: string
  excerpt?: string
  author?: string
}) {
  return await prisma.blogPost.update({
    where: { id },
    data
  })
}

export async function deleteBlogPost(id: string) {
  return await prisma.blogPost.delete({
    where: { id }
  })
}
