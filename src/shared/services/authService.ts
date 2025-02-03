import { apiClient } from "@/shared/utils/apiClient";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    return apiClient("/auth/login", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  checkSession: async () => {
    return apiClient("/auth/check-session");
  },

  logout: async () => {
    const response = await apiClient("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    return response || { message: "Выход выполнен успешно." };
  },

  register: async (data: {
    surname: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return apiClient("/auth/register", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (data: {
    surname: string;
    name: string;
    patronymic: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return apiClient("/auth/update", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
