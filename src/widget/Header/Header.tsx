"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import ThemeSwitcher from "@/features/ToggleSwitcher/ToggleSwitcher";
import Button from "@/shared/ui/Button/Button";
import { usePathname } from "next/navigation";
import ButtonAuth from "@/shared/components/ButtonAuth/BurronAuth";

const Header = React.memo(() => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link className={styles.header__logoLink} href={{ pathname: "/" }}>
          <Image
            src="/images/header/logo.png"
            className={styles.header__logoImg}
            alt="logo"
            width={75}
            height={50}
          />
        </Link>
        CyberCode<br></br>твой путь в IT
      </div>

      <div
        className={`${styles.header__navbar} ${
          isMenuOpen ? styles.active : ""
        }`}
      >
        <nav className={styles.navbar}>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}>
              <Link
                className={`${styles.navbar__link} ${
                  pathname === "/courses" || pathname === "/courses/[id]"
                    ? styles.activeLink
                    : ""
                }`}
                href={"/courses"}
              >
                Каталог
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link
                className={`${styles.navbar__link} ${
                  pathname === "/media" ? styles.activeLink : ""
                }`}
                href="/media"
              >
                Медиа
              </Link>
            </li>
            {/* <li className={styles.navbar__item}>
              <Link
                className={`${styles.navbar__link} ${
                  pathname === "/doca" ? styles.activeLink : ""
                }`}
                href="/doca"
              >
                Документация
              </Link>
            </li> */}
            <li className={styles.navbar__item}>
              <ButtonAuth />
            </li>
            <li className={styles.navbar__item}>
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </div>
      <button
        className={`${styles.header__menuButton} ${
          isMenuOpen ? styles.open : ""
        }`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.header__menuIcon}></span>
      </button>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
