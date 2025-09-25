"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminApi, type SalesReport } from "@/lib/api";
import { useEffect, useState } from "react";
import { FiDollarSign, FiTrendingUp, FiXCircle } from "react-icons/fi";

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
        console.log(response.data);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* Başarısız Ödemeler */}
      {data.failedPayments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiXCircle className="h-5 w-5" />
              Başarısız Ödemeler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.failedPayments.slice(0, 10).map((payment) => (
                <div
                  key={payment.id}
                  className="border border-red-200 rounded-lg p-4 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {payment.userName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {payment.userEmail}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">
                        ₺{payment.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "tr-TR"
                        )}
                      </div>
                    </div>
                  </div>

                  {payment.reason && (
                    <div className="mb-2">
                      <Badge variant="destructive" className="text-xs">
                        {payment.reason}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}

              {data.failedPayments.length > 10 && (
                <div className="text-center text-sm text-gray-500 pt-4 border-t">
                  Ve {data.failedPayments.length - 10} başarısız ödeme daha...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
