import { apiClient } from "@/api/apiClient";
import { TestQuestion } from "../types/test.types";

export const TestService = {
  questionsByLecture: async (id: string) => {
    return apiClient.get(`/test/lecture/${id}/questions`);
  },

  submitTest: async (data: {
    userId: number;
    lectureId: number;
    answers: {
      questionId: number;
      selectedOptionIds: number[];
    }[];
  }) => {
    return apiClient.post(`/test/submit`, data);
  },

  getExercise: async (id: string) => {
    return apiClient.get(`/test/exercise/${id}`);
  },

  checkIfTestPassed: async (userId: number, lectureId: number) => {
    return apiClient.get(`/test/status/${userId}/${lectureId}`);
  },
  removeByUserLecture: (userId: number, lectureId: number) =>
    apiClient.delete(`/test?userId=${userId}&lectureId=${lectureId}`),

  saveTest: async (lectureId: number, questions: TestQuestion[]) => {
    return apiClient.post("/test/save", { lectureId: +lectureId, questions });
  },
};
