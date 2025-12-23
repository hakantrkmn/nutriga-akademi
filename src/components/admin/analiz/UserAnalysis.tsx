"use client";

import StatCard from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAnalysisData } from "@/lib/api";
import { exportToExcel } from "@/utils/export";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useMemo, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiDollarSign,
  FiDownload,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

interface UserAnalysisProps {
  data: UserAnalysisData | null;
}

export default function UserAnalysis({ data }: UserAnalysisProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedEducations = useMemo(() => {
    if (!data?.purchasedEducations) return [];
    return [...data.purchasedEducations].sort((a, b) => {
      const dateA = new Date(a.purchaseDate).getTime();
      const dateB = new Date(b.purchaseDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [data?.purchasedEducations, sortOrder]);

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleExport = () => {
    if (!data?.purchasedEducations) return;

    const exportData = data.purchasedEducations.map((edu) => ({
      Kullanıcı: edu.userName,
      "Eğitim Adı": edu.title,
      Fiyat: `${edu.price} ₺`,
      Adet: edu.quantity,
      "Ödenen Fiyat": `${edu.paidPrice} ₺`,
      Taksit: edu.installment === 1 ? "Tek Çekim" : `${edu.installment} Taksit`,
      Tarih: format(new Date(edu.purchaseDate), "d MMMM yyyy", { locale: tr }),
      Durum: edu.status === "COMPLETED" ? "Tamamlandı" : edu.status,
    }));

    exportToExcel(exportData, "kullanici_analizi", "Satın Alınan Eğitimler");
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
        <FiUsers className="h-12 w-12 mb-4 opacity-20" />
        <p>Analiz sonuçlarını görmek için filtreleri kullanın.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Kullanıcı Metrikleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Toplam Harcama"
          value={`${data.totalSpent.toLocaleString("tr-TR")} ₺`}
          icon={FiDollarSign}
          color="green"
        />
        <StatCard
          title="Eğitim Sayısı"
          value={data.purchaseCount}
          icon={FiShoppingBag}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Satın Alınan Eğitimler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Satın Alınan Eğitimler
            </h3>
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <FiDownload />
              Excel&apos;e Aktar
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>Eğitim Adı</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead>Adet</TableHead>
                  <TableHead>Ödenen Fiyat</TableHead>
                  <TableHead>Taksit</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50 group transition-colors"
                    onClick={toggleSort}
                  >
                    <div className="flex items-center gap-2">
                      Tarih
                      {sortOrder === "asc" ? (
                        <FiArrowUp className="text-primary-600" />
                      ) : (
                        <FiArrowDown className="text-primary-600" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEducations.length > 0 ? (
                  sortedEducations.map((edu, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-gray-900">
                        {edu.userName}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {edu.title}
                      </TableCell>
                      <TableCell>
                        {edu.price.toLocaleString("tr-TR")} ₺
                      </TableCell>
                      <TableCell>{edu.quantity}</TableCell>
                      <TableCell className="font-semibold text-green-700">
                        {edu.paidPrice.toLocaleString("tr-TR")} ₺
                      </TableCell>
                      <TableCell>
                        {edu.installment === 1 ? (
                          <span className="text-gray-600">Tek Çekim</span>
                        ) : (
                          <span className="font-medium text-blue-600">
                            {edu.installment} Taksit
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(edu.purchaseDate), "d MMMM yyyy", {
                          locale: tr,
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          {edu.status === "COMPLETED"
                            ? "Tamamlandı"
                            : edu.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                    colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      Bu kriterlere uygun eğitim bulunamadı.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
