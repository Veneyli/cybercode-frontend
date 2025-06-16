"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import ThemeSwitcher from "@/features/ToggleSwitcher/ToggleSwitcher";
import { usePathname } from "next/navigation";
import ButtonAuth from "@/features/Auth/ButtonAuth/ButtonAuth";

const Header = React.memo(() => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 800;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <Link className={styles["header__logo"]} href="/">
          <Image
            src="/images/logo.png"
            className={styles["header__logo-image"]}
            alt="logo"
            width={75}
            height={50}
            unoptimized
          />
        </Link>
        <p className={styles["header__brand"]}>
          CyberCode{" "}
          <small className={styles["header__brand-subtitle"]}>
            твой путь в IT
          </small>
        </p>

        {isMobile && (
          <button
            className={`${styles["header__menu-button"]} ${
              isMenuOpen ? styles["header__menu-button--active"] : ""
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles["header__menu-icon"]}></span>
          </button>
        )}
      </div>

      <div
        className={`${styles["header__navigation"]} ${
          isMenuOpen ? styles["header__navigation--open"] : ""
        }`}
      >
        <nav className={styles["header__nav"]}>
          <ul className={styles["header__nav-list"]}>
            <li className={styles["header__nav-item"]}>
              <Link
                href="/courses"
                className={
                  pathname.startsWith("/courses")
                    ? styles["header__nav-link--active"]
                    : styles["header__nav-link"]
                }
              >
                Каталог
              </Link>
            </li>
            <li className={styles["header__nav-item"]}>
              <Link
                href="/media"
                className={
                  pathname === "/media"
                    ? styles["header__nav-link--active"]
                    : styles["header__nav-link"]
                }
              >
                Медиа
              </Link>
            </li>
            <li className={styles["header__nav-item"]}>
              <ButtonAuth />
            </li>
            <li className={styles["header__nav-item"]}>
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
