import styles from "./EducationSection.module.scss";
import education from "@/shared/constants/education";
import Heading from "@/shared/ui/Heading/Heading";
import Image from "next/image";

const EducationSection = () => {
  return (
    <section className={styles["education"]}>
      <Heading level={2} className={styles["education__title"]}>
        Как проходит обучение
      </Heading>
      <div className={styles["education__list"]}>
        {education.map((item) => (
          <div key={item.id} className={styles["education__item"]}>
            <Image
              src={item.image}
              alt={item.description}
              className={styles["education__image"]}
              width={500}
              height={350}
              unoptimized
            />
            <p className={styles["education__description"]}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
