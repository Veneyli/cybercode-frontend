import { apiClient } from "@/api/apiClient";

export const ModuleService = {
  module: async () => {
    return apiClient.get("/module");
  },

  moduleById: async (id: string) => {
    return apiClient.get(`/module/${id}`);
  },
};
