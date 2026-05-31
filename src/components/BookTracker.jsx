import { Link } from 'react-router-dom';
import bookData from '../content/books.json';


export default function BookTracker({ showLibraryLink = false }) {
    // Filter books by their status
    const currentlyReading = bookData.filter(book => book.status === 'reading');
    const upNext = bookData.filter(book => book.status === 'tbr');
    const recentlyRead = bookData.filter(book => book.status === 'read');

    // A reusable mini-component for rendering a single book card
    const BookCard = ({ book, badgeColor, badgeText }) => (
        <div className="bg-white/60 backdrop-blur-sm border border-pastel-purple/40 p-5 pl-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:-translate-y-1 relative overflow-hidden group">

            {/* Decorative colored spine on the left edge */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${badgeColor} opacity-70 group-hover:opacity-100 transition-opacity`}></div>

            <div className="flex gap-4">
                {/* Optional Cover Image */}
                {book.coverUrl && (
                    <div className="shrink-0">
                        <img
                            src={book.coverUrl}
                            alt={`Cover of ${book.title}`}
                            className="w-16 h-24 object-cover rounded-md shadow-sm border border-slate-100 bg-slate-50"
                        />
                    </div>
                )}

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-theme-text leading-tight truncate pr-2">{book.title}</h3>
                        <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 shrink-0 mt-0.5`}>
              {badgeText}
            </span>
                    </div>

                    <p className="text-sm text-slate-500 font-medium mb-2 truncate">by {book.author}</p>

                    {/* Optional Caption */}
                    {book.caption && (
                        <div className="mt-3 pt-3 border-t border-slate-100/60">
                            <p className="text-sm text-slate-600 leading-relaxed italic line-clamp-3">
                                "{book.caption}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <section className="space-y-8">
            <div className="border-b-2 border-pastel-blue/30 pb-3 flex justify-between items-end">
                <h2 className="text-2xl font-semibold tracking-tight text-theme-text">Reading Shelf</h2>
            </div>

            <div className="space-y-8">
                {/* Currently Reading Section */}
                {currentlyReading.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pastel-green-600 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-pastel-green"></span>
                            Currently Reading
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentlyReading.map(book => (
                                <BookCard key={book.id} book={book} badgeColor="bg-pastel-green" badgeText="Reading" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Up Next (TBR) Section */}
                {upNext.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pastel-blue-600 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-pastel-blue"></span>
                            Up Next
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {upNext.map(book => (
                                <BookCard key={book.id} book={book} badgeColor="bg-pastel-blue" badgeText="TBR" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recently Read Section */}
                {recentlyRead.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pastel-purple-600 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-pastel-purple"></span>
                            Recently Read
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recentlyRead.map(book => (
                                <BookCard key={book.id} book={book} badgeColor="bg-pastel-purple" badgeText="Done" />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Optional Internal Link to the Full Library */}
            {showLibraryLink && (
                <div className="pt-2 flex justify-end">
                    <Link
                        to="/library"
                        className="text-sm font-medium text-theme-text hover:text-indigo-500 transition-colors flex items-center gap-1.5 group"
                    >
                        Browse Full Library
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                    </Link>
                </div>
            )}
        </section>
    );
}