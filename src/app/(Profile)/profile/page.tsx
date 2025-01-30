"use client";
import styles from "./profilePage.module.scss";

export default function EditProfilePage() {
  return (
    <div className={styles["edit-profile"]}>
      <h1 className={styles["edit-profile__title"]}>Редактирование профиля</h1>
      {/* <EditUser user={session.user} onUpdateUser={handleUpdateUser} /> */}
    </div>
  );
}
