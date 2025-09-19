import type { Metadata } from "next";
import MessageManagementClient from "./MessageManagementClient";

export const metadata: Metadata = {
  title: "Mesaj Yönetimi | Admin - Nutriga Akademi",
  description: "İletişim formundan gelen mesajları yönetin",
};

export default function MesajlarPage() {
  return <MessageManagementClient />;
}
