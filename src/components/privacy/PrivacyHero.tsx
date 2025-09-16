export default function PrivacyHero() {
  return (
    <div className="bg-green-50 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600">
            Gizlilik Sözleşmesi
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            Kişisel verilerinizin güvenliği ve gizliliği bizim için
            önceliklidir.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında,
            kişisel verilerinizin nasıl toplandığını, kullanıldığını ve
            korunduğunu öğrenin.
          </p>
        </div>
      </div>
    </div>
  );
}
