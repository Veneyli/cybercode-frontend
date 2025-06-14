import { TestQuestion, TestOption } from "@/shared/types/test.types";
import styles from "./TestQuestionForm.module.scss";

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
  const updateOption = (index: number, field: keyof TestOption, value: any) => {
    const newOptions = [...question.options];
    newOptions[index] = { ...newOptions[index], [field]: value };

    if (field === "isCorrect" && question.type === "RADIO" && value) {
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
    <div className={styles.question}>
      <input
        type="text"
        placeholder="Вопрос"
        value={question.question}
        onChange={(e) => onChange({ ...question, question: e.target.value })}
      />

      <select
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
      </select>

      {question.options.map((opt, idx) => (
        <div key={idx} className={styles.option}>
          <input
            type="text"
            placeholder={`Вариант ${idx + 1}`}
            value={opt.text}
            onChange={(e) => updateOption(idx, "text", e.target.value)}
          />
          <label>
            <input
              type={question.type === "RADIO" ? "radio" : "checkbox"}
              name={`option-${question.question}`}
              checked={opt.isCorrect}
              onChange={(e) => updateOption(idx, "isCorrect", e.target.checked)}
            />
            Правильный
          </label>
          <button type="button" onClick={() => removeOption(idx)}>
            Удалить вариант
          </button>
        </div>
      ))}

      <button type="button" onClick={addOption}>
        Добавить вариант
      </button>
      <button type="button" onClick={onRemove}>
        Удалить вопрос
      </button>
    </div>
  );
}
