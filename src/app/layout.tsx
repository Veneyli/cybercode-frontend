import type { Metadata } from "next";
import { ThemeProvider } from "./providers/ThemeProvider";

import "./styles/globals.scss";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
