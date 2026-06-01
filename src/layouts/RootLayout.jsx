// src/layouts/RootLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import siteMeta from '../siteconfig/site-meta.json';
import themeConfig from '../siteconfig/theme.json';
import customPagesConfig from '../siteconfig/custom-pages.json';

// This is the default layout of your website
// Id like to move the global header/navbar configuration outside of this file
// I think the footer as well
export default function RootLayout() {

    const themeStyles = {
        '--theme-bg': themeConfig.colors.background,
        '--theme-surface': themeConfig.colors.surface,
        '--theme-text': themeConfig.colors.text,
        '--theme-primary': themeConfig.colors.primary,
        '--theme-secondary': themeConfig.colors.secondary,
        '--theme-border': themeConfig.colors.border,
        '--theme-font': themeConfig.fonts.base,
    };

    return (
        <div style={themeStyles} className="min-h-screen bg-(--theme-bg) text-(--theme-text) flex flex-col font-(--theme-font) transition-colors duration-500">
            {/* Global Header / Navbar */}
            <header className="border-b border-(--theme-border) bg-(--theme-surface)/40 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <Link to="/" className="text-xl font-bold tracking-tight hover:text-(--theme-primary)] transition-colors">
                        {siteMeta.siteTitle || "My Garden"}
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium hover:text-(--theme-primary)">Home</Link>
                        <Link to="/library" className="text-sm font-medium hover:text-(--theme-primary)]">Library</Link>

                        {/* Dynamically display your custom page links in navigation */}
                        {customPagesConfig.map(page => (
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

            {/* Main Application Container */}
            <main className="grow max-w-6xl w-full mx-auto px-4 py-8">
                {/* The active page route gets injected right here */}
                <Outlet />
            </main>

            {/* Global Footer */}
            <footer className="border-t border-(--theme-border) bg-(--theme-bg) py-6 text-center text-xs text-(--theme-text) mt-12">
                © {new Date().getFullYear()} {siteMeta.authorName}. Built with React & Vite. Hosted on Neocities.
            </footer>
        </div>
    );
}