"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminApi, type UsersReport } from "@/lib/api";
import { useEffect, useState } from "react";
import { FiCalendar, FiTrendingUp, FiUserCheck, FiUsers } from "react-icons/fi";

export default function UsersReport() {
  const [data, setData] = useState<UsersReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersReport();
  }, []);

  const fetchUsersReport = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getUsersReport();
      if (response.success && response.data) {
        setData(response.data);
      }
    } catch {
      console.error("Kullanıcı raporları alınırken hata:");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
      {/* Genel Kullanıcı İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Kullanıcı
            </CardTitle>
            <FiUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.authUserCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Satın Alma
            </CardTitle>
            <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPurchases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aktif Alıcılar
            </CardTitle>
            <FiUserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                data.userPurchaseStats.filter((u) => u._count.cartItems > 0)
                  .length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Son 30 Gün Kayıt
            </CardTitle>
            <FiCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.recentUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* En Aktif Kullanıcılar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiUserCheck className="h-5 w-5" />
            En Aktif Kullanıcılar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.userPurchaseStats.slice(0, 10).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary-100 text-primary-600">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {user.profession}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-blue-600">
                    {user._count.cartItems} satın alma
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kullanıcı Harcama Analizi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiTrendingUp className="h-5 w-5" />
            En Çok Harcama Yapan Kullanıcılar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.userSpending.slice(0, 10).map((user) => (
              <div
                key={user.userId}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full font-bold text-sm">
                    {data.userSpending.indexOf(user) + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {user.userDetails?.firstName} {user.userDetails?.lastName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {user.userDetails?.email}
                    </p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {user.userDetails?.profession}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-green-600">
                    ₺{user.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.totalPurchases} satın alma • {user.totalItems} ürün
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meslek Dağılımı */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiUsers className="h-5 w-5" />
            Kullanıcı Meslek Dağılımı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.professionStats.slice(0, 10).map((profession) => (
              <div
                key={profession.profession}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                    {data.professionStats.indexOf(profession) + 1}
                  </div>
                  <span className="font-medium capitalize">
                    {profession.profession}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {profession._count._all} kullanıcı
                  </span>
                  <span className="font-bold text-blue-600">
                    %
                    {(
                      (profession._count._all / data.authUserCount) *
                      100
                    ).toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Son Kayıt Olan Kullanıcılar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiCalendar className="h-5 w-5" />
            Son Kayıt Olan Kullanıcılar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {user.profession}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
