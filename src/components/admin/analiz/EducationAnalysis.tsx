"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EducationAnalysisData } from "@/lib/api";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { FiTrendingUp, FiBookOpen, FiArrowUp, FiArrowDown } from "react-icons/fi";
import StatCard from "@/components/admin/StatCard";
import { useState, useMemo } from "react";
import { exportToExcel } from "@/utils/export";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface EducationAnalysisProps {
  data: EducationAnalysisData | null;
}

export default function EducationAnalysis({ data }: EducationAnalysisProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedBuyers = useMemo(() => {
    if (!data?.buyers) return [];
    return [...data.buyers].sort((a, b) => {
      const dateA = new Date(a.purchaseDate).getTime();
      const dateB = new Date(b.purchaseDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [data?.buyers, sortOrder]);

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleExport = () => {
    if (!data?.buyers) return;

    const exportData = data.buyers.map((buyer) => ({
      Kullanıcı: buyer.name,
      Email: buyer.email,
      Meslek: buyer.profession,
      Eğitim: buyer.educationTitle,
      Adet: buyer.quantity,
      "Ödenen Fiyat": `${buyer.paidPrice} ₺`,
      Tarih: format(new Date(buyer.purchaseDate), "d MMMM yyyy", { locale: tr }),
    }));

    exportToExcel(exportData, "egitim_analizi", "Satın Alan Kullanıcılar");
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
        <FiBookOpen className="h-12 w-12 mb-4 opacity-20" />
        <p>Analiz sonuçlarını görmek için filtreleri kullanın.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Eğitim Metrikleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Toplam Satış"
          value={data.salesCount}
          icon={FiTrendingUp}
          color="blue"
        />
        <StatCard
          title="Toplam Gelir"
          value={`${data.totalRevenue.toLocaleString("tr-TR")} ₺`}
          icon={FiTrendingUp}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Satın Alan Kullanıcılar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Satın Alan Kullanıcılar</h3>
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
                  <TableHead>Email</TableHead>
                  <TableHead>Meslek</TableHead>
                  <TableHead>Eğitim</TableHead>
                  <TableHead>Adet</TableHead>
                  <TableHead>Ödenen Fiyat</TableHead>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBuyers.length > 0 ? (
                  sortedBuyers.map((buyer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-gray-900">
                        {buyer.name}
                      </TableCell>
                      <TableCell>{buyer.email}</TableCell>
                      <TableCell>{buyer.profession}</TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded">
                          {buyer.educationTitle}
                        </span>
                      </TableCell>
                      <TableCell>{buyer.quantity}</TableCell>
                      <TableCell className="font-semibold text-green-700">
                        {buyer.paidPrice.toLocaleString("tr-TR")} ₺
                      </TableCell>
                      <TableCell>
                        {format(new Date(buyer.purchaseDate), "d MMMM yyyy", { locale: tr })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Bu kriterlere uygun kullanıcı bulunamadı.
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

