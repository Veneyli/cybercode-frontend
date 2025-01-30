export interface FormData {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FieldProps {
  label?: string;
  type?: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  status?: "normal" | "valid" | "invalid";
  errorMessage?: string;
}
