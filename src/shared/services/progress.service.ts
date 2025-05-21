import { apiClient } from "@/api/apiClient";

type SaveProgressParams = {
  user_id: number;
  lecture_id: number;
  isCompleted: boolean;
  completedAt?: Date;
  score?: number;
};

export const ProgressService = {
  saveProgress: async (data: SaveProgressParams) => {
    return apiClient.post("/progress", data);
  },
};
