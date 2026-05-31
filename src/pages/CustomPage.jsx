import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import pagesConfig from '../siteconfig/pages.json';

export default function CustomPage() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Find the page configuration from the JSON file
    const pageData = pagesConfig.find(p => p.slug === slug);

    useEffect(() => {
        if (!pageData) return;

        // Dynamically fetch the markdown file
        // Note: In Vite, we fetch raw files from the public/ folder or use import.meta.glob
        // For this template, we'll use import.meta.glob to bundle them automatically
        const loadContent = async () => {
            const modules = import.meta.glob('../content/pages/*.md', { query: '?raw', import: 'default' });
            const filePath = `../content/pages/${pageData.markdownFile}`;

            if (modules[filePath]) {
                const text = await modules[filePath]();
                setContent(text);
            } else {
                setContent('# Error\nMarkdown file not found.');
            }
            setIsLoading(false);
        };

        loadContent();
    }, [slug, pageData]);

    // If someone types a URL that isn't in pages.json, send them home
    if (!pageData) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="border-b-2 border-pastel-blue/30 pb-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">{pageData.title}</h1>
            </div>

            {isLoading ? (
                <div className="text-slate-400 italic">Loading content...</div>
            ) : (
                <div className="prose prose-slate prose-headings:text-slate-700 prose-a:text-indigo-500 hover:prose-a:text-indigo-600 max-w-none bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}