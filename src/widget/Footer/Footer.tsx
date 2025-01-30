"use client";
import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

const Footer = React.memo(() => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__navigation}>
          <div className={styles.footer__section}>
            <h3 className={styles.footer__title}>Навигация</h3>
            <nav>
              <ul className={styles.footer__list}>
                <li className={styles.footer__item}>
                  <Link href="/" className={styles.footer__link}>
                    Главная
                  </Link>
                </li>
                <li className={styles.footer__item}>
                  <Link href="/courses" className={styles.footer__link}>
                    Каталог
                  </Link>
                </li>
                <li className={styles.footer__item}>
                  <Link href="/media" className={styles.footer__link}>
                    Медиа
                  </Link>
                </li>
                {/* <li className={styles.footer__item}>
                  <Link href="doca" className={styles.footer__link}>
                    Документация
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>
          <div className={styles.footer__section}>
            <h3 className={styles.footer__title}>Курсы</h3>
            <nav>
              <ul className={styles.footer__list}>
                <li className={styles.footer__item}>
                  <Link href="/" className={styles.footer__link}>
                    Основы HTML и CSS
                  </Link>
                </li>
                <li className={styles.footer__item}>
                  <Link href="/" className={styles.footer__link}>
                    Основы JavaScript
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.footer__section}>
            <h3 className={styles.footer__title}>Поддержка</h3>
            <nav>
              <ul className={styles.footer__list}>
                <li className={styles.footer__item}>
                  <Link
                    href="https://web.telegram.org/"
                    className={styles.footer__link}
                  >
                    Написать в Telegram
                  </Link>
                </li>
                <li className={styles.footer__item}>
                  <Link href="/" className={styles.footer__link}>
                    support@cybercode.com
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.footer__section}>
            <Link href="/" className={styles.footer__logo}>
              <Image
                src="/images/header/logo.png"
                alt="CyberCode logo"
                width={50}
                height={35}
              />
              <span className={styles.footer__brand}>CyberCode</span>
            </Link>
            <div className={styles.footer__socials}>
              {/* Здесь ссылки на иконки соц. сетей */}
              <Link
                href="/"
                aria-label="Facebook"
                className={styles.footer__socialLink}
              ></Link>
              <Link
                href="/"
                aria-label="Instagram"
                className={styles.footer__socialLink}
              ></Link>
              <Link
                href="/"
                aria-label="Twitter"
                className={styles.footer__socialLink}
              ></Link>
              <Link
                href="/"
                aria-label="LinkedIn"
                className={styles.footer__socialLink}
              ></Link>
            </div>
          </div>
        </div>
        <div className={styles.footer__copyright}>
          <small>«CyberCode» Все права защищены / 2025</small>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer"; // для отладки

export default Footer;
