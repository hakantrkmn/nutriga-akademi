import type { Metadata } from "next";
import MessageManagementClient from "./MessageManagementClient";

export const metadata: Metadata = {
  title: "Mesaj Yönetimi | Admin - NutriHome Akademi",
  description: "İletişim formundan gelen mesajları yönetin",
};

export default function MesajlarPage() {
  return <MessageManagementClient />;
}
