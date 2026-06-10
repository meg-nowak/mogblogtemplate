// src/components/widgets/QuestionCard.jsx
import { useState, useEffect } from "react";

/**
 * Renders a single quiz question with interactive, animated feedback choices.
 * @param {Object} question - The current question object { title, options, correctAnswers }
 * @param {string|null} feedback - The parenting phase state: null, 'correct', or 'incorrect'
 * @param {function} onAnswerSelect - Callback when an option is clicked
 * @param {function} onNextQuestion - Callback to progress the quiz
 * @param {string} transitionClass - OPTIONAL custom Tailwind transition settings
 */
export default function QuestionCard({
                                         question,
                                         feedback,
                                         onAnswerSelect,
                                         onNextQuestion,
                                         transitionClass = "transition-all duration-300 ease-in-out" // Elegant default encoded here!
                                     }) {
    // Track which specific option index the user clicked locally
    const [selectedOption, setSelectedOption] = useState(null);

    // CRITICAL CLEANUP: When the parent component passes a brand-new question object,
    // we must reset our local selection state back to null for the new slide!
    useEffect(() => {
        setSelectedOption(null);
    }, [question]);

    const handleOptionClick = (index) => {
        if (feedback !== null) return; // Lock the UI if already answered
        setSelectedOption(index);
        onAnswerSelect(index);
    };

    const isAnswered = feedback !== null;

    return (
        <div className="flex flex-col h-full justify-between min-h-[320px]">
            {/* Question Title */}
            <div className="mb-6">
                <h3 className="text-base font-semibold text-slate-800 tracking-tight leading-relaxed">
                    {question.title}
                </h3>
            </div>

            {/* Grid of Options */}
            <div className="flex flex-col gap-2.5 mb-6">
                {question.options.map((option, index) => {
                    const isCorrectAnswer = question.correctAnswers.includes(index);
                    const isSelectedByMe = selectedOption === index;

                    // --- DYNAMIC STYLING STATE MACHINE ---
                    let buttonStyles = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";

                    if (isAnswered) {
                        if (isCorrectAnswer) {
                            // Highlight the right answer in soft, calming emerald green
                            buttonStyles = "bg-emerald-50 border-emerald-400 text-emerald-800 font-medium shadow-sm shadow-emerald-100";
                        } else if (isSelectedByMe && !isCorrectAnswer) {
                            // If I chose poorly, highlight my mistake in soft rose red
                            buttonStyles = "bg-rose-50 border-rose-400 text-rose-800 shadow-sm shadow-rose-100";
                        } else {
                            // Dim out all other non-involved option choices
                            buttonStyles = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60 pointer-events-none";
                        }
                    }

                    return (
                        <button
                            key={index}
                            disabled={isAnswered}
                            onClick={() => handleOptionClick(index)}
                            className={`w-full text-left p-3.5 text-xs rounded-xl border font-sans ${buttonStyles} ${transitionClass}`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {/* Visual Status Emblems */}
                                {isAnswered && isCorrectAnswer && <span className="text-emerald-500 font-bold">✓</span>}
                                {isAnswered && isSelectedByMe && !isCorrectAnswer && <span className="text-rose-400 font-bold">✗</span>}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Footer Navigation Bar */}
            <div className="flex justify-end h-10 items-center">
                {isAnswered && (
                    <button
                        onClick={onNextQuestion}
                        className={`bg-slate-800 text-white text-xs font-mono px-4 py-2 rounded-lg hover:bg-slate-700 active:scale-95 shadow-sm ${transitionClass}`}
                    >
                        Next Question ➔
                    </button>
                )}
            </div>
        </div>
    );
}