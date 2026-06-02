// src/hooks/useFilteredPagination.js
import { useState, useMemo } from 'react';

/**
 * A custom hook to handle tag-based filtering and pagination.
 * @param {Array} items - The full array of data objects (must contain a 'tags' array property).
 * @param {number} itemsPerPage - How many items to display per page.
 * @returns {Object} All state, derived data, and action handlers needed for the UI.
 */
export function useFilteredPagination(items = [], itemsPerPage = 4) {
    // --- 1. Core State ---
    const [activeTags, setActiveTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // --- 2. Derived Data (Memoized for performance) ---

    // Dynamically extract all unique tags from the raw items
    const allTags = useMemo(() => {
        const tags = new Set();
        items.forEach(item => {
            if (Array.isArray(item.tags)) {
                item.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }, [items]);

    // Filter items based on what tags are currently active
    const filteredItems = useMemo(() => {
        if (activeTags.length === 0) return items;

        return items.filter(item => {
            const itemTags = item.tags || [];
            // Returns true if the item has AT LEAST ONE of the active tags
            return itemTags.some(tag => activeTags.includes(tag));
        });
    }, [items, activeTags]);

    // --- 3. Pagination Math ---

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    // --- 4. Action Handlers ---

    const toggleTag = (tag) => {
        setActiveTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            }
            return [...prev, tag];
        });
        // CRITICAL: Always reset to page 1 when filters change,
        // otherwise you might be stranded on a page that no longer exists!
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setActiveTags([]);
        setCurrentPage(1);
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    // --- 5. Return the API ---
    return {
        // Data
        allTags,
        activeTags,
        visibleItems,

        // Pagination state
        currentPage,
        totalPages,

        // Actions
        toggleTag,
        clearFilters,
        goToNextPage,
        goToPrevPage
    };
}