import useQuiz from "../contexts/QuizContext";

export default function EvalField() {
  const {
    isCorrect,
    correctAns,
    feedback,
    errorEval,
    loadingEval,
    nextPrompt,
    fullAnswer,
  } = useQuiz();

  return (
    <>
      {loadingEval && (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-grow"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {isCorrect != null && (
        <>
          <div
            className={`alert ${
              isCorrect ? "alert-success" : "alert-danger"
            } mt-3`}
          >
            <h4>
              <u>{isCorrect ? "Correct" : "Incorrect"}</u>
            </h4>
            <p>
              <strong>Correct answer: </strong>
              <span>{correctAns}</span>
            </p>
            <p>
              <strong>Correct Sentence: </strong>
              <span>{fullAnswer}</span>
            </p>
            <p>{feedback}</p>
          </div>
          {nextPrompt && (
            <div className="mt-3 pt-3 pb-1">
              <p className="text-center">{nextPrompt}</p>
            </div>
          )}
        </>
      )}
      {errorEval && <p className="text-center">{errorEval}</p>}
    </>
  );
}
