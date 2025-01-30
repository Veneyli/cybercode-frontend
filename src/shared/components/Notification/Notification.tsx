import { useEffect, useState } from "react";
import styles from "./Notification.module.scss";

interface NotificationProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
}

export default function Notification({
  message,
  type = "error",
  duration = 5000,
}: NotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.notification} ${visible ? styles.visible : ""} ${
        type === "error" ? styles.error : styles.success
      }`}
      onClick={() => setVisible(false)}
    >
      {message}
    </div>
  );
}
