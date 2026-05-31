// src/components/Microblog.jsx
import { useState, useEffect } from 'react';
import PaginatedFeed from './core/PaginatedFeed';
import MicroblogPost from './core/MicroblogPost';
import { adaptInternalPost } from '../utils/adapters';

/**
 * A Microblog feed
 * @param title                 OPTIONAL The title of your microblog feed. Default is Thoughts & Updates
 * @param itemsPerPage          OPTIONAL The number of posts to display per page
 * @param feedStyles            OPTIONAL Custom styling for each post in your feed
 * @returns {React.JSX.Element} The Microblog element
 * @constructor
 */
export default function Microblog({
                                      title = "Thoughts & Updates",
                                      itemsPerPage = 3,
                                      feedStyles = {} // Accepts layout config from your JSON!
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
        <PaginatedFeed
            title={title}
            itemsPerPage={itemsPerPage}
            feedStyles={feedStyles}
            items={posts}
            renderItem={(post) => <MicroblogPost key={post.id} post={post} />}
            emptyMessage={"No posts yet"}
        />
    );
}