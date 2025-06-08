import { UserUpdateForm } from "@/features/User/ui/userUpdateForm/userUpdateForm";
import Heading from "@/shared/ui/Heading/Heading";
import styles from "./editProfile.module.scss";

const EditProfilePage = () => {
  return (
    <div className={styles["edit-profile"]}>
      <Heading
        align="center"
        className={styles["edit-profile__heading"]}
        level={1}
      >
        Редактировать профиль
      </Heading>
      <UserUpdateForm />
    </div>
  );
};

export default EditProfilePage;
