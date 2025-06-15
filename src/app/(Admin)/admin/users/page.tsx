import Heading from "@/shared/ui/Heading/Heading";
import styles from "./usersPage.module.scss";
import { UserService } from "@/shared/services/user.service";
import UserTableClient from "@/widget/UserTableClient/UserTableClient";
import type { User } from "@/shared/types/user.types";

const UsersPage = async () => {
  let users: User[] = [];

  try {
    users = await UserService.getAllUsers();
  } catch (error) {
    console.error("Пользователи не загружены", error);
  }

  return (
    <div className={styles["users"]}>
      <div className={styles["users__content"]}>
        <Heading align="center" className={styles["users__title"]} level={1}>
          Пользователи
        </Heading>
        <UserTableClient users={users} />
      </div>
    </div>
  );
};

export default UsersPage;
