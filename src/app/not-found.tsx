import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-root site-theme-sage min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary-600 opacity-20 mb-4 animate-slide-up">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-6 animate-slide-up-delayed">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Sayfa Bulunamadı
          </h2>

          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya
            dönüp yeniden başlayabilirsiniz.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              asChild
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              <Link href="/" className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Ana Sayfaya Dön
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-primary-200 text-primary-700 hover:bg-primary-50 px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              <Link href="/egitimler" className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Eğitimler
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-100 rounded-full opacity-20 animate-pulse"></div>
        </div>

        {/* Breadcrumb */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-400">404 - Sayfa Bulunamadı</span>
          </nav>
        </div>
      </div>
    </div>
  );
}
