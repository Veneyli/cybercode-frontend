import { apiClient } from "@/api/apiClient";

export const MediaService = {
  media: async () => {
    return apiClient.get("/media");
  },
  mediaById: async (id: string) => {
    return apiClient.get(`/media/${id}`);
  },
};
