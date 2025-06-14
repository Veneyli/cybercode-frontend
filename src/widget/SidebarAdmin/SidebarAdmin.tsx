// import React, { useState } from "react";
// import Link from "next/link";
// import styles from "./SidebarAdmin.module.scss";
// import Button from "@/shared/ui/Button/Button";
// import Image from "next/image";
// import { AuthService } from "@/services/auth.service";
// import ThemeSwitcher from "@/features/ToggleSwitcher/ToggleSwitcher";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/shared/hooks/useSession";
// import { User } from "@/shared/types/user.types";

// import { LuPanelLeftClose, LuLogOut, LuPanelLeft } from "react-icons/lu";

// interface SidebarProps {
//   toggleMenu: () => void;
// }

// const SidebarAdmin: React.FC<SidebarProps> = ({ toggleMenu }) => {
//   const { user } = useSession() as {
//     user: User | null;
//   };
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const router = useRouter();

//   const handleToggleMenu = () => {
//     setIsMenuOpen((prevState) => !prevState);
//     toggleMenu();
//   };

//   const handleLogout = async () => {
//     try {
//       await AuthService.logout();
//       router.push("/");
//     } catch (error: unknown) {
//       console.error("Ошибка выхода:", error);
//     }
//   };

//   if (!user) {
//     return <div>Загрузка...</div>;
//   }

//   return (
//     <div>
//       <div
//         className={`${styles.buttonMenu} ${
//           isMenuOpen ? styles.hideButton : styles.showButton
//         }`}
//       >
//         <Button
//           onClick={handleToggleMenu}
//           icon={<LuPanelLeft />}
//           variant="transparent"
//         />
//       </div>

//       <div
//         className={`${styles.sidebar} ${
//           isMenuOpen ? styles.show : styles.hide
//         }`}
//       >
//         <div className={styles.userCard}>
//           <div className={styles.userCardHeader}>
//             <div className={styles.themeSwitcher}>
//               <ThemeSwitcher />
//             </div>
//             <div className={styles.settingsButtons}>
//               <Button
//                 icon={<LuPanelLeftClose />}
//                 variant="transparent"
//                 onClick={handleToggleMenu}
//               />
//             </div>
//           </div>
//           <div className={styles.userCardContent}>
//             <Image
//               className={styles.userCardAvatar}
//               src={
//                 user.image_url
//                   ? `${process.env.NEXT_PUBLIC_API_URL}${user.image_url}`
//                   : "/images/placeholder.jpeg"
//               }
//               alt="user"
//               width={200}
//               height={200}
//             />
//             <h3
//               className={styles.userCardName}
//             >{`${user.surname} ${user.name}`}</h3>
//             <p className={styles.userCardRole}>
//               {user.role === "ADMIN" || "Администратор"}
//             </p>
//           </div>
//         </div>
//         <nav className={styles.navigation}>
//           <ul className={styles.navigationList}>
//             <li className={styles.navigationItem}>
//               <Link href="/admin" className={styles.navigationLink}>
//                 Главная
//               </Link>
//             </li>
//             <li className={styles.navigationItem}>
//               <Link href="/admin/users" className={styles.navigationLink}>
//                 Пользователи
//               </Link>
//             </li>
//             <li className={styles.navigationItem}>
//               <Link href="/admin/studies" className={styles.navigationLink}>
//                 Учебные материалы
//               </Link>
//             </li>
//             <li className={styles.navigationItem}>
//               <Link href="/admin/posts" className={styles.navigationLink}>
//                 Посты
//               </Link>
//             </li>
//           </ul>
//           <div className={styles.footer}>
//             <Button
//               label="Выход"
//               icon={<LuLogOut />}
//               variant="transparent"
//               onClick={handleLogout}
//             />
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default SidebarAdmin;

import React, { useState } from "react";
import Link from "next/link";
import styles from "./SidebarAdmin.module.scss";
import Button from "@/shared/ui/Button/Button";
import Image from "next/image";
import { AuthService } from "@/services/auth.service";
import ThemeSwitcher from "@/features/ToggleSwitcher/ToggleSwitcher";
import { useRouter } from "next/navigation";
import { useSession } from "@/shared/hooks/useSession";
import { User } from "@/shared/types/user.types";

import { LuPanelLeftClose, LuLogOut, LuPanelLeft } from "react-icons/lu";

interface SidebarProps {
  toggleMenu: () => void;
}

const SidebarAdmin: React.FC<SidebarProps> = ({ toggleMenu }) => {
  const { user } = useSession() as {
    user: User | null;
  };
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    toggleMenu();
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push("/");
    } catch (error: unknown) {
      console.error("Ошибка выхода:", error);
    }
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <div
        className={`${styles["sidebar-admin__toggle-button"]} ${
          isMenuOpen
            ? styles["sidebar-admin__toggle-button--hide"]
            : styles["sidebar-admin__toggle-button--show"]
        }`}
      >
        <Button
          onClick={handleToggleMenu}
          icon={<LuPanelLeft />}
          variant="transparent"
        />
      </div>

      <div
        className={`${styles["sidebar-admin__sidebar"]} ${
          isMenuOpen
            ? styles["sidebar-admin__sidebar--show"]
            : styles["sidebar-admin__sidebar--hide"]
        }`}
      >
        <div className={styles["sidebar-admin__user-card"]}>
          <div className={styles["sidebar-admin__user-card-header"]}>
            <div className={styles["sidebar-admin__theme-switcher"]}>
              <ThemeSwitcher />
            </div>
            <div className={styles["sidebar-admin__settings-buttons"]}>
              <Button
                icon={<LuPanelLeftClose />}
                variant="transparent"
                onClick={handleToggleMenu}
              />
            </div>
          </div>
          <div className={styles["sidebar-admin__user-card-content"]}>
            <Image
              className={styles["sidebar-admin__user-card-avatar"]}
              src={
                user.image_url
                  ? `${process.env.NEXT_PUBLIC_API_URL}${user.image_url}`
                  : "/images/placeholder.jpeg"
              }
              alt="user"
              width={200}
              height={200}
            />
            <h3
              className={styles["sidebar-admin__user-card-name"]}
            >{`${user.surname} ${user.name}`}</h3>
            <p className={styles["sidebar-admin__user-card-role"]}>
              {user.role === "ADMIN" || "Администратор"}
            </p>
          </div>
        </div>
        <nav className={styles["sidebar-admin__nav"]}>
          <ul className={styles["sidebar-admin__nav-list"]}>
            <li className={styles["sidebar-admin__nav-item"]}>
              <Link href="/admin" className={styles["sidebar-admin__nav-link"]}>
                Главная
              </Link>
            </li>
            <li className={styles["sidebar-admin__nav-item"]}>
              <Link
                href="/admin/users"
                className={styles["sidebar-admin__nav-link"]}
              >
                Пользователи
              </Link>
            </li>
            <li className={styles["sidebar-admin__nav-item"]}>
              <Link
                href="/admin/studies"
                className={styles["sidebar-admin__nav-link"]}
              >
                Учебные материалы
              </Link>
            </li>
            <li className={styles["sidebar-admin__nav-item"]}>
              <Link
                href="/admin/posts"
                className={styles["sidebar-admin__nav-link"]}
              >
                Посты
              </Link>
            </li>
          </ul>
          <div className={styles["sidebar-admin__footer"]}>
            <Button
              label="Выход"
              icon={<LuLogOut />}
              variant="transparent"
              onClick={handleLogout}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarAdmin;
