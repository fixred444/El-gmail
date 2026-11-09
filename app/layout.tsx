import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroTask — Dashboard Setor Tugas",
  description: "Platform pengelolaan tugas dan verifikasi hasil pekerjaan."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
