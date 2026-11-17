import { useState } from "react";
import QuizQuestion from "./QuizQuestion.jsx";
import { quizQuestions, emptyAnswers } from "../data/quizQuestions.js";

// The skin quiz form.
// State:
//   answers -> the value of every question (controlled inputs)
//   errors  -> ids of the required questions left empty after "submit"
// Props:
//   onComplete(answers) -> tells App that the quiz is done
export default function Quiz({ onComplete }) {
  const [answers, setAnswers] = useState(emptyAnswers);
  const [errors, setErrors] = useState([]);

  // Called by every QuizQuestion when its value changes
  function handleChange(questionId, value) {
    setAnswers({ ...answers, [questionId]: value });
    // As soon as a missing question is answered, remove its error
    setErrors(errors.filter((id) => id !== questionId));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validation: every required question needs an answer
    const missing = quizQuestions
      .filter((question) => question.required && !answers[question.id])
      .map((question) => question.id);

    setErrors(missing);
    if (missing.length > 0) return;

    onComplete(answers);
  }

  const answeredCount = quizQuestions.filter((question) => {
    const value = answers[question.id];
    return Array.isArray(value) ? value.length > 0 : value.trim() !== "";
  }).length;

  return (
    <>
      <div className="quiz-intro">
        <p className="eyebrow">LET'S GET PERSONAL</p>
        <h2>Tell us about <em>you.</em></h2>
        <p>A few questions are all it takes to start discovering your SkinMatch.</p>
      </div>

      <form id="routine-form" onSubmit={handleSubmit} noValidate>
        <p className="quiz-progress" aria-live="polite">
          {answeredCount} of {quizQuestions.length} questions answered
        </p>

        {quizQuestions.map((question) => (
          <QuizQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            hasError={errors.includes(question.id)}
            onChange={handleChange}
          />
        ))}

        <div className="quiz-submit">
          {errors.length > 0 && (
            <p className="form-error" role="alert">
              Please answer the highlighted questions ({errors.length} missing) to reveal your SkinMatch.
            </p>
          )}
          <button type="submit" className="button button-primary">REVEAL MY SKINMATCH ↗</button>
          <p>Your answers help us create a personalised skincare suggestion.</p>
        </div>
      </form>
    </>
  );
}
