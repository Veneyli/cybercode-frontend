export interface SignUp {
  surname: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}
