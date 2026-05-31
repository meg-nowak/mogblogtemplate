import { Card } from './BaseCard';
import FilterableGallery from './FilterableGallery';

/*
This is an extension to the FilterableGallery that renders Cards and their styling into the renderItem parameter of the FilterableGallery
It just takes the styles and applies it as well as any item-specific styles to the card object
And passes that and any other custom gallery properties down to the filterable gallery object
I doubt this file will need to functionally change often
 */
/**
 * Renders item cards and optional styles in a filterable, paged card gallery
 * @param items                 The set of item cards you want to display
 * @param cardStyles            OPTIONAL extra styling for all cards in the gallery
 * @param renderCardContent     A function passed in to define the inner content
 * @param galleryProps          Passed down props to the FilterableGallery
 * @returns {React.JSX.Element} The FilterableCardGallery element
 * @constructor
 */
export default function FilterableCardGallery({
                                                  items,
                                                  cardStyles = {},
                                                  renderCardContent, // A function passed in to define the inner content
                                                  ...galleryProps
                                              }) {
    return (
        <FilterableGallery
            {...galleryProps}
            items={items}
            renderItem={(item) => (
                <Card
                    key={item.id}
                    className={[cardStyles?.card, item.styles?.card].filter(Boolean).join(' ')}
                >
                    {/* We pass the item and the cardStyles to the renderer */}
                    {renderCardContent(item, cardStyles)}
                </Card>
            )}
        />
    );
}