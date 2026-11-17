// One question of the quiz. The same component shows radio, checkbox and text questions.
// It does not keep its own state: it receives "value" from Quiz and calls onChange
// (controlled input).
export default function QuizQuestion({ question, value, hasError, onChange }) {
  // Checkbox: add the option if it is ticked, remove it if it is unticked
  function toggleOption(optionValue, isChecked) {
    const newValue = isChecked
      ? [...value, optionValue]
      : value.filter((item) => item !== optionValue);
    onChange(question.id, newValue);
  }

  return (
    <fieldset className={`quiz-question ${hasError ? "has-error" : ""}`} id={`question-${question.id}`}>
      <legend>{question.number}. {question.title}</legend>
      {question.hint && <p className="question-hint">{question.hint}</p>}

      {question.type === "text" ? (
        <>
          <label className="input-label" htmlFor={question.id}>Allergies or ingredients to avoid</label>
          <textarea
            id={question.id}
            rows="3"
            placeholder={question.placeholder}
            value={value}
            onChange={(event) => onChange(question.id, event.target.value)}
          />
        </>
      ) : (
        <div className="options-grid">
          {question.options.map((option) => (
            <label className="option-card" key={option.value}>
              {question.type === "radio" ? (
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(question.id, option.value)}
                />
              ) : (
                <input
                  type="checkbox"
                  name={question.id}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={(event) => toggleOption(option.value, event.target.checked)}
                />
              )}
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {hasError && <p className="question-error">Please choose an answer.</p>}
    </fieldset>
  );
}
