export interface HeroData {
  title: {
    main: string;
    highlight: string;
  };
  description: string;
  buttons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  stats: {
    value: string;
    label: string;
  }[];
  image: {
    src: string;
    alt: string;
  };
}

export const heroData: HeroData = {
  title: {
    main: "Sağlıklı Yaşam İçin",
    highlight: "Doğru Beslenme"
  },
  description: "Uzman diyetisyenlerimizden öğrenin, sağlıklı beslenme alışkanlıkları edinin ve yaşam kalitenizi artırın.",
  buttons: {
    primary: {
      text: "Eğitimleri İncele",
      href: "/egitimler"
    },
    secondary: {
      text: "Blog Yazıları",
      href: "/blog"
    }
  },
  stats: [
    {
      value: "500+",
      label: "Mutlu Öğrenci"
    },
    {
      value: "50+",
      label: "Uzman Eğitim"
    },
    {
      value: "100+",
      label: "Blog Yazısı"
    }
  ],
  image: {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Sağlıklı beslenme"
  }
};
