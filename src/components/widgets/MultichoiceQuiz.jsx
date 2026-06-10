// src/components/widgets/MultichoiceQuiz.jsx

import {useState } from "react";
import themePresets from "../../themeconfig/theme-presets.json";
import quizData from '../../content/data/quiz.json';
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";

/**
 * A multiple choice quiz widget!
 * @param themePreset           OPTIONAL - The name of the theme you want to apply to this component
 * @param props
 * @constructor
 */
export default function MultichoiceQuiz({themePreset = "sage-green", ...props}) {
    // fetch the questions
    const quiz = quizData;

    // 1. STATE: We need these to trigger re-renders
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [feedback, setFeedback] = useState(null); // null, 'correct', or 'incorrect'

    const maxScore = quiz.questions.length;

    function handleAnswerSelect(selectedIndex) {
        // If the user already answered, lock the buttons so they can't double-click score points
        if (feedback !== null) return;

        const currentQuestion = quiz.questions[currentQuestionIndex];

        // Check if the selected index exists inside our correctAnswers array
        const isCorrect = currentQuestion.correctAnswers.includes(selectedIndex);

        // 1. Set feedback state to trigger animations/colors in the UI
        setFeedback(isCorrect ? 'correct' : 'incorrect');

        // 2. Increment score if they nailed it
        if (isCorrect) {
            setCurrentScore((prev) => prev + 1);
        }
    }

    function handleNextQuestion() {
        // 1. Clear the feedback lock so the next question starts fresh
        setFeedback(null);

        // 2. Safely increment the index.
        // If it reaches maxScore, React's conditional rendering automatically drops Phase 2 and reveals Phase 3!
        setCurrentQuestionIndex((prev) => prev + 1);
    }

    function handleRestart() {
        // Reset everything back to square one
        setCurrentScore(0);
        setCurrentQuestionIndex(0);
        setFeedback(null);
        setQuizStarted(false);
    }

    return (
        <div className={`p-6 rounded-xl ${themePresets[themePreset]?.bg || 'bg-white'}`}>
            {/* PHASE 1: Title Screen */}
            {!quizStarted && (
                <div className="text-center p-4">
                    <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
                    <button
                        onClick={() => setQuizStarted(true)}
                        className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
                    >
                        Start Quiz
                    </button>
                </div>
            )}

            {/* PHASE 2: Active Questioning */}
            {quizStarted && currentQuestionIndex < maxScore && (
                <QuestionCard
                    question={quiz.questions[currentQuestionIndex]}
                    feedback={feedback}
                    onAnswerSelect={handleAnswerSelect} // Pass the handler down
                    onNextQuestion={handleNextQuestion}
                />
            )}

            {/* PHASE 3: Results */}
            {quizStarted && currentQuestionIndex === maxScore && (
                <ResultCard
                    score={currentScore}
                    maxScore={maxScore}
                    grades={quiz.grades} // Send the raw grades data down to let ResultCard process it
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}