import bookData from '../content/data/books.json';
import { Card } from './core/Card.jsx';
import FilterableGallery from "./core/FilterableGallery";
import themePresets from "../themeconfig/theme-presets";

// So I feel like the book tracker should come with special sectioning by TBR, Read, and Currently reading.
// As well as by genre
// You should also be able to customise things like: do you want to show a star rating, custom star images, among other things.
// Thats just an idea for now though.

/**
 * A tagged, filterable Book Tracker to show what you have and will be reading.
 * @param title                 OPTIONAL - the title of your book tracker section
 * @param rows                  OPTIONAL - Number of rows to display per page (default: 2)
 * @param cols                  OPTIONAL - Number of columns in the grid (default: 2)
 * @param themePreset           OPTIONAL - The name of the theme you want to apply to this component
 * @returns {React.JSX.Element} The BookTracker element
 * @constructor
 */
export default function BookTracker({title = "Currently Reading...", rows = 2, cols = 2, themePreset="glassmorphic"}) {
    // Get the information for each book
    // I'm wondering if this is a suboptimal place to do this, since wont this technically load all of the book information before rendering?
    // I guess its fine as long as you don't have thousands of books in the file.
    const books = bookData.map(b => ({ ...b, tags: [b.status, ...(b.genres || [])].filter(Boolean) }));

    // Get theme information
    const styles = themePresets[themePreset];

    return (
        <section className={"space-y-6 p-2 " + styles?.wrapper}>
            <div className="border-b border-theme-border/60 pb-2">
                <h2 className="text-xl font-semibold tracking-tight text-theme-text">{title}</h2>
            </div>
            <FilterableGallery
                items={books}
                rows={rows}
                cols={cols}
                styles={styles}
                renderItem={(book) => (
                    <Card className={styles?.card + " " + book.styles?.card}>
                        <Card.Image src={book.coverUrl} className="w-16 h-24" />
                        <Card.Content>
                            <Card.Header
                                title={book.title}
                                titleClassName={book.styles?.title}
                                subtitle={book.author}
                                subtitleClassName={book.styles?.subtitle}
                            />
                            <Card.Body className = {styles?.text + " " + book.styles?.body}>{book.review}</Card.Body>
                        </Card.Content>
                        <Card.Action to={`/book/${book.id}`}>
                            Read full review
                        </Card.Action>
                    </Card>
                )}
            />
        </section>
    );
}