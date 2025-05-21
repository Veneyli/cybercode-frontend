import { apiClient } from "@/api/apiClient";

export const CourseService = {
  courseAll: async () => {
    return apiClient.get("/courses");
  },

  courseById: async (id: string) => {
    return apiClient.get(`/courses/${id}`);
  },
  enrollCourse: async (id: number) => {
    return apiClient.post(`/courses/${id}/enroll`, {});
  },
};
