import bookData from '../content/books.json';
import { Card } from './core/BaseCard';
import FilterableCardGallery from "./core/FilterableCardGallery.jsx";

// So I feel like the book tracker should come with special sectioning by TBR, Read, and Currently reading.
// As well as by genre
// You should also be able to customise things like: do you want to show a star rating, custom star images, the title of the gallery element, among other things.
// Thats just an idea for now though.

/**
 * A tagged, filterable Book Tracker to show what you have and will be reading.
 * @param title                 OPTIONAL - the title of your book tracker section
 * @param cardStyles            OPTIONAL - The styling you want to apply to all the book cards
 * @param rows                  OPTIONAL - Number of rows to display per page (default: 2)
 * @param cols                  OPTIONAL - Number of columns in the grid (default: 2)
 * @returns {React.JSX.Element} The BookTracker element
 * @constructor
 */
export default function BookTracker({title = "Currently Reading...", cardStyles, rows = 2, cols = 2}) {
    const books = bookData.map(b => ({ ...b, tags: [b.status, ...(b.genres || [])].filter(Boolean) }));

    return (
        <section className="space-y-6">
            <div className="border-b border-theme-border/60 pb-2">
                <h2 className="text-xl font-semibold tracking-tight text-theme-text">{title}</h2>
            </div>
            <FilterableCardGallery
                items={books}
                rows={rows}
                cols={cols}
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
        </section>
    );
}