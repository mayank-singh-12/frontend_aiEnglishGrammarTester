import { useState, useEffect, useContext, createContext } from "react";

const QuizContext = createContext();

export default function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  // COMPONENT FLAG
  const [welcome, setWelcome] = useState(true);

  // INPUT FEILD VARS
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [focus, setFocus] = useState("");
  const [grammarTopic, setGrammarTopic] = useState("");
  const [questionType, setQuestionType] = useState("");

  // GREET VAR
  const [greet, setGreet] = useState("");
  const [loadingGreet, setLoadingGreet] = useState(false);
  const [errorGreet, setErrorGreet] = useState(null);

  // QUESTION VAR
  const [question, setQuestion] = useState("");
  const [questionHeading, setQuestionHeading] = useState("");
  const [options, setOptions] = useState([]);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [errorQuestion, setErrorQuestion] = useState(null);

  // ANSWER VAR
  const [answer, setAnswer] = useState("");

  // EVALUATION VARS
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [nextPrompt, setNextPrompt] = useState(null);
  const [correctAns, setCorrectAns] = useState(null);
  const [fullAnswer, setFullAnswer] = useState("");
  const [loadingEval, setLoadingEval] = useState(false);
  const [errorEval, setErrorEval] = useState(null);

  useEffect(() => {
    async function initialGreet() {
      try {
        setLoadingGreet(true);
        const response = await fetch("https://backend-ai-english-grammar-tester.vercel.app/", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw "Unable to get greeting from Ai.";
        }
        const { aiResData } = await response.json();
        setGreet(aiResData.greet);
        setErrorGreet(null);
      } catch (error) {
        console.log(error);
        setErrorGreet("Your Ai English Assistant is not working.");
      } finally {
        setLoadingGreet(false);
      }
    }
    initialGreet();
  }, []);

  const contextFields = {
    welcome,
    setWelcome,

    greet,
    setGreet,
    loadingGreet,
    setLoadingGreet,
    errorGreet,
    setErrorGreet,

    name,
    setName,
    proficiency,
    setProficiency,
    focus,
    setFocus,
    grammarTopic,
    setGrammarTopic,
    questionType,
    setQuestionType,

    question,
    setQuestion,
    options,
    setOptions,
    questionHeading,
    setQuestionHeading,
    loadingQuestion,
    setLoadingQuestion,
    errorQuestion,
    setErrorQuestion,

    answer,
    setAnswer,
    fullAnswer,
    setFullAnswer,

    isCorrect,
    setIsCorrect,
    feedback,
    setFeedback,
    nextPrompt,
    setNextPrompt,
    correctAns,
    setCorrectAns,
    loadingEval,
    setLoadingEval,
    errorEval,
    setErrorEval,
  };

  return (
    <QuizContext.Provider value={contextFields}>
      {children}
    </QuizContext.Provider>
  );
}
