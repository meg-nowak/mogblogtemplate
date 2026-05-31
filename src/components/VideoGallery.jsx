import { useState, useMemo } from 'react';
import videoData from '../content/videos.json';

const ITEMS_PER_PAGE = 4;

export default function VideoGallery() {
    const [activeTags, setActiveTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Automatically generate a list of unique tags from the imported JSON
    const allTags = useMemo(() => {
        const tags = new Set();
        videoData.forEach(video => video.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, []); // Dependency array is empty because videoData is a static import

    // Toggle tags on and off
    const toggleTag = (tag) => {
        setActiveTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
        // Always reset to the first page when changing filters
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setActiveTags([]);
        setCurrentPage(1);
    };

    // 1. Filter the videos first
    const filteredVideos = videoData.filter(video => {
        if (activeTags.length === 0) return true;
        return video.tags?.some(tag => activeTags.includes(tag));
    });

    // 2. Calculate pagination details
    const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    // 3. Slice the array to get only the current page's videos
    const visibleVideos = filteredVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <section className="space-y-6">
            <div className="border-b-2 border-pastel-blue/30 pb-3 flex justify-between items-end">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-700">Video Bookmarks</h2>
            </div>

            {/* Tag Filter Bar */}
            <div className="flex flex-wrap gap-2">
                {allTags.map(tag => {
                    const isActive = activeTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 border ${
                                isActive
                                    ? 'bg-pastel-blue border-blue-200 text-blue-700 shadow-sm'
                                    : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white'
                            }`}
                        >
                            #{tag}
                        </button>
                    );
                })}

                {activeTags.length > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-xs px-3 py-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visibleVideos.map((video) => (
                    <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/60 backdrop-blur-sm border border-pastel-purple/40 p-5 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:-translate-y-1 group"
                    >
                        <h3 className="font-medium text-slate-800 group-hover:text-indigo-500 transition-colors">
                            {video.title}
                        </h3>

                        {video.comment && (
                            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                                {video.comment}
                            </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {video.tags?.map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                  {tag}
                </span>
                            ))}
                        </div>
                    </a>
                ))}

                {filteredVideos.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-white/40 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 text-sm">No videos found for these tags.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-slate-600 bg-white/50 border border-slate-200 hover:bg-white transition-all disabled:opacity-40 disabled:hover:bg-white/50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        &larr; Previous
                    </button>

                    <span className="text-sm font-medium text-slate-400">
            Page {currentPage} of {totalPages}
          </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-slate-600 bg-white/50 border border-slate-200 hover:bg-white transition-all disabled:opacity-40 disabled:hover:bg-white/50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Next &rarr;
                    </button>
                </div>
            )}
        </section>
    );
}