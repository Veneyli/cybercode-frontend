import { apiClient } from "@/api/apiClient";

export const MediaService = {
  media: async (params?: { category?: string; search?: string }) => {
    const queryParams = new URLSearchParams();

    if (params?.category && params.category !== "Все") {
      queryParams.append("category", params.category);
    }

    if (params?.search) {
      queryParams.append("search", params.search);
    }

    const queryString = queryParams.toString();
    const endpoint = `/media${queryString ? `?${queryString}` : ""}`;

    try {
      const response = await apiClient.get(endpoint);
      return response.data ?? [];
    } catch (error) {
      console.error("Ошибка при получении медиа:", error);
      return [];
    }
  },

  mediaById: async (id: string) => {
    return apiClient.get(`/media/${id}`);
  },
};
