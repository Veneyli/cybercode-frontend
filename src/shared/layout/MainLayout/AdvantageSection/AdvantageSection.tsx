import React from "react";
import styles from "./AdvantageSection.module.scss";
import advantages from "@/shared/constants/advantages";
import Heading from "@/shared/ui/Heading/Heading";
const AdvantageSection = () => {
  return (
    <section className={styles["advantage"]}>
      <div className={styles["advantage__list"]}>
        {advantages.map((advantage) => (
          <div key={advantage.id} className={styles["advantage__item"]}>
            <Heading level={2} className={styles["advantage__title"]}>
              {advantage.title}
            </Heading>
            <p className={styles["advantage__description"]}>
              {advantage.description}
            </p>
            <div className={styles["advantage__icon-wrapper"]}>
              <span className={styles["advantage__icon"]}>
                <advantage.icon />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvantageSection;
