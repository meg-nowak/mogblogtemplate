import { Outlet, Link } from 'react-router-dom';
import siteMeta from '../siteconfig/site-meta.json';
import customPages from '../siteconfig/pages.json';
import themeConfig from '../siteconfig/theme.json';

export default function RootLayout() {
    const navPages = customPages.filter(page => page.showInNav === true);

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
        <div style={themeStyles} className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col font-[var(--theme-font)] transition-colors duration-500">

            <header className="border-b border-[var(--theme-border)] bg-[var(--theme-surface)]/40 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">

                    <Link to="/" className="text-xl font-bold tracking-tight hover:text-[var(--theme-primary)] transition-colors">
                        {siteMeta.siteTitle}
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">

                        {/* Hardcoded Links (If you have any, like Home or Library) */}
                        <Link to="/" className="hover:text-slate-800 transition-colors">Home</Link>
                        <Link to="/library" className="hover:text-slate-800 transition-colors">Library</Link>

                        {/* 3. Dynamically Generated Links from pages.json */}
                        {navPages.map(page => (
                            <Link
                                key={page.slug}
                                to={`/${page.slug}`}
                                className="hover:text-slate-800 transition-colors"
                            >
                                {page.title}
                            </Link>
                        ))}

                        {/* External Links from site-meta.json */}
                        {siteMeta.links.github && (
                            <a href={siteMeta.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 transition-colors ml-2 sm:ml-4 pl-4 sm:pl-6 border-l border-slate-200">
                                GitHub
                            </a>
                        )}
                        {siteMeta.links.email && (
                            <a href={`mailto:${siteMeta.links.email}`} className="hover:text-slate-800 transition-colors">
                                Email
                            </a>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
                {/* Bio Section can optionally go here, or be moved to Home.jsx */}
                <Outlet />
            </main>

            {/* Dynamic Footer */}
            <footer className="py-8 text-center text-sm border-t border-[var(--theme-border)] mt-auto bg-[var(--theme-surface)]/30">
                <p>&copy; {new Date().getFullYear()} {siteMeta.authorName}. Built with React & Tailwind.</p>
            </footer>
        </div>
    );
}