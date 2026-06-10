// src/components/widgets/ResultCard.jsx

/**
 * Displays the final results of a quiz with custom grading messages.
 * @param {number} score - The user's raw score
 * @param {number} maxScore - Total number of questions
 * @param {Array} grades - Array of grade objects from JSON
 * @param {function} onRestart - Callback function to reset the quiz
 * @param {boolean} displayAsPercentage - OPTIONAL toggle for score format
 * @param {boolean} allowRetake - OPTIONAL toggle to show/hide the restart button
 */
export default function ResultCard({
                                       score,
                                       maxScore,
                                       grades,
                                       onRestart,
                                       displayAsPercentage = false,
                                       allowRetake = true
                                   }) {
    // 1. Calculate final score percentage (avoid dividing by zero just in case)
    const finalScorePercentage = maxScore > 0 ? score / maxScore : 0;

    // 2. Find the correct grade message
    // CRITICAL: We use [...grades] to create a shallow clone before sorting.
    // In React, props are read-only; trying to .sort() a prop directly can mutate
    // the source data in place and cause nasty rendering bugs!
    const finalGrade = [...grades]
        .sort((a, b) => b.minScorePercentage - a.minScorePercentage)
        .find(grade => finalScorePercentage >= grade.minScorePercentage);

    const resultMessage = finalGrade ? finalGrade.message : "Quiz complete!";

    // 3. Format the score output based on configuration
    const formattedScore = displayAsPercentage
        ? `${Math.round(finalScorePercentage * 100)}%`
        : `${score} / ${maxScore}`;

    return (
        <div className="text-center p-6 bg-white/50 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
                Quiz Completed
            </h3>

            {/* Dynamic Score Display */}
            <div className="text-4xl font-black text-slate-800 tracking-tight mb-4">
                {formattedScore}
            </div>

            {/* Personalized Grade Message */}
            <p className="text-sm font-medium text-slate-600 italic max-w-sm mb-6">
                "{resultMessage}"
            </p>

            {/* Optional Retake Button */}
            {allowRetake && (
                <button
                    onClick={onRestart}
                    className="text-xs bg-slate-800 text-white px-4 py-2 rounded-lg font-mono hover:bg-slate-700 transition shadow-sm"
                >
                    Retake Quiz ↺
                </button>
            )}
        </div>
    );
}