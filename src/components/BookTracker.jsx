// src/components/BookTracker.jsx
import bookData from '../content/books.json';
import { Card } from './core/BaseCard';
import FilterableGallery from './core/FilterableGallery';

export default function BookTracker() {
    // 1. Data Preparation: Combine status and genres so FilterableGallery can use them
    const booksWithTags = bookData.map(book => ({
        ...book,
        // Create a new 'tags' array merging the status and any existing genres
        tags: [book.status, ...(book.genres || [])].filter(Boolean)
    }));

    // 2. Helper function to color-code our badges based on reading status
    const getBadgeVariant = (status) => {
        switch(status?.toLowerCase()) {
            case 'reading': return 'success';
            case 'completed': return 'primary';
            case 'paused': return 'default';
            default: return 'default';
        }
    };

    return (
        <FilterableGallery
            title="Digital Library"
            items={booksWithTags}
            itemsPerPage={6} // Books are usually smaller cards, so we can show more per page
            emptyMessage="No books found in this category."
            viewAllTo="/library"
            viewAllText="Explore my full library"
            renderItem={(book) => (
                <Card key={book.id}>
                    {/* Assuming you have a coverUrl in your JSON */}
                    <Card.Image src={book.coverUrl} alt={`Cover of ${book.title}`} className="w-16 h-24 rounded-sm" />

                    <Card.Content>
                        <Card.Header
                            title={book.title}
                            subtitle={book.author}
                            rightSlot={
                                book.status && (
                                    <Card.Badge variant={getBadgeVariant(book.status)}>
                                        {book.status}
                                    </Card.Badge>
                                )
                            }
                        />

                        {book.review && (
                            <Card.Body className="italic line-clamp-3">
                                "{book.review}"
                            </Card.Body>
                        )}

                        {book.slug && (
                            <Card.Action to={`/library/${book.slug}`}>
                                Read my notes
                            </Card.Action>
                        )}
                    </Card.Content>
                </Card>
            )}
        />
    );
}