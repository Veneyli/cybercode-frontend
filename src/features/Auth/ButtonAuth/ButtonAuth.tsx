"use client";

import Link from "next/link";
import Button from "@/ui/Button/Button";
import { useState, useEffect, useRef } from "react";
import { useSession } from "@/hooks/useSession";
import { AuthService } from "@/services/auth.service";
import styles from "./ButtonAuth.module.scss";
import { User } from "@/types/user.types";

export default function ButtonAuth() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, setUser } = useSession() as {
    user: User | null;
    setUser: (user: User | null) => void;
  };
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setIsMenuOpen(false);
    } catch {}
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles["button"]} ref={menuRef}>
      {user ? (
        <>
          {isMobile ? (
            <div className={styles["button__panel"]}>
              <Link className={styles["button__panel-link"]} href="/profile">
                Профиль
              </Link>
              <Link className={styles["button__panel-link"]} href="/learning">
                Обучение
              </Link>
              <Button onClick={handleLogout} label="Выйти" />
            </div>
          ) : (
            <Button
              size="large"
              onClick={toggleMenu}
              label={user?.name || "User"}
            />
          )}

          {isMenuOpen && !isMobile && (
            <div className={styles["button__panel"]}>
              <Link className={styles["button__panel-link"]} href="/profile">
                Профиль
              </Link>
              <Link className={styles["button__panel-link"]} href="/study">
                Обучение
              </Link>
              <Button onClick={handleLogout} label="Выйти" />
            </div>
          )}
        </>
      ) : (
        <Link href="/sign-in">
          <Button size="large" label="Войти" />
        </Link>
      )}
    </div>
  );
}
