import { apiClient } from "@/api/apiClient";

export const UploadService = {
  uploadImage: async (data: FormData) => {
    return await apiClient.post(`/upload/upload-image/`, data);
  },
  uploadVideo: async (data: FormData) => {
    return await apiClient.post(`/upload/upload-video/`, data);
  },
};
