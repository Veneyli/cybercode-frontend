import { TestQuestion, TestOption } from "@/shared/types/test.types";
import styles from "./TestQuestionForm.module.scss";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";

type Props = {
  question: TestQuestion;
  onChange: (q: TestQuestion) => void;
  onRemove: () => void;
};

export default function TestQuestionForm({
  question,
  onChange,
  onRemove,
}: Props) {
  const updateOption = <K extends keyof TestOption>(
    index: number,
    field: K,
    value: TestOption[K]
  ) => {
    const newOptions = [...question.options];
    newOptions[index] = { ...newOptions[index], [field]: value };

    if (field === "isCorrect" && question.type === "RADIO" && value === true) {
      for (let i = 0; i < newOptions.length; i++) {
        newOptions[i].isCorrect = i === index;
      }
    }

    onChange({ ...question, options: newOptions });
  };

  const addOption = () => {
    onChange({
      ...question,
      options: [...question.options, { text: "", isCorrect: false }],
    });
  };

  const removeOption = (index: number) => {
    onChange({
      ...question,
      options: question.options.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={styles["question"]}>
      <div className={styles["question__fields"]}>
        <Field
          type="text"
          placeholder="Вопрос"
          value={question.question}
          onChange={(e) => onChange({ ...question, question: e.target.value })}
        />

        <Field
          type="select"
          value={question.type}
          onChange={(e) =>
            onChange({
              ...question,
              type: e.target.value as "RADIO" | "CHECKBOX",
            })
          }
        >
          <option value="RADIO">Один правильный</option>
          <option value="CHECKBOX">Несколько правильных</option>
        </Field>
      </div>
      <div className={styles["question__options"]}>
        {question.options.map((opt, idx) => (
          <div key={idx} className={styles["question__option"]}>
            <Field
              type="text"
              placeholder={`Вариант ${idx + 1}`}
              value={opt.text}
              onChange={(e) => updateOption(idx, "text", e.target.value)}
            />
            <label className={styles["question__option-label"]}>
              <input
                className={styles["question__option-input"]}
                type={question.type === "RADIO" ? "radio" : "checkbox"}
                name={`option-${question.question}`}
                checked={opt.isCorrect}
                onChange={(e) =>
                  updateOption(idx, "isCorrect", e.target.checked)
                }
              />
              Правильный
            </label>
            <button
              className={styles["question__option-remove"]}
              type="button"
              onClick={() => removeOption(idx)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className={styles["question__buttons"]}>
        <Button
          size="small"
          label="Добавить вариант"
          type="button"
          onClick={addOption}
        />
        <Button
          size="small"
          variant="remove"
          label="Удалить вопрос"
          type="button"
          onClick={onRemove}
        />
      </div>
    </div>
  );
}
