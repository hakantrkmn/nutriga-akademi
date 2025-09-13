"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminApi, type SalesReport } from "@/lib/api";
import { useEffect, useState } from "react";
import { FiBarChart, FiDollarSign, FiTrendingUp } from "react-icons/fi";

export default function SalesReport() {
  const [data, setData] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesReport();
  }, []);

  const fetchSalesReport = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getSalesReport();
      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Satış raporları alınırken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Genel İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <FiDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₺{data.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Son 30 Gün Satış
            </CardTitle>
            <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.recentSales.reduce(
                (sum, sale) => sum + sale._count._all,
                0
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aktif Kategoriler
            </CardTitle>
            <FiBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.categoryStats.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* En Çok Satan Eğitimler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiTrendingUp className="h-5 w-5" />
            En Çok Satan Eğitimler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.educationSales.slice(0, 10).map((edu, index) => (
              <div
                key={edu.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-600 rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 line-clamp-1">
                      {edu.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {edu.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {edu.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-green-600">
                    {edu.salesCount} satış
                  </div>
                  <div className="text-sm text-gray-500">
                    ₺
                    {(Number(edu.price || 0) * edu.salesCount).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kategori Bazlı Satışlar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiBarChart className="h-5 w-5" />
            Kategori Bazlı Satış Dağılımı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.categoryStats.map((category, index) => (
              <div
                key={category.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{category.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {category._count._all} eğitim
                  </span>
                  <span className="font-bold text-green-600">
                    {category._sum.salesCount || 0} satış
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
