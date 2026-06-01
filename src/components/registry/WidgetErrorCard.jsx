// src/components/registry/WidgetErrorCard.jsx
import { useState } from 'react';

export default function WidgetErrorCard({
                                            variant = 'warning', // 'warning' (amber) or 'danger' (red)
                                            icon = '⚠️',
                                            title,
                                            message,
                                            adviceTitle = '💡 Suggested Fixes:',
                                            adviceList = [],
                                            stackTrace = null
                                        }) {
    const [showDetails, setShowDetails] = useState(false);

    // Dynamic style mapping based on severity
    const styles = {
        warning: {
            container: 'border-amber-200 bg-amber-50/40 text-slate-700',
            header: 'text-amber-600',
            code: 'bg-amber-100 text-amber-800',
            adviceBox: 'bg-white/80 border-amber-200/60',
            adviceTitle: 'text-amber-800'
        },
        danger: {
            container: 'border-red-200 bg-red-50/40 text-slate-700',
            header: 'text-red-600',
            code: 'bg-red-100 text-red-800',
            adviceBox: 'bg-white/80 border-red-200/60',
            adviceTitle: 'text-red-800'
        }
    }[variant];

    return (
        <div className={`p-5 border-2 border-dashed rounded-2xl space-y-3 my-2 shadow-sm ${styles.container}`}>
            {/* Header Area */}
            <div className={`flex items-center gap-2 font-semibold ${styles.header}`}>
                <span className="text-lg">{icon}</span>
                <h3 className="leading-tight">{title}</h3>
            </div>

            {/* Descriptive Body Text */}
            <div className="text-sm leading-relaxed">
                {message}
            </div>

            {/* Actionable Advice Box */}
            {adviceList.length > 0 && (
                <div className={`p-3 rounded-xl border text-xs space-y-1.5 font-sans shadow-inner ${styles.adviceBox}`}>
                    <p className={`font-medium ${styles.adviceTitle}`}>{adviceTitle}</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-600 left-1">
                        {adviceList.map((advice, index) => (
                            <li key={index}>{advice}</li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Technical Stack Trace Collapse (Only renders if trace data is provided) */}
            {stackTrace && (
                <div className="pt-1">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 underline transition-colors focus:outline-none"
                    >
                        {showDetails ? "Hide technical trace ⬆️" : "Show technical trace ⬇️"}
                    </button>

                    {showDetails && (
                        <div className="mt-2 p-3 bg-slate-900 text-red-400 font-mono text-xs rounded-lg overflow-x-auto max-h-40 shadow-inner border border-slate-800 leading-normal">
                            {stackTrace}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}