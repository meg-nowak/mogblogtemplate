import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// PLANNED FUTURE FEATURES AND IDEAS: Sort by.
// 1. turn viewAllTo and viewAllText into one object with multiple fields for this, it can be one object in the config json file
// 2.turn this items object into two - one for the actual items and the other for the tags to display in the bar and filter by.
// You might not want to be able to filter by every single tag.
// 3. Sort by



/*
The function of this is to provide a filterable, paginated, and one day sortable grid of tagged objects.
The tag filtering is intended to become an optional functionality of this. I'm wondering if it can be used to create a gallery with multiple folders?
Right now it is being used only by FilterableCardGallery, but it will be extended by ImageGallery in future to display a gallery of image tiles rather than cards
*/

/**
 * This takes all of your items and item card styling to show, some settings, and
 * @param title                 The title of your gallery
 * @param items                 The set of item cards you want to display
 * @param rows                  The number of rows of items you want to show per page Default is 2
 * @param cols                  The number of columns of items you want to show per page Default is 2
 * @param emptyMessage          The message you want to show when there are no cards to display. Defaults to No items found
 * @param renderItem            How you want your item to look like
 * @param viewAllTo             The link to your view all/more page. Formatted as route path (see below)
 * @param viewAllText           The text you want on the view all link. Defaults to View all
 * @returns {React.JSX.Element} The FilterableGallery element
 * @constructor
 */
export default function FilterableGallery({
                                              title,
                                              items = [],
                                              rows = 2,
                                              cols = 2,
                                              emptyMessage = "No items found.",
                                              renderItem,
                                              viewAllTo, // The route path (e.g., '/library')
                                              viewAllText = "View all" // Default text if none is provided
                                              }) {
    // React state shit
    const [activeTags, setActiveTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // HOT TAKE: Tags should be extracted further up or somewhere else.
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

    // React shit.
    // 2. State Handlers
    const toggleTag = (tag) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setActiveTags([]);
        setCurrentPage(1);
    };

    // Filter, paginate and one day sort maybe???
    // 3. Math & Slicing
    const filteredItems = items.filter(item => {
        if (activeTags.length === 0) return true;
        const itemTags = item.tags || [];
        return itemTags.some(tag => activeTags.includes(tag));
    });

    const itemsPerPage = rows * cols;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    // Tailwind Grid Lookup
    // This ensures Tailwind doesn't purge dynamic grid column classes.
    // It defaults to 1 column on mobile, and scales up on 'sm' screens.
    const gridColsClass = {
        1: 'sm:grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
        5: 'sm:grid-cols-5',
        6: 'sm:grid-cols-6',
    }[cols] || 'sm:grid-cols-2'; // Fallback if someone passes an unsupported number

    // BIG FKIN COMPONENT
    return (
        <section className="space-y-6">
            {/* Title of the Gallery */}
            {title && (
                <div className="border-b-2 border-theme-secondary/30 pb-3 flex justify-between items-end">
                    <h2 className="text-2xl font-semibold tracking-tight text-theme-text">{title}</h2>
                </div>
            )}

            {/* Tag Filter Bar - WEIRD LOGIC INCOMING!!! HARDCODED TEXT COLOUR ALERT!! */}
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
                            className="text-xs px-3 py-1.5 text-slate-400 hover:text-theme-primary transition-colors"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            )}

            {/* The GRID OF CARDS - visibleItems and their information get put on the grid and renderItem displays it */}
            <div className={`grid ${gridColsClass} gap-4`}>
                {visibleItems.map((item, index) => renderItem(item, index))}

                {/* HARDCODED TEXT COLOUR ALERT!! This is what shows up if there are no cards to show */}
                {filteredItems.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-theme-surface/40 rounded-2xl border border-dashed border-theme-border">
                        <p className="text-theme-primary text-sm">{emptyMessage}</p>
                    </div>
                )}
            </div>

            {/* Pagination controls - next/previous page links. Also HARDCODED TEXT COLOUR ALERT!!! */}
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