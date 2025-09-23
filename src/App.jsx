import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./contexts/QuizContext";

import Header from "./components/Header";
import Home from "./components/Home";
import QuestionField from "./components/QuestionField";
import EvalField from "./components/EvalField";

function App() {
  return (
    <>
      <QuizProvider>
        <BrowserRouter>
          <main
            className="container fs-4 mb-5"
            style={{ fontFamily: "monospace" }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/question" element={<QuestionField />} />
              <Route path="/question" element={<EvalField />} />
            </Routes>
          </main>
        </BrowserRouter>
      </QuizProvider>
    </>
  );
}

export default App;
