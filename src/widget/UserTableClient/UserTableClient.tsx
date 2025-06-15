"use client";

import React, { useState } from "react";
import styles from "./UserTableClient.module.scss";
import { UserService } from "@/shared/services/user.service";
import { User } from "@/types/user.types";
import Link from "next/link";

interface UserTableProps {
  users: User[] | null | undefined;
}

const UserTableClient: React.FC<UserTableProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>(
    Array.isArray(users) ? users : []
  );

  const handleDeleteUser = async (id: string) => {
    await UserService.deleteUser(id);
    setUserList((prev) => prev.filter((user) => String(user.user_id) !== id));
  };

  if (userList.length === 0) {
    return <p className={styles["users__empty"]}>Пользователи не найдены.</p>;
  }

  return (
    <table className={styles["users__table"]}>
      <thead className={styles["users__header"]}>
        <tr className={styles["users__row"]}>
          <th className={styles["users__cell"]}>ID</th>
          <th className={styles["users__cell"]}>Имя</th>
          <th className={styles["users__cell"]}>Email</th>
          <th className={styles["users__cell"]}>Роль</th>
          <th className={styles["users__cell"]}>Действия</th>
        </tr>
      </thead>
      <tbody className={styles["users__body"]}>
        {userList.map((user) => (
          <tr className={styles["users__row"]} key={user.user_id}>
            <td className={styles["users__cell"]}>{user.user_id}</td>
            <td className={styles["users__cell"]}>{user.name}</td>
            <td className={styles["users__cell"]}>{user.email}</td>
            <td className={styles["users__cell"]}>{user.role}</td>
            <td className={styles["users__cell"]}>
              <Link
                href={`/admin/edit-user/${user.user_id}`}
                className={styles["users__button"]}
              >
                Редактировать
              </Link>
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
