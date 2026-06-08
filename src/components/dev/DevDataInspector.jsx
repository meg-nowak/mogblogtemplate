// src/components/dev/DevDataInspector.jsx
import { useState } from 'react';
import { useDraggable } from '../../hooks/useDraggable';

export default function DevDataInspector({ data, label }) {
    const [isOpen, setIsOpen] = useState(false);

    // Consume our reusable behavior!
    const { position, isDragging, handleMouseDown } = useDraggable({ x: 120, y: 120 });

    if (!import.meta.env.DEV) return null;

    return (
        <div>
            {/* Toggle Button */}
            <div className="absolute top-2 right-2 z-40">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded opacity-50 hover:opacity-100 transition-opacity font-mono"
                >
                    {isOpen ? 'Close' : 'Inspect'}
                </button>
            </div>

            {/* Floating Inspector Window */}
            {isOpen && (
                <div
                    className="fixed z-[100] bg-white border border-[#e2ebe4] rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden"
                    style={{ top: `${position.y}px`, left: `${position.x}px` }}
                >
                    {/* DRAG HANDLE */}
                    <div
                        className="bg-[#f8fcf9] border-b border-[#e2ebe4] p-3 flex justify-between items-center cursor-move select-none"
                        onMouseDown={handleMouseDown}
                    >
                        <h3 className="font-semibold text-xs text-[#4a5759] tracking-wide">
                            {label} {isDragging ? '✊' : '✋'}
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-xs text-[#8a9a86] hover:text-red-400">
                            Close
                        </button>
                    </div>

                    <pre className="bg-slate-50 p-4 overflow-auto max-h-[40vh] text-xs font-mono text-[#5a6a5c]">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}