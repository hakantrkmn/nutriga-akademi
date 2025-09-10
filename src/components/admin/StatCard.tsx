"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType;
  color: string;
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  loading = false,
}: StatCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "green":
        return "bg-green-100 text-green-600";
      case "purple":
        return "bg-purple-100 text-purple-600";
      case "orange":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : value}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
            <Icon />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
