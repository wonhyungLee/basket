import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026학년도 한들물빛초 6학년 환영합니다",
  description: "공유 장바구니 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}