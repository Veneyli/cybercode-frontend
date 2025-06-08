import TestComponent from "@/widget/TestComponent/TestComponent";
import styles from "./lecturePage.module.scss";
import { LectureService } from "@/shared/services/lecture.service";

import { FlexibleVideo } from "@/widget/Video/Video";
import CodeEditor from "@/widget/CodeEditor/CodeEditor";
import LectureBlock from "@/widget/LectureBlock/LectureBlock";
import { TestService } from "@/shared/services/test.service";
import { getServerSession } from "@/lib/getServerSession";

type Props = {
  params: {
    studyId: string;
    lectureId: string;
  };
};

const LecturePage = async ({ params }: Props) => {
  const lectureId = params.lectureId;
  const lecture = await LectureService.lectureById(lectureId);
  const user = await getServerSession();

  if (!lecture) return <p className={styles.lecture__loading}>Загрузка...</p>;

  let questions = [];
  if (lecture.type === "TEST") {
    questions = await TestService.questionsByLecture(lecture.lecture_id);
  }
  return (
    <div className={styles.lecture}>
      <h1 className={styles.lecture__title}>{lecture.title}</h1>
      <p className={styles.lecture__description}>
        Описание лекции: {lecture.description}
      </p>
      {lecture.type === "CODE" && (
        <CodeEditor
          lecture={lecture}
          userId={user.user_id}
          lectureId={lecture.lecture_id}
        />
      )}
      {(lecture.type === "TEXT" || lecture.type === "OTHER") && (
        <LectureBlock userId={user.user_id} lecture={lecture} />
      )}
      {lecture.type === "TEST" && questions.length > 0 && (
        <TestComponent lectureId={lecture.lecture_id} userId={user.user_id} />
      )}
      {lecture.type === "TEST" && questions.length === 0 && (
        <p className={styles.lecture__description}>
          Вопросы к тесту пока не добавлены.
        </p>
      )}
      {lecture.type === "VIDEO" &&
        (lecture.video_url ? (
          <FlexibleVideo
            userId={user.user_id}
            url={lecture.video_url}
            lectureId={lecture.lecture_id}
          />
        ) : (
          <FlexibleVideo
            userId={user.user_id}
            url={lecture.video_url}
            lectureId={lecture.lecture_id}
          />
        ))}
    </div>
  );
};

export default LecturePage;
