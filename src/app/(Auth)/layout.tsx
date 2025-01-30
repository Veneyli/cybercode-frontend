import React, { ReactNode, Suspense } from "react";
import styles from "./layout.module.scss";
import Loading from "./loading";

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const circlesCount = 4;

  return (
    <>
      <div className={styles.circles}>
        {Array.from({ length: circlesCount }, (_, index) => (
          <div key={index} className={styles.circle}></div>
        ))}
      </div>
      <Suspense fallback={<Loading />}>
        <main className={styles.layout}>{children}</main>
      </Suspense>
    </>
  );
};

export default AuthLayout;
