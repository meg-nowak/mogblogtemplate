// src/pages/BookView.jsx
import { useParams, Link } from 'react-router-dom';
import bookData from '../content/books.json';
import AppImage from '../components/AppImage';

export default function BookView() {
    // 1. Grab the dynamic ID from the URL
    const { bookId } = useParams();

    // 2. Find the specific book in your data
    const book = bookData.find(b => b.id === bookId);

    // 3. Handle the case where someone types a bad URL
    if (!book) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-slate-700 mb-4">Book not found</h1>
                <Link to="/" className="text-theme-primary hover:underline">&larr; Back to Home</Link>
            </div>
        );
    }

    // 4. Render the specific book details
    return (
        <article className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 mb-8 inline-block">
                &larr; Back to Library
            </Link>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 shrink-0">
                    <AppImage src={book.coverUrl} aspect="aspect-[2/3]" rounded="rounded-xl" className="shadow-lg" />
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{book.title}</h1>
                        <p className="text-xl text-slate-500 mt-2">by {book.author}</p>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="whitespace-pre-wrap">{book.review}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}