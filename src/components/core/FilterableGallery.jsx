import {useFilteredPagination} from "../../hooks/useFilteredPagination.js";

// PLANNED FUTURE FEATURES AND IDEAS: Sort by.
// 2.turn this items object into two - one for the actual items and the other for the tags to display in the bar and filter by.
// You might not want to be able to filter by every single tag.
// 3. Sort by

// You should also be able to pass custom styling into this function.

/*
The function of this is to provide a filterable, paginated, and one day sortable grid of tagged objects.
The tag filtering is intended to become an optional functionality of this. I'm wondering if it can be used to create a gallery with multiple folders?
Right now it is being used only by FilterableCardGallery, but it will be extended by ImageGallery in future to display a gallery of image tiles rather than cards
*/

/**
 * This takes all of your items and item card styling to show, some settings, and
 * @param items                 The set of item cards you want to display
 * @param rows                  The number of rows of items you want to show per page Default is 2
 * @param cols                  The number of columns of items you want to show per page Default is 2
 * @param emptyMessage          The message you want to show when there are no cards to display. Defaults to No items found
 * @param themePreset           Theme preset to use
 * @param renderItem            How you want your item to look like
 * @returns {React.JSX.Element} The FilterableGallery element
 * @constructor
 */
export default function FilterableGallery({
                                              items = [],
                                              rows = 2,
                                              cols = 2,
                                              emptyMessage = "No items found.",
                                              renderItem,
                                              themePreset = "default"
                                              }) {
    // This handles all of the filtering and pagination logic and all of the yucky react stuff
    const {
        activeTags,
        allTags,
        visibleItems,
        currentPage,
        totalPages,
        toggleTag,
        clearFilters,
        goToNextPage,
        goToPrevPage
    } = useFilteredPagination(items, rows * cols);

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
            {/* 1. Tag Filter Bar */}
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
                                        ? 'bg-(--theme-secondary)/20 border-(--theme-secondary)/40 text-(--theme-primary) shadow-sm'
                                        : 'bg-(--theme-surface)/50 border-(--theme-border)/60 text-(--theme-text) opacity-70 hover:opacity-100 hover:bg-(--theme-surface)'
                                }`}
                            >
                                #{tag}
                            </button>
                        );
                    })}

                    {activeTags.length > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-xs px-3 py-1.5 text-(--theme-text) opacity-60 hover:text-(--theme-primary) hover:opacity-100 transition-colors"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            )}

            {/* 2. The Grid */}
            <div className={`grid ${gridColsClass} gap-4`}>
                {visibleItems.map((item, index) => renderItem(item, index))}

                {visibleItems.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-(--theme-surface)/40 rounded-2xl border border-dashed border-(--theme-border)">
                        <p className="text-(--theme-primary) text-sm">{emptyMessage}</p>
                    </div>
                )}
            </div>

            {/* 3. Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-(--theme-border)/40">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-(--theme-text) bg-(--theme-surface)/50 border border-(--theme-border)/60 hover:bg-(--theme-surface) transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        &larr; Previous
                    </button>

                    <span className="text-sm font-medium text-(--theme-text) opacity-60">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-(--theme-text) bg-(--theme-surface)/50 border border-(--theme-border)/60 hover:bg-(--theme-surface) transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next &rarr;
                    </button>
                </div>
            )}
        </section>
    );
}