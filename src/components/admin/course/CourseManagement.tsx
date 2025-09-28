"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toaster } from "@/components/ui/toaster";
import { egitimlerApi } from "@/lib/api";
import { Egitim } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit, FiEye, FiEyeOff, FiPlus, FiTrash2 } from "react-icons/fi";

export default function EgitimlerManagement() {
  const router = useRouter();
  const [egitimler, setEgitimler] = useState<Egitim[]>([]);
  const [loading, setLoading] = useState(true);

  // Eğitimleri yükle
  const loadEgitimler = async () => {
    try {
      setLoading(true);
      const response = await egitimlerApi.getAll();

      if (response.success && response.data) {
        setEgitimler(response.data);
      } else {
        toaster.error("Eğitimler yüklenemedi");
        console.error("Eğitimler yüklenemedi:", response.error);
      }
    } catch (error) {
      toaster.error("Eğitimler yüklenirken bir hata oluştu");
      console.error("Eğitimler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEgitimler();
  }, []);

  // Yeni eğitim ekle
  const handleAddEgitim = () => {
    router.push("/admin/egitimler/course");
  };

  // Eğitim düzenle
  const handleEditEgitim = (egitim: Egitim) => {
    if (egitim.id) {
      router.push(`/admin/egitimler/course/${egitim.id}`);
    }
  };

  // Eğitim aktif/pasif durumunu değiştir
  const handleToggleActive = async (id: string) => {
    try {
      const response = await egitimlerApi.toggleActive(id);

      if (response.success) {
        await loadEgitimler(); // Listeyi yenile
        const yeniDurum = response.data?.isActive ? "aktif" : "pasif";
        toaster.success(`Eğitim ${yeniDurum} yapıldı`);
      } else {
        toaster.error("Eğitim durumu değiştirilemedi");
        console.error("Eğitim durumu değiştirilemedi");
      }
    } catch (error) {
      toaster.error("Eğitim durumu değiştirilirken bir hata oluştu");
      console.error("Eğitim durumu değiştirilirken hata:", error);
    }
  };

  // Eğitim sil
  const handleDeleteEgitim = async (id: string) => {
    try {
      const response = await egitimlerApi.delete(id);

      if (response.success) {
        await loadEgitimler(); // Listeyi yenile
        toaster.success("Eğitim başarıyla silindi");
      } else {
        toaster.error("Eğitim silinemedi");
        console.error("Eğitim silinemedi");
      }
    } catch (error) {
      toaster.error("Eğitim silinirken bir hata oluştu");
      console.error("Eğitim silinirken hata:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Eğitimler Yönetimi
              </h1>
              <p className="text-gray-600">
                Eğitimlerinizi ekleyin, düzenleyin ve yönetin
              </p>
            </div>
            <Button
              onClick={handleAddEgitim}
              className="bg-green-600 hover:bg-green-700"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              Yeni Eğitim
            </Button>
          </div>

          {/* Loading State */}
          <Card>
            <CardContent className="py-20">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <p className="text-gray-600 text-lg">Eğitimler yükleniyor...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Eğitimler Yönetimi
            </h1>
            <p className="text-gray-600">
              Eğitimlerinizi ekleyin, düzenleyin ve yönetin
            </p>
          </div>
          <Button
            onClick={handleAddEgitim}
            className="bg-green-600 hover:bg-green-700"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Yeni Eğitim
          </Button>
        </div>

        {/* Eğitimler Tablosu */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Başlık
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Kategori
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Durum
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Fiyat
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Satış
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Tarih
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6 text-center">
                    İşlemler
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {egitimler.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="space-y-3">
                        <p className="text-gray-500 text-lg">
                          Henüz eğitim eklenmemiş
                        </p>
                        <p className="text-gray-400 text-sm">
                          İlk eğitiminizi eklemek için &quot;Yeni Eğitim&quot;
                          butonuna tıklayın
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  egitimler.map((egitim, index) => (
                    <TableRow
                      key={egitim.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      } hover:bg-gray-50`}
                    >
                      <TableCell className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">
                            {egitim.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            /{egitim.slug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        {egitim.category ? (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {egitim.category}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge
                          variant="secondary"
                          className={
                            egitim.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {egitim.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        {egitim.price ? (
                          <p className="font-medium text-green-600">
                            ₺{egitim.price?.toString()}
                          </p>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-gray-700">
                          {egitim.salesCount || 0}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <p className="text-sm text-gray-500">
                          {egitim.createdAt
                            ? new Date(egitim.createdAt).toLocaleDateString(
                                "tr-TR"
                              )
                            : "-"}
                        </p>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditEgitim(egitim)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <FiEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              egitim.id && handleToggleActive(egitim.id)
                            }
                            className={
                              egitim.isActive
                                ? "border-orange-300 text-orange-600 hover:bg-orange-50"
                                : "border-green-300 text-green-600 hover:bg-green-50"
                            }
                            title={egitim.isActive ? "Pasif yap" : "Aktif yap"}
                          >
                            {egitim.isActive ? (
                              <FiEyeOff className="h-4 w-4" />
                            ) : (
                              <FiEye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              egitim.id && handleDeleteEgitim(egitim.id)
                            }
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
