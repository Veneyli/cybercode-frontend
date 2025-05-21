import React from "react";
import styles from "./Heading.module.scss";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
};

export default function Heading({
  level = 1,
  children,
  className = "",
  align = "start",
}: HeadingProps) {
  const Tag: React.ElementType = `h${level}`;

  const sizeClass = styles[`heading--size-${level}`];
  const alignClass = styles[`heading--align-${align}`];
  return (
    <Tag
      className={`${styles.heading} ${sizeClass} ${alignClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
