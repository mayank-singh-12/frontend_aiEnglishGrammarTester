import useQuiz from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";
import EvalField from "./EvalField";

export default function Home() {
  const navigate = useNavigate();

  // GETTING REQUIRED FIELDS FROM CONTEXT
  const {
    welcome,
    setWelcome,
    greet,
    loadingGreet,
    errorGreet,
    name,
    proficiency,
    focus,
    grammarTopic,
    questionType,
    setName,
    setProficiency,
    setFocus,
    setGrammarTopic,
    setOptions,
    setQuestion,
    setQuestionType,
    setQuestionHeading,
    setErrorQuestion,
    setLoadingQuestion,
    loadingEval,

    setAnswer,
    setLoadingEval,
    setErrorEval,
    setIsCorrect,
    setCorrectAns,
    setFeedback,
    setNextPrompt,
    setFullAnswer,
  } = useQuiz();

  async function formHandler(e) {
    e.preventDefault();
    navigate("/question");

    // RESET VARS
    const data = {
      name,
      proficiency,
      focus,
      grammarTopic,
      questionType,
    };

    try {
      setIsCorrect(null);
      setCorrectAns(null);
      setFeedback(null);
      setNextPrompt(null);
      setFullAnswer("");
      setAnswer("");
      setLoadingQuestion(true);
      setWelcome(false);
      const response = await fetch(
        "http://localhost:3000/interact",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response)

      if (!response.ok) throw "Unable to get response from ai.";

      const { aiResData } = await response.json();

      if (aiResData.options) {
        setOptions(aiResData.options);
      }

      setQuestion(aiResData.question);
      setQuestionHeading(aiResData.questionHeading);
    } catch (error) {
      console.log(error);
      setErrorQuestion("Your Ai English Assistant is not working.");
    } finally {
      setLoadingQuestion(false);
    }
  }
  return (
    <>
      {welcome ? (
        <>
          {loadingGreet && (
            <div className="d-flex justify-content-center mt-5">
              <div
                className="spinner-grow"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="text-center">
            {greet && <p className="fs-3">{greet}</p>}
          </div>
        </>
      ) : (
        <>
          <EvalField />
        </>
      )}

      {!loadingGreet && !loadingEval && (
        <form onSubmit={formHandler}>
          <div>
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              className="form-select mt-3"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              required
            >
              <option value="">Select Proficiency Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <select
              className="form-select mt-3"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              required
            >
              <option value="">Select Focus Area</option>
              <option value="General English">General English</option>
              <option value="IELTS">IELTS</option>
              <option value="TOEFL">TOEFL</option>
              <option value="Business English">Business English</option>
              <option value="Creative Writing">Creative Writing</option>
              <option value="Daily Conversation">Daily Conversation</option>
            </select>
          </div>
          <div>
            <select
              className="form-select mt-3"
              value={grammarTopic}
              onChange={(e) => setGrammarTopic(e.target.value)}
            >
              <option value="">Select Topic (optional)</option>
              <option value="Tenses">Tenses</option>
              <option value="IELTS">Prepositions</option>
              <option value="TOEFL">Articles</option>
              <option value="subject-verb agreement">
                Subject-verb agreement
              </option>
              <option value="Conditionals">Conditionals</option>
              <option value="Phrasal verbs">Phrasal verbs</option>
              <option value="Reported speech">Reported speech</option>
            </select>
          </div>
          <div>
            <select
              className="form-select mt-3"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="">Select Question Type (optional)</option>
              <option value="Multiple choice">Multiple choice</option>
              <option value="Fill in the blank">Fill in the blank</option>
              <option value="Error correction">Error correction</option>
              <option value="Sentence rearrangement">
                Sentence rearrangement
              </option>
            </select>
          </div>
          <div>
            <button
              to="/question"
              className="btn btn-primary mt-3"
              type="submit"
            >
              Get Question
            </button>
          </div>
        </form>
      )}
      {errorGreet && <p className="text-center">{errorGreet}</p>}
    </>
  );
}
