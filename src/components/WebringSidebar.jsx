// src/components/widgets/WebringSidebar.jsx
import { useState } from 'react';
import webringData from '../content/data/webring.json';
import DevDataInspector from './dev/DevDataInspector';

export default function WebringSidebar({ variant = 'lofi' }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // --- DEFENSIVE CHECKS ---
    if (!webringData) {
        return <div className="p-4 bg-red-100 text-red-800">Error: webringData is undefined</div>;
    }

    if (!Array.isArray(webringData)) {
        return <div className="p-4 bg-amber-100 text-amber-800">Error: webring.json must be an array, but got an object.</div>;
    }

    if (webringData.length === 0) {
        return <div className="p-4 border-2 border-dashed border-gray-300 text-gray-500">Webring is empty. Add sites to webring.json.</div>;
    }

    // --- Core Logic ---
    const currentSite = webringData[currentIndex];

    const nextSite = () => {
        setCurrentIndex((prev) => (prev + 1) % webringData.length);
    };

    const prevSite = () => {
        setCurrentIndex((prev) => (prev - 1 + webringData.length) % webringData.length);
    };

    const randomSite = () => {
        const randomIndex = Math.floor(Math.random() * webringData.length);
        setCurrentIndex(randomIndex);
    };

    // --- Variant 1: Lo-Fi Web Index (Calming & Soft) ---
    if (variant === 'lofi') {
        return (
            <>
            <DevDataInspector data={webringData} label="Webring JSON" />
            <div className="bg-[#f8fcf9] border border-[#e2ebe4] p-5 rounded-2xl shadow-sm text-slate-700 transition-all duration-500">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold tracking-widest text-[#8a9a86] uppercase">Webring</span>
                    <span className="text-lg">{currentSite.tag}</span>
                </div>

                <h4 className="font-bold text-lg mb-1 text-[#4a5759]">{currentSite.name}</h4>
                <p className="text-sm text-[#6b7b7d] mb-4 min-h-[40px] leading-relaxed">
                    {currentSite.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#e2ebe4]">
                    <div className="flex gap-1">
                        <button onClick={prevSite} className="p-1.5 text-[#8a9a86] hover:bg-[#e2ebe4] rounded-lg transition-colors">&larr;</button>
                        <button onClick={randomSite} className="p-1.5 text-[#8a9a86] hover:bg-[#e2ebe4] rounded-lg transition-colors">⟳</button>
                        <button onClick={nextSite} className="p-1.5 text-[#8a9a86] hover:bg-[#e2ebe4] rounded-lg transition-colors">&rarr;</button>
                    </div>
                    <a
                        href={currentSite.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium bg-white border border-[#d8e2dc] px-3 py-1.5 rounded-full hover:shadow-sm hover:border-[#b5c7bc] transition-all text-[#4a5759]"
                    >
                        Visit
                    </a>
                </div>
            </div>
            </>
        );
    }

    // --- Variant 2: Retro Desktop (Sharp & Utilitarian) ---
    if (variant === 'retro') {
        return (
            <>
            <DevDataInspector data={webringData} label="Webring JSON" />
            <div className="bg-zinc-200 border-2 border-zinc-50 border-r-zinc-500 border-b-zinc-500 p-1 font-mono text-xs text-black">
                <div className="bg-purple-400 text-white px-2 py-0.5 font-bold flex justify-between items-center">
                    <span>Webring.exe</span>
                    <span className="bg-zinc-300 text-black px-1 border border-zinc-500 border-r-black border-b-black font-bold leading-none cursor-pointer">x</span>
                </div>
                <div className="p-3 bg-white mt-1 border-2 border-zinc-500 border-r-zinc-50 border-b-zinc-50">
                    <p className="font-bold mb-1">{currentSite.name}</p>
                    <p className="text-zinc-600 truncate">{currentSite.url}</p>
                </div>
                <div className="flex gap-1 mt-2 px-1 pb-1">
                    <button onClick={prevSite} className="flex-1 bg-zinc-200 border-2 border-zinc-50 border-r-zinc-500 border-b-zinc-500 active:border-zinc-500 active:border-r-zinc-50 active:border-b-zinc-50">&lt; Prev</button>
                    <a href={currentSite.url} target="_blank" rel="noreferrer" className="flex-1 bg-zinc-200 border-2 border-zinc-50 border-r-zinc-500 border-b-zinc-500 text-center block leading-loose active:border-zinc-500 active:border-r-zinc-50 active:border-b-zinc-50">Go</a>
                    <button onClick={nextSite} className="flex-1 bg-zinc-200 border-2 border-zinc-50 border-r-zinc-500 border-b-zinc-500 active:border-zinc-500 active:border-r-zinc-50 active:border-b-zinc-50">Next &gt;</button>
                </div>
            </div>
            </>
        );
    }

    // --- Variant 3: Decentralized Badges (Grid Pattern) ---
    if (variant === 'badges') {
        return (
            <div>
                <DevDataInspector data={webringData} label="Webring JSON" />
            <div className="flex flex-wrap gap-2 p-2">
                {webringData.map(site => (
                    <a
                        key={site.id}
                        href={site.url}
                        target="_blank"
                        rel="noreferrer"
                        title={`${site.name}: ${site.description}`}
                        className="flex items-center justify-center w-[88px] h-[31px] bg-(--theme-surface) border border-(--theme-border) text-xs hover:border-(--theme-primary) hover:bg-(--theme-primary)/10 transition-colors cursor-pointer opacity-80 hover:opacity-100"
                    >
                        {site.tag} {site.name.substring(0, 6)}...
                    </a>
                ))}
            </div>
                </div>
        );
    }

    // Safety fallback just in case a typo is made in the JSON
    return <p className="text-sm text-red-500">Invalid webring variant selected.</p>;
}