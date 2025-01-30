import styles from "./LoadingSkeletonAuth.module.scss";

export default function LoadingSkeletonAuth() {
  return (
    <div className={styles["loading"]}>
      <div>Загрузка</div>
    </div>
  );
}
