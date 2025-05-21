import { apiClient } from "@/api/apiClient";

export const UserService = {
  getUser: async (id: string) => {
    return apiClient.get(`/user/${id}`);
  },
  userProgress: async (id: string) => {
    return await apiClient.get(`/user/course-progress/${id}`);
  },
};
