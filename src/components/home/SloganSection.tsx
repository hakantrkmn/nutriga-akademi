export default function SloganSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary-100 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-6">
          {/* Ana slogan */}
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 leading-tight">
              <span className="italic font-medium text-primary-700">
                Doğru bilgi, doğru tecrübe, doğru yaşam
              </span>
              <span className="text-gray-600">,</span>
            </p>
          </div>

          {/* Alt açıklama */}

          {/* Dekoratif çizgi */}
        </div>
      </div>
    </section>
  );
}
