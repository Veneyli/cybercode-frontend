import { apiClient } from "@/api/apiClient";

export const LectureService = {
  lecture: async () => {
    return apiClient.get("/lecture");
  },
  lectureById: async (id: string) => {
    return apiClient.get(`/lecture/${id}`);
  },
  lectureByCourseId: async (id: string) => {
    return apiClient.get(`/lecture/course/${id}`);
  },
  userProgress: async (id: string) => {
    return await apiClient.get(`/user/lecture-progress/${id}`);
  },
  lectureWithProgressByCourse: async (courseId: string, userId: string) => {
    return await apiClient.get(
      `/lecture/by-course/${courseId}?userId=${userId}`
    );
  },
};
