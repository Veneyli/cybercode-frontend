import { Lecture } from "./lecture.types";

export interface Module {
  module_id: number;
  course_id: number;
  title: string;
  description: string;
  order: number;
  lectures: Lecture[];
}
