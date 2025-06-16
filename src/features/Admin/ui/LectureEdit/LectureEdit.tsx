import { Lecture } from "@/shared/types/lecture.types";
import TextLectureForm from "./TextLectureForm/TextLectureForm";
import VideoLectureForm from "./VideoLectureForm/VideoLectureForm";
import TestLectureForm from "./TestLectureForm/TestLectureForm";
import CodeLectureForm from "./CodeLectureForm/CodeLectureForm";

type Props = {
  lecture: Lecture;
};

export default function LectureEditForm({ lecture }: Props) {
  switch (lecture.type) {
    case "TEXT":
      return <TextLectureForm lecture={lecture} />;
    case "VIDEO":
      return <VideoLectureForm lecture={lecture} />;
    case "CODE":
      return <CodeLectureForm lecture={lecture} />;
    case "TEST":
      return <TestLectureForm lecture={lecture} />;
    default:
      return <div>Неизвестный тип лекции</div>;
  }
}
