import { HiEye } from "react-icons/hi";

export default function VisionHero() {
  return (
    <div className="bg-orange-50 pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
          <div className="bg-orange-100 p-6 rounded-2xl inline-block">
            <HiEye className="w-12 h-12 text-orange-500" />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold text-orange-500">Vizyonumuz</h1>

            <p className="text-2xl text-gray-700 leading-relaxed font-medium">
              Türkiye&apos;nin beslenme alanında önde gelen eğitim platformu
              olmak ve dünya standartlarında diyetisyen uzmanlar yetiştirmek.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              Geleceğe bakışımız, beslenme bilimindeki liderliğimizi
              pekiştirerek, küresel standartlarda eğitim veren, yenilikçi ve
              sürdürülebilir bir akademi olmaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
