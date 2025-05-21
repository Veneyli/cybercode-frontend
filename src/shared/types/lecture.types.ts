export interface Lecture {
  lecture_id: number;
  module_id: number;
  course_id: number;
  title: string;
  description: string;
  video_url?: string;
  order: number;
  type: "VIDEO" | "TEST" | "CODE" | "TEXT" | "OTHER";
  userProgress: number;
  isCompleted: number;
}
