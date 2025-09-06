import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseAdmin } from '@/lib/supabase'

// GET - Admin dashboard istatistikleri
export async function GET() {
  try {
    console.log('Admin dashboard istatistikleri alınıyor...')
    console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)
    // Prisma ile sayıları al
    const [egitimCount, blogCount] = await Promise.all([
      prisma.egitim.count(),
      prisma.blogPost.count()
    ])

    // Supabase ile kullanıcı sayısını al
    const supabaseAdmin = createSupabaseAdmin()
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error('Kullanıcılar listelenirken hata:', error)
    }

    const userCount = users?.length || 0

    // Toplam satış sayısını hesapla (cart_items tablosundan)
    const totalSales = await prisma.cartItem.count()

    return NextResponse.json({
      success: true,
      data: {
        totalEgitimler: egitimCount,
        totalBlogYazilari: blogCount,
        totalKullanicilar: userCount,
        totalSatislar: totalSales
      }
    })
  } catch (error) {
    console.error('İstatistikler alınırken hata:', error)
    return NextResponse.json(
      { success: false, error: 'İstatistikler alınamadı' },
      { status: 500 }
    )
  }
}
