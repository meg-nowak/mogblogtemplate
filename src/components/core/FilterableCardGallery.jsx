import { Card } from './BaseCard';
import FilterableGallery from './FilterableGallery';

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