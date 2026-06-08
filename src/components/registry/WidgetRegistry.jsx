// src/components/registry/WidgetRegistry.jsx

import Microblog from '../widgets/Microblog.jsx';
import VideoGallery from '../widgets/VideoGallery.jsx';
import BookTracker from '../widgets/BookTracker.jsx';
import GameTracker from '../widgets/GameTracker.jsx';
import WebringSidebar from "../widgets/WebringSidebar.jsx";
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
    gameTracker: GameTracker,
    webringSidebar: WebringSidebar,
};