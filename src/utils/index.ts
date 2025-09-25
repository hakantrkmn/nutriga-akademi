import { Egitim } from "@prisma/client";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
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
    if (typeof jsonContent === "string") {
      return JSON.parse(jsonContent);
    }
    return jsonContent;
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

export const getServerSupabase = async (
  request: NextRequest,
  response: NextResponse
) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
  return supabase;
};
