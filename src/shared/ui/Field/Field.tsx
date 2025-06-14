"use client";
import React, { useState } from "react";
import styles from "./Field.module.scss";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface FieldProps {
  label?: string;
  type?: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  status?: "normal" | "valid" | "invalid";
  errorMessage?: string;
  children?: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
  size = "medium",
  status = "normal",
  errorMessage,
  children,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const currentInputType = isPasswordField && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputClassName = [
    styles.input,
    styles[size],
    styles[status],
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClassName}
            disabled={disabled}
          >
            {children}
          </select>
        ) : (
          <>
            <input
              id={name}
              type={currentInputType}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              className={inputClassName}
              disabled={disabled}
            />
            {isPasswordField && (
              <button
                type="button"
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline
                    className={`${styles.icon} ${
                      status === "invalid" ? styles.errorSVG : ""
                    }`}
                  />
                ) : (
                  <IoEyeOutline
                    className={`${styles.icon} ${
                      status === "invalid" ? styles.errorSVG : ""
                    }`}
                  />
                )}
              </button>
            )}
          </>
        )}
      </div>
      {status === "invalid" && errorMessage && (
        <span className={styles.error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Field;

