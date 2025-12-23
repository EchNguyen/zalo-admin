import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zalo Admin",
  description: "Trang quản trị dữ liệu với Next.js + Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
