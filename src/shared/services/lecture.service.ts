import { apiClient } from "@/api/apiClient";
import { Lecture } from "../types/lecture.types";

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
  createLecture: async (lecture: {
    title: string;
    type: Lecture["type"];
    course_id: number;
    module_id: number;
  }) => {
    return await apiClient.post("/lecture", lecture);
  },
  updateLecture: async (id: number, data: Partial<Lecture>) => {
    return apiClient.patch(`/lecture/${id}`, data);
  },
};
