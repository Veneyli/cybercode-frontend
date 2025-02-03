import type { Metadata } from "next";
import { ThemeProvider } from "./providers/ThemeProvider";
import YandexMetrika from "@/shared/components/YandexMetrika";

import "./styles/globals.scss";
import GoogleAnalytics from "@/shared/components/Notification/GoogleAnalytics";

export const metadata: Metadata = {
  title: "CyberCode",
  description: "Переделать описание",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <YandexMetrika />
        <GoogleAnalytics />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
