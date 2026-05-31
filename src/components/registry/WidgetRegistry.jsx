// src/components/registry/WidgetRegistry.jsx

import Microblog from '../Microblog';
import VideoGallery from '../VideoGallery';
import BookTracker from '../BookTracker';
import GameTracker from '../GameTracker';
// import AuthorBio from '../AuthorBio'; // Extracted from the inline code!

/**
 * WIDGET REGISTRY
 * * This map dictates which components can be rendered via JSON layout files.
 * If you create a new widget, it must be registered here.
 * * JSON 'type' key : React Component
 */
export const WidgetRegistry = {
    bookTracker: BookTracker,
    videoGallery: VideoGallery,
    microBlog: Microblog,
    gameTracker: GameTracker
};