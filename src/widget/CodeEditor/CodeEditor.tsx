"use client";
import { useRef, useState, useEffect } from "react";
import Editor, { loader } from "@monaco-editor/react";
import styles from "./CodeEditor.module.scss";
import { useTheme } from "@/providers/ThemeProvider";
import { useLectureProgress } from "@/providers/LectureProgressContext";
import { ProgressService } from "@/shared/services/progress.service";
import Button from "@/ui/Button/Button";

type CodeEditorProps = {
  lecture: {
    code: string;
    language?: string;
  };
  userId: number;
  lectureId: number;
};

const CodeEditor = ({ lecture, userId, lectureId }: CodeEditorProps) => {
  const { theme } = useTheme();
  const { refreshProgress } = useLectureProgress();

  const [code, setCode] = useState(lecture.code);
  const [output, setOutput] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = async () => {
    const lang = lecture.language || "html";

    if (lang === "javascript" || lang === "html") {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = code;
        setOutput("");
      }

      await ProgressService.saveProgress({
        user_id: userId,
        lecture_id: lectureId,
        isCompleted: true,
        completedAt: new Date(),
        score: undefined,
      });
      refreshProgress();

      return;
    }

    try {
      const response = await fetch("/api/runCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          language_id: getLanguageId(lang),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setOutput(`Ошибка API: ${errorData.error || "Unknown error"}`);
        return;
      }

      const result = await response.json();
      setOutput(result.stdout || result.stderr || "Нет вывода.");

      await ProgressService.saveProgress({
        user_id: userId,
        lecture_id: lectureId,
        isCompleted: true,
        completedAt: new Date(),
        score: 100,
      });
      refreshProgress();
    } catch (err) {
      console.error("Ошибка выполнения:", err);
      setOutput("Ошибка выполнения кода.");
    }

    if (iframeRef.current) {
      iframeRef.current.srcdoc = "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => console.log("Код скопирован"))
      .catch((err) => console.error("Ошибка копирования:", err));
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    if (iframeRef.current) {
      iframeRef.current.srcdoc = "";
    }
  };

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("transparent-theme", {
        base: theme === "dark" ? "vs-dark" : "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#00000000",
          "editorGutter.background": "#00000000",
        },
      });
    });
  }, [theme]);

  return (
    <div className={styles["code-editor"]}>
      <div className={styles["code-editor__code"]}>
        <Editor
          height="700px"
          language={lecture.language || "html"}
          value={code}
          theme="transparent-theme"
          onChange={(value) => setCode(value || "")}
          options={{
            readOnly: false,
            minimap: { enabled: false },
            fontSize: 18,
            lineNumbers: "on",
            automaticLayout: true,
          }}
        />
      </div>

      <div className={styles["code-editor__buttons"]}>
        <Button label=" ▶ Выполнить" onClick={runCode} />
        <Button label="Скопировать" onClick={handleCopy} />
        <Button label="Очистить" onClick={handleClear} />
      </div>

      <div className={styles["code-editor__output-wrapper"]}>
        <div className={styles["code-editor__output-header"]}>
          <span />
          <span />
          <span />
        </div>
        <iframe
          ref={iframeRef}
          sandbox="allow-scripts allow-same-origin"
          className={styles["code-editor__output-frame"]}
        />
      </div>
      {output && (
        <div className={styles["code-editor__text-output"]}>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;

const getLanguageId = (lang: string): number => {
  switch (lang.toLowerCase()) {
    case "python":
    case "python3":
      return 71;
    case "cpp":
    case "c++":
      return 54;
    case "java":
      return 62;
    case "c":
      return 50;
    case "javascript":
      return 63;
    default:
      return 71;
  }
};
