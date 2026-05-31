// src/components/GameCard.jsx
import { Card } from './core/BaseCard.jsx';

// I don't feel like this needs to be its own function, I think this stuff could be fine inside the game tracker.
export default function GameCard({ title, platform, status, review, slug, coverUrl }) {

    // A tiny helper to map the game status to our BaseCard badge variants
    const getBadgeVariant = (currentStatus) => {
        switch(currentStatus?.toLowerCase()) {
            case 'playing': return 'success';
            case 'completed': return 'primary';
            default: return 'default'; // covers 'paused' and undefined
        }
    };

    return (
        <Card>
            <Card.Image src={coverUrl} alt={`Cover of ${title}`} />

            <Card.Content>
                <Card.Header
                    title={title}
                    subtitle={platform}
                    rightSlot={
                        status && <Card.Badge variant={getBadgeVariant(status)}>{status}</Card.Badge>
                    }
                />

                {review && (
                    <Card.Body className="italic line-clamp-3">
                        "{review}"
                    </Card.Body>
                )}

                {slug && (
                    <Card.Action to={`/games/${slug}`}>Read full review</Card.Action>
                )}
            </Card.Content>
        </Card>
    );
}