// src/components/Microblog.jsx
import { useState, useEffect } from 'react';
import MicroblogPost from '../core/MicroblogPost.jsx';
import { adaptInternalPost } from '../../utils/adapters.js';
import FilterableGallery from "../core/FilterableGallery.jsx";

/**
 * A Microblog feed
 * @param title                 OPTIONAL a title for your microblog section
 * @param itemsPerPage          OPTIONAL The number of posts to display per page
 * @returns {React.JSX.Element} The Microblog element
 * @constructor
 */
export default function Microblog({
                                      title = "Whats on my mind",
                                      itemsPerPage = 5,
                                  }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchAllPosts() {
            // 1. Fetch Internal Posts
            const modules = import.meta.glob('/src/content/posts/*.md', { query: '?raw', eager: true });
            const internalPosts = Object.entries(modules).map(([filepath, content]) => {
                const raw = typeof content === 'string' ? content : content.default;
                return adaptInternalPost(filepath, raw);
            });

            // 3. Merge and Sort
            const allPosts = [...internalPosts].sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );

            setPosts(allPosts);
        }

        fetchAllPosts();
    }, []);

    return (
        <section className="space-y-6 p-2 ">
            <div className="border-b border-theme-border/60 pb-2">
                <h2 className="text-xl font-semibold tracking-tight text-theme-text">{title}</h2>
            </div>
        <FilterableGallery
            rows={itemsPerPage}
            cols={1}
            items={posts}
            renderItem={(post) => <MicroblogPost key={post.id} post={post} />}
            emptyMessage={"No posts yet"}
        />
        </section>
    );
}