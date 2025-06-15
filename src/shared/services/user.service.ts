import { apiClient } from "@/api/apiClient";
import { User } from "../types/user.types";

export const UserService = {
  getUser: async (id: string) => {
    return apiClient.get(`/user/${id}`);
  },
  userProgress: async (id: string) => {
    return await apiClient.get(`/user/course-progress/${id}`);
  },
  updateUser: async (id: string, data: Record<string, unknown>) => {
    return await apiClient.patch(`/user/${id}`, data);
  },
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get(`/user/all`);
      return Array.isArray(response) ? response : [];
    } catch (e) {
      console.error("Ошибка получения пользователей", e);
      return [];
    }
  },

  deleteUser: async (id: string) => {
    return await apiClient.delete(`/user/${id}`);
  },
  async updateUserRole(id: string, newRole: string) {
    return apiClient.patch(`/user/${id}/role`, { role: newRole });
  },
};
