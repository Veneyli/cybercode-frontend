import AdvantageSection from "@/shared/layout/MainLayout/AdvantageSection/AdvantageSection";
import EducationSection from "@/shared/layout/MainLayout/EducationSection/EducationSection";
import HeroSection from "@/shared/layout/MainLayout/HeroSection/HeroSection";
import styles from "@/styles/page.module.scss";

export default function Home() {
  return (
    <main className={styles["main"]}>
      <HeroSection />
      <AdvantageSection />
      <EducationSection />
    </main>
  );
}
