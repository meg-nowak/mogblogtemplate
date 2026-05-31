import { useParams, Link } from 'react-router-dom';

export default function GameDetail() {
    // Grab the "slug" variable from the URL path
    const { slug } = useParams();

    // Later on, you can use this slug to fetch specific Markdown files or JSON data
    // For now, we will just format the slug to look like a title
    const formattedTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <Link to="/" className="text-sm font-medium text-indigo-400 hover:text-indigo-500 transition-colors">
                    &larr; Back to Home
                </Link>
            </div>

            <header className="border-b-2 border-pastel-blue/30 pb-4">
                <h1 className="text-3xl font-bold tracking-tight text-slate-700">{formattedTitle}</h1>
                <p className="text-slate-400 mt-2">Screenshots and deeper thoughts coming soon.</p>
            </header>

            <div className="bg-white/60 backdrop-blur-sm border border-pastel-purple/40 p-8 rounded-3xl shadow-sm text-center">
                <p className="text-slate-500">This is a placeholder for your custom {formattedTitle} content.</p>
            </div>
        </div>
    );
}