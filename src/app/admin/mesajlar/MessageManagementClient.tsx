"use client";

import MessageManagement from "@/components/admin/messages/MessageManagement";
import { useMessages } from "@/hooks/useMessages";

export default function MessageManagementClient() {
  const { messages, loading, error, updateMessageStatus, markAsRead } =
    useMessages();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Mesajlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="text-red-600 mb-2">Hata</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <MessageManagement
        messages={messages}
        onStatusChange={updateMessageStatus}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
}
