import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo-List",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      {/* 这里不要引用 next/font 的变量，避免未定义错误 */}
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}