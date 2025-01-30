"use client";

import Link from "next/link";
import Button from "@/ui/Button/Button";
import { useState, useEffect, useRef } from "react";
import { useSession } from "@/hooks/useSession";
import { authService } from "@/services/authService";
import styles from "./ButtonAuth.module.scss";

export default function ButtonAuth() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsMenuOpen(false);
    } catch {}
  };

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
          <Button size="large" label={user.user.name} onClick={toggleMenu} />
          {isMenuOpen && (
            <div className={styles["button__panel"]}>
              <p>Привет, {user.user.name}!</p>
              <Link href="/dashboard">Профиль</Link>
              <Link href="/study/1">Обучение</Link>
              <Button size="small" label="Выйти" onClick={handleLogout} />
            </div>
          )}
        </>
      ) : (
        <Link href="/login">
          <Button size="large" label="Войти" />
        </Link>
      )}
    </div>
  );
}
