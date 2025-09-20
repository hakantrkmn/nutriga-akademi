"use client";

import { CartItem, ContactMessage, UserProfile } from "@/hooks/useUserProfile";

interface EducationStatsSectionProps {
  profile: UserProfile;
  purchasedItems: CartItem[];
  contactMessages: ContactMessage[];
}

export function EducationStatsSection({ 
  profile, 
  purchasedItems, 
  contactMessages 
}: EducationStatsSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const answeredMessagesCount = contactMessages.filter(m => m.status === "answered").length;
  const membershipYear = new Date(profile.createdAt).getFullYear();

  const stats = [
    {
      title: "Satın Aldığım Eğitim",
      value: purchasedItems.length,
      color: "blue",
      icon: "📚"
    },
    {
      title: "Yanıtlanan Mesaj",
      value: answeredMessagesCount,
      color: "green",
      icon: "✉️"
    },
    {
      title: "Üyelik Yılı",
      value: membershipYear,
      color: "purple",
      icon: "🎓"
    }
  ];

  const getStatCardClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200",
      green: "bg-green-50 border-green-200",
      purple: "bg-purple-50 border-purple-200"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getTextClasses = (color: string) => {
    const colorMap = {
      blue: "text-blue-600",
      green: "text-green-600", 
      purple: "text-purple-600"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getValueClasses = (color: string) => {
    const colorMap = {
      blue: "text-blue-800",
      green: "text-green-800",
      purple: "text-purple-800"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Eğitim Durumu
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-6 border rounded-lg transition-all duration-200 hover:shadow-sm ${getStatCardClasses(stat.color)}`}
          >
            <div className="text-2xl mb-3">
              {stat.icon}
            </div>
            <div className={`text-3xl font-bold mb-2 ${getValueClasses(stat.color)}`}>
              {stat.value}
            </div>
            <p className={`font-medium ${getTextClasses(stat.color)}`}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Profil Özeti</h4>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
              <dd className="text-sm text-gray-900 font-semibold">
                {profile.firstName} {profile.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Meslek</dt>
              <dd className="text-sm text-gray-900 font-semibold">{profile.profession}</dd>
            </div>
            {profile.university && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Üniversite</dt>
                <dd className="text-sm text-gray-900 font-semibold">{profile.university}</dd>
              </div>
            )}
            {profile.department && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Bölüm</dt>
                <dd className="text-sm text-gray-900 font-semibold">{profile.department}</dd>
              </div>
            )}
            {profile.class && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Sınıf</dt>
                <dd className="text-sm text-gray-900 font-semibold">{profile.class}. Sınıf</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-500">Üyelik Tarihi</dt>
              <dd className="text-sm text-gray-900 font-semibold">
                {formatDate(profile.createdAt)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}