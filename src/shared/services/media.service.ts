import { apiClient } from "@/api/apiClient";
import { Media } from "../types/media.types";

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
      return response ?? [];
    } catch (error) {
      console.error("Ошибка при получении медиа:", error);
      return [];
    }
  },

  mediaById: async (id: string) => {
    return apiClient.get(`/media/${id}`);
  },
  mediaUpdate: async (id: number, data: Partial<Media>) => {
    try {
      const response = await apiClient.patch(`/media/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при обновлении медиа:", error);
      throw error;
    }
  },

  mediaDelete: async (id: number) => {
    try {
      const response = await apiClient.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при удалении медиа:", error);
      throw error;
    }
  },
  mediaCreate: async (data: Partial<Media>) => {
    try {
      const response = await apiClient.post("/media", data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при создании медиа:", error);
      throw error;
    }
  },
};
