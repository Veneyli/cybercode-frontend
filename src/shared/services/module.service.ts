import { apiClient } from "@/api/apiClient";
import { Module } from "@/types/module.types";

export const ModuleService = {
  module: async () => {
    return apiClient.get("/module");
  },

  moduleById: async (id: string) => {
    return apiClient.get(`/module/${id}`);
  },
  upsert: async (data: Module) => {
    return apiClient.post("/module", { ...data });
  },

  remove: async (id: number) => {
    return apiClient.delete(`/module/${id}`);
  },
};
