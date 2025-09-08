"use client";

interface AdminLoadingProps {
  message?: string;
}

export default function AdminLoading({
  message = "Yükleniyor...",
}: AdminLoadingProps) {
  return (
    <div className="min-h-[50vh] py-8">
      <div className="flex flex-col items-center gap-6">
        {/* Loading Spinner */}
        <div className="flex items-center gap-3 text-green-500">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
