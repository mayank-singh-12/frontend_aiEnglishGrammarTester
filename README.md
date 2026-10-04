# AI English Grammar Tester

An interactive, AI-powered English grammar learning application that provides personalized quizzes based on user proficiency, focus areas, and specific grammar topics.

## 🚀 Features

- **Personalized Learning**: Tailors quiz difficulty (Beginner, Intermediate, Advanced) and focus (IELTS, TOEFL, Business English, etc.) to the user.
- **Dynamic Question Generation**: Uses Google Gemini AI to generate a variety of question types, including:
  - Multiple Choice (MCQs)
  - Fill-in-the-blanks
  - Error Correction
  - Sentence Rearrangement
- **Real-time Feedback**: Provides immediate correctness validation and brief educational explanations for every answer.
- **Interactive Flow**: One-question-at-a-time interface to keep users focused and engaged.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI library for building the user interface.
- **Vite**: Fast build tool and development server.
- **React Router DOM**: Handles navigation and routing.
- **Bootstrap**: For responsive and clean styling.
- **React Context API**: Manages global quiz state and AI interaction history.

### Backend
- **Node.js & Express**: Robust server-side environment and API framework.
- **Google Generative AI (@google/genai)**: Powers the grammar expertise and question generation using the `gemini-3.5-flash` model.
- **Dotenv**: Manages environment variables securely.
- **CORS**: Enables cross-origin requests between the frontend and backend.

## 📂 Project Structure

```text
.
├── client/                # React frontend
│   ├── src/
│   │   ├── components/     # UI Components (Home, QuestionField, EvalField, etc.)
│   │   ├── contexts/       # State management (QuizContext)
│   │   └── App.jsx         # Main application entry
│   └── package.json
└── server/                # Express backend
    ├── index.js            # Main server entry and API endpoints
    ├── aiManual.txt        # System prompt defining the AI's persona and rules
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed on your machine.
- A Google Gemini API Key.

### 1. Server Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
GOOGLEAPI=your_google_gemini_api_key_here
PORT=5000
```
Run the server:
```bash
npm start
```

### 2. Client Setup
```bash
cd client
npm install
```
Run the development server:
```bash
npm run dev
```

## 📝 How it Works

1. **Initialization**: The server reads a detailed `aiManual.txt` file that instructs the AI to act as an expert English Grammar Teaching Assistant.
2. **Profiling**: The user provides their name, proficiency level, and focus area.
3. **Interaction Loop**:
   - The client sends the user's profile and history to the `/interact` endpoint.
   - The server prompts the AI to generate a JSON-formatted question.
   - The AI returns a question (and options if MCQ).
   - The user submits an answer, which is sent back to the AI for evaluation.
   - The AI returns whether the answer was correct, a brief explanation, and the correct answer.

## 📜 License
ISC
