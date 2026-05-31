// src/components/MicroblogPost.jsx
import ReactMarkdown from 'react-markdown';

// TODO: Enable some more customisation freedom on this
export default function MicroblogPost({ post }) {
    return (
        <article className="bg-theme-surface/60 border p-6 rounded-3xl shadow-sm transition-all hover:shadow-md">

            {/* Header: Date and conditional Author info */}
            <div className="flex justify-between items-center mb-4">
                <time className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                    {new Date(post.date).toLocaleDateString()}
                </time>

                {post.sourceType === 'bluesky' && post.author && (
                    <a href={`https://bsky.app/profile/${post.author.handle}`} className="flex items-center gap-2">
                        <img src={post.author.avatar} alt="" className="w-5 h-5 rounded-full" />
                        <span className="text-xs text-slate-500">{post.author.name}</span>
                    </a>
                )}
            </div>

            {/* Content: Conditionally parse Markdown or render plain text */}
            <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                {post.contentFormat === 'markdown' ? (
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                ) : (
                    <p className="whitespace-pre-wrap">{post.content}</p>
                )}
            </div>

            {/* Footer: Conditional external link */}
            {post.url && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                    <a href={post.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                        View original on {post.sourceType} &rarr;
                    </a>
                </div>
            )}
        </article>
    );
}