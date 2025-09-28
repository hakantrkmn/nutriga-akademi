import { prisma } from "@/lib/prisma";
import { updateCourses } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Eğitimi bul
    const mevcutEgitim = await prisma.egitim.findUnique({
      where: { id },
    });

    if (!mevcutEgitim) {
      return NextResponse.json(
        { success: false, error: "Eğitim bulunamadı" },
        { status: 404 }
      );
    }

    // Aktif/pasif durumunu tersine çevir
    const guncellenmisEgitim = await prisma.egitim.update({
      where: { id },
      data: {
        isActive: !mevcutEgitim.isActive,
      },
    });

    await updateCourses();
    revalidatePath("/egitimler");
    revalidatePath("/admin/egitimler");

    return NextResponse.json({
      success: true,
      data: guncellenmisEgitim,
      message: `Eğitim ${guncellenmisEgitim.isActive ? "aktif" : "pasif"} yapıldı`,
    });
  } catch (error) {
    console.error("Eğitim durumu değiştirilirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Eğitim durumu değiştirilemedi" },
      { status: 500 }
    );
  }
}
