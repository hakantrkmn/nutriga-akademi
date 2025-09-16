import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function IletisimContent() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600">
            Bize Soru Sorun
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Beslenme eğitimlerimiz ve hizmetlerimiz hakkında merak ettikleriniz
            için bize soru sorun. Size yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        {/* Main Content */}
        <div>
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="order-2">
                <ContactInfo />
              </div>
              <div className="order-1">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
