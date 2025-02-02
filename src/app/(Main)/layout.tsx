import React, { ReactNode } from "react";
import Header from "@/widget/Header/Header";
import Footer from "@/widget/Footer/Footer";
import type { Metadata } from "next";
import "@/app/styles/globals.scss";

export const metadata: Metadata = {
  title: "Cybercode",
  description: "Курсы it-технологий, онлайн обучение",
};

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
