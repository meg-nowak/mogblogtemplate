import videoData from '../content/data/videos.json';
import { Card } from './core/Card.jsx';
import FilterableGallery from './core/FilterableGallery';
import themePresets from "../themeconfig/theme-presets";

// This should be refactored to use the FilterableCardGallery instead of just the FilterableGallery
// I'm also not 100% sold on this name for this component

export default function VideoGallery({title = "What I've been watching", themePreset="glassmorphic"}) {
    // Get theme information
    const styles = themePresets[themePreset];

    return (
        <section className={"space-y-6 p-2 " + styles?.wrapper}>
            <div className="border-b border-theme-border/60 pb-2">
                <h2 className="text-xl font-semibold tracking-tight text-theme-text">{title}</h2>
            </div>
            <FilterableGallery
                title="Video Bookmarks"
                items={videoData}
                itemsPerPage={4}
                emptyMessage="No videos found for these tags."
                styles={styles}
                renderItem={(video) => (
                    <Card key={video.id} className={"hover:-translate-y-1 " + styles?.card}>
                        <Card.Content>
                            <Card.Header title={video.title} />

                            <Card.Body>
                                {video.comment && (
                                    <p className={"text-sm text-(--theme-text) line-clamp-2 mb-3 " + styles?.text}>
                                        {video.comment}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-1.5">
                                    {video.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50 border(--theme-border) px-2 py-0.5 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Card.Body>

                            <div className="mt-3 pt-3 border-t border(--theme-border)">
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-semibold text-theme-primary hover:opacity-80 transition-opacity flex items-center gap-1 group/link"
                                >
                                    Watch Video
                                    <span className="transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                                </a>
                            </div>
                        </Card.Content>
                    </Card>
                )}
            />
        </section>
    );
}