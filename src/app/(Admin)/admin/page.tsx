import styles from "./adminPage.module.scss";

export const dynamic = "force-dynamic";

const AdminPage = async () => {
  return <div className={styles["admin"]}>Админ панель</div>;
};

export default AdminPage;
