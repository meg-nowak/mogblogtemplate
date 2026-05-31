import bookData from '../content/books.json';
import { Card } from './core/BaseCard';
import FilterableCardGallery from "./core/FilterableCardGallery.jsx";

// So I feel like the book tracker should come with special sectioning by TBR, Read, and Currently reading.
// As well as by genre
// You should also be able to customise things like: do you want to show a star rating, custom star images, the title of the gallery element, among other things.
// Thats just an idea for now though.

/**
 * A tagged, filterable Book Tracker to show what you have and will be reading.
 * @param cardStyles            OPTIONAL - The styling you want to apply to all the book cards
 * @returns {React.JSX.Element} The BookTracker element
 * @constructor
 */
export default function BookTracker({cardStyles}) {
    // What the fuck does this do????
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
                    <Card.Action to={`/book/${book.id}`}>
                        Read full review
                    </Card.Action>
                </>
            )}
        />
    );
}