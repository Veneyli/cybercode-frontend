import { apiClient } from "@/api/apiClient";

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
  getAllUsers: async () => {
    return await apiClient.get(`/user/all`);
  },
  deleteUser: async (id: string) => {
    return await apiClient.delete(`/user/${id}`);
  },
};
