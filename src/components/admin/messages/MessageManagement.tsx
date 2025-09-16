"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HiClock, HiEye, HiMail, HiPhone, HiUser } from "react-icons/hi";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  status: string;
  created_at: string;
  user_id?: string;
}

interface MessageManagementProps {
  messages: ContactMessage[];
  onStatusChange: (messageId: string, newStatus: string) => void;
  onMarkAsRead: (messageId: string) => void;
}

export default function MessageManagement({
  messages,
  onStatusChange,
  onMarkAsRead,
}: MessageManagementProps) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Bekliyor</Badge>;
      case "answered":
        return <Badge variant="default">Cevaplandı</Badge>;
      case "archived":
        return <Badge variant="outline">Arşivlendi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">İletişim Mesajları</h2>
        <div className="text-sm text-gray-600">
          Toplam {messages.length} mesaj
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Mesajlar</h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Henüz mesaj yok
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${!message.is_read ? "bg-blue-50 border-blue-200" : ""}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <HiUser className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {message.name}
                      </span>
                      {!message.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    {getStatusBadge(message.status)}
                  </div>

                  <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {message.message}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <HiClock className="w-3 h-3" />
                      {formatDate(message.created_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <HiMail className="w-3 h-3" />
                      {message.email}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Mesaj Detayı</h3>

          {selectedMessage ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {selectedMessage.name}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <HiMail className="w-4 h-4" />
                      {selectedMessage.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <HiPhone className="w-4 h-4" />
                      {selectedMessage.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedMessage.status)}
                  {!selectedMessage.is_read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onMarkAsRead(selectedMessage.id)}
                      className="flex items-center gap-1"
                    >
                      <HiEye className="w-4 h-4" />
                      Okundu
                    </Button>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <HiClock className="w-4 h-4" />
                  {formatDate(selectedMessage.created_at)}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {selectedMessage.user_id && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <HiUser className="w-4 h-4" />
                    <span>
                      Bu mesaj giriş yapmış kullanıcıdan geldi (User ID:{" "}
                      {selectedMessage.user_id})
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(selectedMessage.id, "pending")}
                  disabled={selectedMessage.status === "pending"}
                >
                  Bekliyor
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(selectedMessage.id, "answered")}
                  disabled={selectedMessage.status === "answered"}
                >
                  Cevaplandı
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(selectedMessage.id, "archived")}
                  disabled={selectedMessage.status === "archived"}
                >
                  Arşivle
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
              Görüntülemek için bir mesaj seçin
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
