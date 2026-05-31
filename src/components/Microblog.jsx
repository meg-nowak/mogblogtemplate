// src/components/Microblog.jsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// Define how many posts to show per page
const ITEMS_PER_PAGE = 3;

export default function Microblog() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Dynamically grab all markdown files in the posts folder
        const modules = import.meta.glob('/src/posts/*.md', { query: '?raw', eager: true });

        const loadedPosts = Object.entries(modules).map(([filepath, content]) => {
            const filename = filepath.split('/').pop() || '';
            const dateStr = filename.replace('.md', '');

            return {
                date: dateStr,
                content: typeof content === 'string' ? content : content.default || '',
            };
        });

        // Sort posts by date (newest first)
        loadedPosts.sort((a, b) => b.date.localeCompare(a.date));
        setPosts(loadedPosts);
    }, []);

    // Pagination calculations
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    // Slice the array to get only the current page's posts
    const visiblePosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <section className="space-y-8">
            <div className="border-b-2 border-pastel-blue/30 pb-3">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-700">Thoughts & Updates</h2>
            </div>

            {posts.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No posts found yet.</p>
            ) : (
                <div className="space-y-6">
                    {visiblePosts.map((post) => (
                        <article
                            key={post.date}
                            className="bg-white/60 backdrop-blur-sm border border-pastel-purple/40 p-6 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:-translate-y-1"
                        >
                            <time className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                                <span className="w-2 h-2 rounded-full bg-pastel-green"></span>
                                {post.date}
                            </time>

                            <div className="mt-4 prose prose-slate prose-p:leading-relaxed prose-a:text-slate-400 hover:prose-a:text-slate-600 prose-a:transition-colors max-w-none text-slate-600 text-sm">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-slate-600 bg-white/50 border border-slate-200 hover:bg-white transition-all disabled:opacity-40 disabled:hover:bg-white/50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        &larr; Newer
                    </button>

                    <span className="text-sm font-medium text-slate-400">
            Page {currentPage} of {totalPages}
          </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="text-sm px-4 py-2 rounded-xl font-medium text-slate-600 bg-white/50 border border-slate-200 hover:bg-white transition-all disabled:opacity-40 disabled:hover:bg-white/50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Older &rarr;
                    </button>
                </div>
            )}
        </section>
    );
}