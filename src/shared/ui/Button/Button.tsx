"use client";

import { ReactNode, useState } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "solid" | "bordered" | "flat" | "transparent";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  variant = "solid",
  disabled = false,
  size = "medium",
  type = "button",
  style,
}) => {
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | null>(
    null
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (variant !== "transparent") {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const rippleX = event.clientX - rect.left;
      const rippleY = event.clientY - rect.top;

      setRippleStyle({
        top: rippleY,
        left: rippleX,
        transform: "translate(-50%, -50%)",
      });

      setTimeout(() => setRippleStyle(null), 400);
    }

    if (onClick) onClick(event);
  };

  return (
    <button
      style={style}
      type={type}
      onClick={handleButtonClick}
      className={`${styles["button"]} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
    >
      {icon}
      {label && <span className={styles["label"]}>{label}</span>}
      {rippleStyle && variant !== "transparent" && (
        <span className={styles["ripple"]} style={rippleStyle}></span>
      )}
    </button>
  );
};

export default Button;
