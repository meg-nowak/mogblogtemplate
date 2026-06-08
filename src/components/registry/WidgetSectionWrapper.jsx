// src/components/registry/WidgetSectionWrapper.jsx
import { Link } from 'react-router-dom';

export default function WidgetSectionWrapper({
                                                 title,
                                                 viewAllTo,
                                                 viewAllText = "View all",
                                                 children
                                             }) {
    // If there is no title and no viewAll link configured,
    // the wrapper becomes "invisible" and just renders the raw widget.
    if (!title && !viewAllTo) {
        return children;
    }

    return (
        <section className="space-y-6">
            {/* 1. Standardized Widget Header */}
            {title && (
                <div className="border-b-2 border-(--theme-secondary)/30 pb-3 flex justify-between items-end">
                    <h2 className="text-2xl font-semibold tracking-tight text-(--theme-text)">
                        {title}
                    </h2>
                </div>
            )}

            {/* 2. The Core Widget (FilterableGallery, BookTracker, etc.) */}
            <div>
                {children}
            </div>

            {/* 3. Standardized Routing Footer */}
            {viewAllTo && (
                <div className="mt-6 pt-2 text-center">
                    <Link
                        to={viewAllTo}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-(--theme-primary) hover:opacity-80 transition-opacity group/link"
                    >
                        {viewAllText}
                        <span className="transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </div>
            )}
        </section>
    );
}