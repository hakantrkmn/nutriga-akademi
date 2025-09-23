import { HiInformationCircle } from "react-icons/hi";

export default function AboutContent() {
  return (
    <div className="bg-primary-50 pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
          <div className="bg-primary-100 p-6 rounded-2xl inline-block">
            <HiInformationCircle className="w-12 h-12 text-primary" />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold text-primary">Hakkımızda</h1>

            <p className="text-2xl text-secondary leading-relaxed font-medium">
              Nutriga Akademi, tüm sağlık profesyonellerine ve adaylarına
              yönelik bilimsel temellere dayanan teorik ve pratik eğitimleri,
              alanında uzman eğitmenler aracılığıyla buluşturan bir eğitim
              platformudur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
