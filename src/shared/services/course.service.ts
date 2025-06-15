import { apiClient } from "@/api/apiClient";
import type { Course } from "@/types/course.types";

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
  getFilteredCourses: async (
    technology: string[] = [],
    level = "",
    searchQuery = ""
  ) => {
    const queryParams = new URLSearchParams();

    if (technology.length > 0) {
      queryParams.append("technology", technology.join(","));
    }
    if (level) {
      queryParams.append("level", level);
    }
    if (searchQuery) {
      queryParams.append("search", searchQuery);
    }

    const response = await apiClient.get(`/courses?${queryParams.toString()}`);
    return response;
  },
  updateCourse: async (id: string, data: Partial<Course>) => {
    return apiClient.put(`/courses/${id}`, data);
  },
  create: async (data: Partial<Course>) => {
    const res = await apiClient.post("/courses", data);
    return res;
  },
  deleteCourse: async (id: string) => {
    return apiClient.delete(`/courses/${id}`);
  },
};
