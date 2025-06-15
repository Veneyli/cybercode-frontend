"use client";

import React, { useState } from "react";
import styles from "./UserTableClient.module.scss";
import { UserService } from "@/shared/services/user.service";
import { User } from "@/types/user.types";
import Field from "@/shared/ui/Field/Field";

interface UserTableProps {
  users: User[] | null | undefined;
}

const UserTableClient: React.FC<UserTableProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>(
    Array.isArray(users) ? users : []
  );

  const handleDeleteUser = async (id: string) => {
    try {
      await UserService.deleteUser(id);
      setUserList((prev) => prev.filter((user) => String(user.user_id) !== id));
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await UserService.updateUserRole(userId, newRole);
      setUserList((prev) =>
        prev.map((user) =>
          String(user.user_id) === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Ошибка при изменении роли:", error);
    }
  };

  if (userList.length === 0) {
    return <p className={styles["users__empty"]}>Пользователи не найдены.</p>;
  }

  return (
    <table className={styles["users__table"]}>
      <thead className={styles["users__header"]}>
        <tr className={styles["users__row"]}>
          <th className={styles["users__cell"]}>ID</th>
          <th className={styles["users__cell"]}>ФИО</th>
          <th className={styles["users__cell"]}>Email</th>
          <th className={styles["users__cell"]}>Роль</th>
          <th className={styles["users__cell"]}>Действия</th>
        </tr>
      </thead>
      <tbody className={styles["users__body"]}>
        {userList.map((user) => (
          <tr className={styles["users__row"]} key={user.user_id}>
            <td className={styles["users__cell"]}>{user.user_id}</td>
            <td className={styles["users__cell"]}>
              {user.surname} {user.name} {user.patronymic}
            </td>
            <td className={styles["users__cell"]}>{user.email}</td>
            <td className={styles["users__cell"]}>
              <Field
                type="select"
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(String(user.user_id), e.target.value)
                }
              >
                <option value="ADMIN">Администратор</option>
                <option value="REGULAR">Пользователь</option>
                <option value="TEACHER">Преподаватель</option>
              </Field>
            </td>
            <td className={styles["users__cell"]}>
              <button
                className={styles["users__button"]}
                onClick={() => handleDeleteUser(String(user.user_id))}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTableClient;
