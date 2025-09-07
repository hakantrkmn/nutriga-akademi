import { prisma } from './prisma'


// Admin kontrolü
export function isAdminEmail(email: string): boolean {
  return email === process.env.ADMIN_EMAIL || email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
}

// Eğitim CRUD işlemleri
export async function createEgitim(data: {
  title: string
  description?: string
  content?: object | string
  imageUrl?: string
  slug: string
  price?: number
  category: string
  level: string
  instructor: string
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
  content?: object | string
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
  content: object | string
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
  content?: object | string
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
