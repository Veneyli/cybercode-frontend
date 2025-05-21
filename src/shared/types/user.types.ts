export interface User {
  user_id: number;
  surname: string;
  name: string;
  patronymic?: string;
  email: string;
  role: string;
  image_url?: string;
}
