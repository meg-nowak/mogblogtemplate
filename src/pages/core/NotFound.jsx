// THIS IS ALL PLACEHOLDER CODE
import { useState, useMemo } from 'react';
import bookData from '../../content/data/books.json';

const ITEMS_PER_PAGE = 6;

export default function Library() {
    const [activeStatus, setActiveStatus] = useState('all'); // 'all', 'reading', 'tbr', 'read'
    const [activeTags, setActiveTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Automatically generate unique tags from the JSON
    const allTags = useMemo(() => {
        const tags = new Set();
        bookData.forEach(book => book.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, []);

    // Helper for status badge styling
    const getStatusConfig = (status) => {
        switch(status) {
            case 'reading': return { color: 'bg-pastel-green', text: 'Reading', border: 'border-green-200', textClass: 'text-green-700' };
            case 'tbr': return { color: 'bg-pastel-blue', text: 'TBR', border: 'border-blue-200', textClass: 'text-blue-700' };
            case 'read': return { color: 'bg-pastel-purple', text: 'Done', border: 'border-purple-200', textClass: 'text-purple-700' };
            default: return { color: 'bg-slate-200', text: 'Unknown' };
        }
    };

    // Interaction Handlers
    const toggleTag = (tag) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
        setCurrentPage(1);
    };

    const changeStatus = (status) => {
        setActiveStatus(status);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setActiveTags([]);
        setActiveStatus('all');
        setCurrentPage(1);
    };

    // 1. Filter by Status AND Tags
    const filteredBooks = bookData.filter(book => {
        // Check Status
        if (activeStatus !== 'all' && book.status !== activeStatus) return false;

        // Check Tags
        if (activeTags.length > 0) {
            const bookTags = book.tags || [];
            const hasSelectedTags = activeTags.some(tag => bookTags.includes(tag));
            if (!hasSelectedTags) return false;
        }

        return true;
    });

    // 2. Pagination Math
    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Page Header */}
            <div className="border-b-2 border-pastel-blue/30 pb-4">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">My Library</h1>
                <p className="text-slate-500 mt-2">A collection of things I've read, am reading, or want to read.</p>
            </div>

            {/* Filter Controls */}
            <div className="bg-white/40 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 space-y-5 shadow-sm">

                {/* Status Filter */}
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2">Status:</span>
                    {['all', 'reading', 'tbr', 'read'].map(status => (
                        <button
                            key={status}
                            onClick={() => changeStatus(status)}
                            className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all ${
                                activeStatus === status
                                    ? 'bg-slate-700 text-white shadow-md'
                                    : 'bg-white/60 text-slate-600 hover:bg-white border border-slate-200'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tag Filter */}
                <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-slate-200/50">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2">Topics:</span>
                    {allTags.map(tag => {
                        const isActive = activeTags.includes(tag);
                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all border ${
                                    isActive
                                        ? 'bg-pastel-blue border-blue-200 text-blue-700 shadow-sm'
                                        : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white'
                                }`}
                            >
                                #{tag}
                            </button>
                        );
                    })}
                </div>

                {/* Clear Filters Button */}
                {(activeTags.length > 0 || activeStatus !== 'all') && (
                    <div className="pt-2">
                        <button onClick={clearFilters} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                            &times; Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleBooks.map((book) => {
                    const statusConf = getStatusConfig(book.status);
                    return (
                        <div key={book.id} className="bg-white/70 backdrop-blur-sm border border-slate-200/60 p-5 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden group flex gap-5">

                            {/* Left Color Spine */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusConf.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>

                            {/* Cover Image */}
                            <div className="shrink-0 ml-1">
                                {book.coverUrl ? (
                                    <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="w-20 h-32 object-cover rounded-md shadow-sm border border-slate-100 bg-slate-50" />
                                ) : (
                                    <div className="w-20 h-32 rounded-md shadow-sm border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest rotate-90">No Cover</span>
                                    </div>
                                )}
                            </div>

                            {/* Book Details */}
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div className="flex justify-between items-start gap-2 mb-1">
                                    <h3 className="font-semibold text-slate-800 leading-snug">{book.title}</h3>
                                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border shrink-0 ${statusConf.color} ${statusConf.border} ${statusConf.textClass} bg-opacity-30`}>
                    {statusConf.text}
                  </span>
                                </div>

                                <p className="text-sm text-slate-500 font-medium mb-3">by {book.author}</p>

                                {book.caption && (
                                    <p className="text-sm text-slate-600 leading-relaxed italic line-clamp-2 mb-3 flex-grow">
                                        "{book.caption}"
                                    </p>
                                )}

                                {/* Tags */}
                                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                                    {book.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 && (
                <div className="p-12 text-center bg-white/40 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500">No books found matching these filters.</p>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
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
        </div>
    );
}