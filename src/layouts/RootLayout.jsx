// src/layouts/RootLayout.jsx
import { Outlet } from 'react-router-dom';
import themeConfig from '../themeconfig/theme.json';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DevEditButton from "../components/dev/DevEditButton.jsx";

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
        <div style={themeStyles} className="min-h-screen bg-[url(public/a4c2fd537c70381105d5a4a7f41a794c.jpg)] text-(--theme-text) flex flex-col font-(--theme-font) transition-colors duration-500">
            {/* Modular Layout Elements */}
            <Navbar />

            {/* Main Application Container */}
            <main className="grow max-w-6xl w-full mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* Modular Footer */}
            <Footer />

            <DevEditButton />
        </div>
    );
}