import { Egitim } from "@prisma/client";

export const convertEgitimToDecimal = (egitim: Egitim) => {
  return {
    ...egitim,
    price: parseFloat(egitim.price?.toString() || "0"),
  };
};
export const convertEgitimArrayToDecimal = (egitimler: Egitim[]) => {
  return egitimler.map((egitim) => convertEgitimToDecimal(egitim));
};
export const getHTMLContent = (content: string | object | null | undefined) => {
  if (!content) return "";
  if (typeof content === "object") return content;
  try {
    const jsonContent = JSON.parse(content as unknown as string);
    const jsonContent2 = JSON.parse(jsonContent);

    return jsonContent2;
  } catch (error) {
    console.error("Error generating HTML:", error);
    return "";
  }
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};
