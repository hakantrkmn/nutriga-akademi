"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminApi, egitimlerApi, AnalizFilters as IAnalizFilters, AnalizResponse } from "@/lib/api";
import AnalizFilters from "@/components/admin/analiz/AnalizFilters";
import UserAnalysis from "@/components/admin/analiz/UserAnalysis";
import EducationAnalysis from "@/components/admin/analiz/EducationAnalysis";
import { FiBarChart2, FiUsers, FiBookOpen } from "react-icons/fi";
import { toast } from "sonner";

export default function AnalizPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [analizData, setAnalizData] = useState<AnalizResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setInitialLoading(true);
      const [usersRes, eduRes] = await Promise.all([
        adminApi.getUsers(),
        egitimlerApi.getAll(),
      ]);

      if (usersRes.success && usersRes.data) {
        setUsers(usersRes.data);
      }
      if (eduRes.success && eduRes.data) {
        setEducations(eduRes.data);
      }
    } catch (error) {
      console.error("Başlangıç verileri alınırken hata:", error);
      toast.error("Filtre verileri yüklenemedi.");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSearch = async (filters: IAnalizFilters) => {
    try {
      setLoading(true);
      const response = await adminApi.getAnaliz(filters);

      if (response.success && response.data) {
        setAnalizData(response.data);
        toast.success("Analiz verileri güncellendi.");
      } else {
        toast.error(response.error || "Analiz verileri alınamadı.");
      }
    } catch (error) {
      console.error("Analiz hatası:", error);
      toast.error("Analiz sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Veriler Hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FiBarChart2 className="text-primary-600" />
              Detaylı Analiz
            </h1>
            <p className="text-gray-600 mt-1">
              Filtreleri kullanarak kullanıcı ve eğitim bazlı detaylı raporlar oluşturun.
            </p>
          </div>
        </div>

        {/* Filtreler */}
        <AnalizFilters
          onSearch={handleSearch}
          users={users}
          educations={educations}
          loading={loading}
        />

        {/* Analiz İçeriği */}
        <Tabs defaultValue="user" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <FiUsers />
              Kullanıcı Analizi
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <FiBookOpen />
              Eğitim Analizi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <UserAnalysis data={analizData?.userAnalysis || null} />
          </TabsContent>

          <TabsContent value="education">
            <EducationAnalysis data={analizData?.educationAnalysis || null} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


