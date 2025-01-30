import React, { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import Button from "@/shared/ui/Button/Button";
import Image from "next/image";
import { authService } from "@/shared/services/authService";
import ThemeSwitcher from "@/features/ToggleSwitcher/ToggleSwitcher";
import { useRouter } from "next/navigation";
import { useUser } from "@/shared/hooks/useUser";
import { useSession } from "@/shared/hooks/useSession";
import {
  LuPanelLeftClose,
  LuSettings,
  LuLogOut,
  LuPanelLeft,
} from "react-icons/lu";

interface SidebarProps {
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleMenu }) => {
  const session = useSession();
  const user_id = session.user?.user.user_id;
  const { user } = useUser(user_id);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    toggleMenu();
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/");
    } catch (error: unknown) {
      console.error("Ошибка выхода:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div
        className={`${styles.buttonMenu} ${
          isMenuOpen ? styles.hideButton : styles.showButton
        }`}
      >
        <Button
          onClick={handleToggleMenu}
          icon={<LuPanelLeft />}
          variant="transparent"
        />
      </div>

      <div
        className={`${styles.sidebar} ${
          isMenuOpen ? styles.show : styles.hide
        }`}
      >
        <div className={styles.userCard}>
          <div className={styles.userCardHeader}>
            <div className={styles.themeSwitcher}>
              <ThemeSwitcher />
            </div>
            <div className={styles.settingsButtons}>
              <Link href={`/profile`}>
                <Button icon={<LuSettings />} variant="transparent" />
              </Link>
              <Button
                icon={<LuPanelLeftClose />}
                variant="transparent"
                onClick={handleToggleMenu}
              />
            </div>
          </div>
          <div className={styles.userCardContent}>
            <Image
              className={styles.userCardAvatar}
              src={user.image_url || "/images/placeholder.jpg"}
              alt="user"
              width={200}
              height={200}
            />
            <h3
              className={styles.userCardName}
            >{`${user.surname} ${user.name}`}</h3>
            <p className={styles.userCardRole}>
              {user.role === "ADMIN" ? "Администратор" : "Студент"}
            </p>
          </div>
        </div>
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>
            <li className={styles.navigationItem}>
              <Link href="/dashboard" className={styles.navigationLink}>
                Домашняя
              </Link>
            </li>
            <li className={styles.navigationItem}>
              <Link href="/learningProgress" className={styles.navigationLink}>
                Мое обучение
              </Link>
            </li>
            <li className={styles.navigationItem}>
              <Link href="/" className={styles.navigationLink}>
                Все курсы
              </Link>
            </li>
            <li className={styles.navigationItem}>
              <Link href="/" className={styles.navigationLink}>
                Документация
              </Link>
            </li>
          </ul>
          <div className={styles.footer}>
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

export default Sidebar;
