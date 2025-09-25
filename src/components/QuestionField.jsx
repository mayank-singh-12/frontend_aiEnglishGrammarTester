import useQuiz from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";

export default function QuestionField() {
  const navigate = useNavigate();

  // IMPORTING REQUIRED FIELDS
  const {
    answer,
    question,
    options,
    questionHeading,
    loadingQuestion,
    errorQuestion,
    setAnswer,
    setLoadingEval,
    setErrorEval,
    setWelcome,
    setIsCorrect,
    setCorrectAns,
    setFeedback,
    setNextPrompt,
    setFullAnswer,
    setOptions,
    setQuestion,
    setQuestionHeading,
  } = useQuiz();

  async function ansFormHandler(e) {
    e.preventDefault();
    navigate("/");

    try {
      setQuestionHeading("");
      setQuestion("");
      setOptions([]);
      setLoadingEval(true);
      const response = await fetch(
        "https://backend-ai-english-grammar-tester.vercel.app/interact",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer }),
        }
      );

      if (!response.ok) throw "Unable to get response from ai.";

      const { aiResData } = await response.json();
      setIsCorrect(aiResData.isCorrect);
      setFeedback(aiResData.feedback);
      setNextPrompt(aiResData.nextPrompt);
      setCorrectAns(aiResData.correctAnswer);
      setFullAnswer(aiResData.fullSentence);
    } catch (error) {
      console.log(error);
      setErrorEval("Your Ai English Assistant is not working.");
    } finally {
      setLoadingEval(false);
      setWelcome(false);
    }
  }

  return (
    <>
      {loadingQuestion && (
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
      {question != "" ? (
        <div>
          <div className="mt-3">
            <p>
              <strong>{questionHeading}</strong>
            </p>
            <p>{question}</p>
          </div>

          <form onSubmit={ansFormHandler}>
            {options.length != 0 ? (
              <>
                {options.map((option) => (
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="quizOptions"
                        id={option}
                        value={option}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={option}
                        key={option}
                      >
                        {option}
                      </label>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <input
                className="form-control"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            )}

            <button className="btn btn-primary mt-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>{errorQuestion && <p className="text-center">{errorQuestion}</p>}</>
      )}
    </>
  );
}
