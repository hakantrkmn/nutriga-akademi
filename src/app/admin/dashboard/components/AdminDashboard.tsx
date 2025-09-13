"use client";

import StatCard from "@/components/admin/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminApi, AdminStats } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  FiBarChart,
  FiBookOpen,
  FiFileText,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import SalesReport from "./SalesReport";
import UsersReport from "./UsersReport";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalEgitimler: 0,
    totalBlogYazilari: 0,
    totalKullanicilar: 0,
    totalSatislar: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const response = await adminApi.getStats();

      if (response.success && response.data) {
        setStats(response.data);
      } else {
        console.error("İstatistikler alınamadı:", response.error);
      }
    } catch (error) {
      console.error("Dashboard istatistikleri alınırken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Toplam Eğitimler",
      value: stats.totalEgitimler,
      icon: FiBookOpen,
      color: "blue",
    },
    {
      title: "Blog Yazıları",
      value: stats.totalBlogYazilari,
      icon: FiFileText,
      color: "green",
    },
    {
      title: "Toplam Kullanıcılar",
      value: stats.totalKullanicilar,
      icon: FiUsers,
      color: "purple",
    },
    {
      title: "Toplam Satışlar",
      value: stats.totalSatislar,
      icon: FiTrendingUp,
      color: "orange",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            NutriHome Akademi Admin Paneli - Detaylı Analiz ve Raporlar
          </p>
        </div>

        {/* Genel İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              loading={loading}
            />
          ))}
        </div>

        {/* Detaylı Raporlar */}
        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <FiBarChart className="h-4 w-4" />
              Satış Raporları
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <FiUserCheck className="h-4 w-4" />
              Kullanıcı Raporları
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <SalesReport />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UsersReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
