// The questions of the skin quiz.
// Quiz.jsx renders them with map(), so a question can be added or changed here
// without touching the component.
//   type "radio"    -> one answer (required)
//   type "checkbox" -> several answers (optional)
//   type "text"     -> free text (optional)

export const quizQuestions = [
  {
    id: "skinType",
    number: "01",
    title: "How would you describe your skin?",
    type: "radio",
    required: true,
    options: [
      { value: "dry", label: "Dry" },
      { value: "oily", label: "Oily" },
      { value: "combination", label: "Combination" },
      { value: "normal", label: "Normal" },
      { value: "sensitive", label: "Sensitive" },
      { value: "unsure", label: "Not sure yet" }
    ]
  },
  {
    id: "concerns",
    number: "02",
    title: "What would you like to focus on?",
    hint: "Choose all that apply.",
    type: "checkbox",
    required: false,
    options: [
      { value: "hydration", label: "Hydration" },
      { value: "blemishes", label: "Blemishes" },
      { value: "uneven-tone", label: "Uneven skin tone" },
      { value: "redness", label: "Redness" },
      { value: "pores", label: "Visible pores" },
      { value: "glow", label: "Dullness & glow" },
      { value: "wrinkles", label: "Wrinkles & fine lines" }
    ]
  },
  {
    id: "routine",
    number: "03",
    title: "What's your current skincare routine like?",
    type: "radio",
    required: true,
    options: [
      { value: "minimal", label: "Minimal: cleanser and moisturiser" },
      { value: "regular", label: "A few products, morning and evening" },
      { value: "advanced", label: "I love a multi-step routine" },
      { value: "beginner", label: "I'm just getting started" }
    ]
  },
  {
    id: "budget",
    number: "04",
    title: "What's your skincare budget?",
    hint: "For your complete routine.",
    type: "radio",
    required: true,
    options: [
      { value: "under40", label: "Under €40" },
      { value: "40-80", label: "€40–€80" },
      { value: "80-150", label: "€80–€150" },
      { value: "over150", label: "€150+" }
    ]
  },
  {
    id: "allergies",
    number: "05",
    title: "Any ingredients you need to avoid?",
    hint: "Tell us about known allergies or sensitivities.",
    type: "text",
    required: false,
    placeholder: "e.g. fragrance, a specific ingredient, or none known..."
  },
  {
    id: "time",
    number: "06",
    title: "How much time do you have for skincare?",
    type: "radio",
    required: true,
    options: [
      { value: "quick", label: "5 minutes or less" },
      { value: "medium", label: "5–10 minutes" },
      { value: "long", label: "I'm happy to take my time" }
    ]
  }
];

// Empty answers: the starting state of the quiz form
export const emptyAnswers = {
  skinType: "",
  concerns: [],
  routine: "",
  budget: "",
  allergies: "",
  time: ""
};
