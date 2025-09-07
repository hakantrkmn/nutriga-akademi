import { Egitim as PrismaEgitim } from "@prisma/client";
export interface Egitim extends Omit<PrismaEgitim, 'price'> {
  price: number;
}
import { BlogPost } from "@prisma/client";
export type { BlogPost };

  export interface BlogGridProps {
    posts: BlogPost[];
  }

  export interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  }
  export interface BlogDetailContentProps {
    post: BlogPost;
  }
  export interface BlogCardProps {
    post: BlogPost;
  }

  export interface EgitimCardProps {
    egitim: Egitim;
  }
  export interface EgitimDetailPageProps {
    params: Promise<{
      slug: string;
    }>;
    egitim: Egitim;
  }

  export interface EgitimDetailContentProps {
    egitim: Egitim;
  }

  export interface EgitimDetailHeroProps {
    egitim: Egitim;
    isImageError: boolean;
    setIsImageError: (isImageError: boolean) => void;
  }

  export interface EgitimContentProps {
    setFormData?: (formData: Egitim) => void;
    isEditing?: boolean;
    egitim: Egitim;
  }
  export interface EgitimPriceProps {
    egitim: Egitim;
  }
  export interface EgitimCTAProps {
    egitim: Egitim;
  }