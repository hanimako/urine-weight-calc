import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "オムツ尿量計算",
  description: "病院現場での排尿量記録を効率化するオムツ尿量計算アプリ",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#f8fafc",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "オムツ尿量計算",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="オムツ尿量計算" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#f8fafc" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="bg-gray-50 min-h-screen antialiased">{children}</body>
    </html>
  );
}
