// src/components/FilterableGallery.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function FilterableGallery({
                                              title,
                                              items = [],
                                              itemsPerPage = 6,
                                              emptyMessage = "No items found.",
                                              renderItem,
                                              viewAllTo, // The route path (e.g., '/library')
                                              viewAllText = "View all" // Default text if none is provided
                                              }) {
    const [activeTags, setActiveTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Extract all unique tags dynamically from whatever items are passed in
    const allTags = useMemo(() => {
        const tags = new Set();
        items.forEach(item => {
            // Failsafe in case an item doesn't have a tags array
            if (Array.isArray(item.tags)) {
                item.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }, [items]);

    // 2. State Handlers
    const toggleTag = (tag) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setActiveTags([]);
        setCurrentPage(1);
    };

    // 3. Math & Slicing
    const filteredItems = items.filter(item => {
        if (activeTags.length === 0) return true;
        const itemTags = item.tags || [];
        return itemTags.some(tag => activeTags.includes(tag));
    });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="space-y-6">
            {title && (
                <div className="border-b-2 border-theme-secondary/30 pb-3 flex justify-between items-end">
                    <h2 className="text-2xl font-semibold tracking-tight text-theme-text">{title}</h2>
                </div>
            )}

            {/* Tag Filter Bar */}
            {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => {
                        const isActive = activeTags.includes(tag);
                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 border ${
                                    isActive
                                        ? 'bg-theme-secondary/20 border-theme-secondary/40 text-theme-primary shadow-sm'
                                        : 'bg-theme-surface/50 border-theme-border/60 text-slate-500 hover:bg-theme-surface'
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
            )}

            {/* The Grid - Notice how it calls the renderItem function! */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visibleItems.map((item, index) => renderItem(item, index))}

                {filteredItems.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-theme-surface/40 rounded-2xl border border-dashed border-theme-border">
                        <p className="text-slate-500 text-sm">{emptyMessage}</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-theme-border/40">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-slate-600 bg-theme-surface/50 border border-theme-border/60 hover:bg-theme-surface transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        &larr; Previous
                    </button>

                    <span className="text-sm font-medium text-slate-400">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-slate-600 bg-theme-surface/50 border border-theme-border/60 hover:bg-theme-surface transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next &rarr;
                    </button>
                </div>
            )}

            {/* Optional "View All" Link */}
            {viewAllTo && (
                <div className="mt-6 pt-2 text-center">
                    <Link
                        to={viewAllTo}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-theme-primary hover:opacity-80 transition-opacity group/link"
                    >
                        {viewAllText}
                        <span className="transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </div>
            )}
        </section>
    );
}