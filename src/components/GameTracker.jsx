import gameData from '../content/games.json';
import GameCard from './GameCard';

export default function GameTracker({ title = "Now Playing", limit = 3 }) {
    const displayGames = gameData.slice(0, limit);

    if (displayGames.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="border-b border-theme-border/60 pb-2">
                <h2 className="text-xl font-semibold tracking-tight text-theme-text">{title}</h2>
            </div>

            <div className="flex flex-col gap-4">
                {displayGames.map(game => (
                    <GameCard key={game.id} {...game} />
                ))}
            </div>
        </div>
    );
}