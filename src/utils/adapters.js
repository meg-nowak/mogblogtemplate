// src/utils/adapters.js

export function adaptInternalPost(filepath, rawContent) {
    const filename = filepath.split('/').pop() || '';

    return {
        id: filepath,
        sourceType: 'internal',
        date: filename.replace('.md', ''), // Assuming filename is a date string
        content: rawContent,
        contentFormat: 'markdown',
        // Internal posts don't need URLs or Author data
        // since it's implied it's your own site!
    };
}

export function adaptBlueskyPost(bskyData) {
    return {
        id: bskyData.post.cid,
        sourceType: 'bluesky',
        author: {
            name: bskyData.post.author.displayName,
            handle: bskyData.post.author.handle,
            avatar: bskyData.post.author.avatar
        },
        date: bskyData.post.record.createdAt,
        content: bskyData.post.record.text,
        contentFormat: 'plaintext', // Bluesky doesn't use Markdown natively
        url: `https://bsky.app/profile/${bskyData.post.author.handle}/post/${bskyData.post.uri.split('/').pop()}`,
        metadata: {
            likes: bskyData.post.likeCount
        }
    };
}

