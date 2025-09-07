import { Egitim } from "@/types";
import { prisma } from "@/lib/prisma";


export default async function useHome() {
    const getEgitimler = async () => {
        const egitimler = await prisma.egitim.findMany();
        const convertedEgitimler = egitimler.map(egitim => {
            return {
                ...egitim,
                price: parseFloat(egitim.price?.toString() || "0")
            }
        });
        //convert to decimal to number
        return convertedEgitimler as Egitim[];
    }
    return {  
        getEgitimler,

    }
}