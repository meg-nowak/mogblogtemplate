// src/core/components/PaginatedFeed.jsx
import { useState } from 'react';

/**
 *
 * @param title                 The title of your feed
 * @param items                 The items to put in your feed
 * @param itemsPerPage          The number of items to display per page
 * @param emptyMessage          The message to put when there are no items to display
 * @param renderItem            The item rendering function
 * @param feedStyles            The custom styling to apply to each post in your feed
 * @returns {React.JSX.Element} The Paginated Feed element
 * @constructor
 */
export default function PaginatedFeed({
                                          title,
                                          items = [],
                                          itemsPerPage = 3,
                                          emptyMessage = "No items found.",
                                          renderItem,
                                          feedStyles = {}
                                      }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className={`space-y-8 ${feedStyles?.container || ""}`}>
            {title && (
                <div className={`border-b-2 pb-3 ${feedStyles?.headerBorder || "border-pastel-blue/30"}`}>
                    <h2 className={`text-2xl font-semibold tracking-tight ${feedStyles?.title || "text-slate-700"}`}>
                        {title}
                    </h2>
                </div>
            )}

            {items.length === 0 ? (
                <p className={`text-sm italic ${feedStyles?.emptyText || "text-slate-400"}`}>
                    {emptyMessage}
                </p>
            ) : (
                <div className="space-y-6">
                    {visibleItems.map((item, index) => renderItem(item, index))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`text-sm px-4 py-2 rounded-xl font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${feedStyles?.button || "text-slate-600 bg-white/50 border border-slate-200 hover:bg-white disabled:hover:bg-white/50"}`}
                    >
                        &larr; Newer
                    </button>

                    <span className="text-sm font-medium text-slate-400">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`text-sm px-4 py-2 rounded-xl font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${feedStyles?.button || "text-slate-600 bg-white/50 border border-slate-200 hover:bg-white disabled:hover:bg-white/50"}`}
                    >
                        Older &rarr;
                    </button>
                </div>
            )}
        </section>
    );
}