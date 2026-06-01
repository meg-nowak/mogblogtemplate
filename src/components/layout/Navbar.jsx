// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';
import siteMeta from '../../siteconfig/site-meta.json';
import customPagesConfig from '../../siteconfig/custom-pages.json';
import navbarConfig from '../../themeconfig/navbar.json';

// Define layout engine theme presets
const PRESET_STYLES = {
    default: "border-b border-(--theme-border) bg-(--theme-surface)/40 backdrop-blur-md",
    glassmorphism: "border-b border-white/20 bg-white/10 backdrop-blur-lg shadow-sm text-slate-800",
    "dark-minimal": "border-b border-zinc-800 bg-zinc-950 text-zinc-100",
    "pastel-sage": "border-b border-[#d8e2dc] bg-[#f0f4f1] text-[#4a5759]"
};

export default function Navbar() {
    const { preset, customColors } = navbarConfig;

    // 1. Determine base structural classes using presets
    const activePresetClass = PRESET_STYLES[preset] || PRESET_STYLES.default;

    // 2. Generate local style variable definitions if custom overrides exist
    const localNavStyles = {
        '--nav-bg': customColors?.background || 'var(--theme-surface)',
        '--nav-text': customColors?.text || 'var(--theme-text)',
        '--nav-border': customColors?.border || 'var(--theme-border)',
        '--nav-primary': customColors?.primary || 'var(--theme-primary)',
    };

    // 3. Filter layout registry array to discard items flagged as hidden
    const visiblePages = customPagesConfig.filter(page => page.showInNavbar !== false);

    return (
        <header
            style={localNavStyles}
            className={`sticky top-0 z-10 transition-all duration-300 ${activePresetClass}`}
            // Note: If users define customColors, we switch these fallbacks dynamically
            // e.g., changing bg-(--theme-surface) to bg-[var(--nav-bg)]
        >
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <Link to="/" className="text-xl font-bold tracking-tight hover:text-(--theme-primary) transition-colors">
                    {siteMeta.siteTitle || "My Garden"}
                </Link>

                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium hover:text-(--theme-primary)">Home</Link>
                    <Link to="/library" className="text-sm font-medium hover:text-(--theme-primary)">Library</Link>

                    {/* Dynamically display authorized custom page links */}
                    {visiblePages.map(page => (
                        <Link
                            key={page.slug}
                            to={`/${page.slug}`}
                            className="text-sm font-medium hover:text-(--theme-primary)"
                        >
                            {page.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}