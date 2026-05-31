// src/components/BookTracker.jsx
import bookData from '../content/books.json';
import { Card } from './core/BaseCard';
import FilterableCardGallery from "./core/FilterableCardGallery.jsx";

export default function BookTracker({cardStyles}) {
    // 2. Helper function to color-code our badges based on reading status
    /* const getBadgeVariant = (status) => {
        switch(status?.toLowerCase()) {
            case 'reading': return 'success';
            case 'completed': return 'primary';
            case 'paused': return 'default';
            default: return 'default';
        }
    }; */

    const books = bookData.map(b => ({ ...b, tags: [b.status, ...(b.genres || [])].filter(Boolean) }));

    return (
        <FilterableCardGallery
            title="Digital Library"
            items={books}
            cardStyles={cardStyles}
            renderCardContent={(book, styles) => (
                <>
                    <Card.Image src={book.coverUrl} className="w-16 h-24" />
                    <Card.Content>
                        <Card.Header
                            title={book.title}
                            titleClassName={styles.title}
                            subtitle={book.author}
                        />
                        <Card.Body>{book.review}</Card.Body>
                    </Card.Content>
                </>
            )}
        />
    );
}