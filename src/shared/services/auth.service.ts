import { apiClient } from "@/api/apiClient";

export const AuthService = {
  login: async (data: { email: string; password: string }) => {
    return apiClient.post("/auth/login", data);
  },

  logout: async () => {
    return apiClient.post("/auth/logout", {});
  },

  register: async (data: {
    surname: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { confirmPassword, ...dataToSend } = data;
    return apiClient.post("/auth/register", {
      ...dataToSend,
      passwordRepeat: confirmPassword,
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
    return apiClient.post("/auth/update", data);
  },
};
