// src/components/layout/Footer.jsx
import siteMeta from '../../siteconfig/site-meta.json';

export default function Footer() {
    return (
        <footer className="border-t border-(--theme-border) bg-(--theme-bg) py-6 text-center text-xs text-(--theme-text) mt-12">
            © {new Date().getFullYear()} {siteMeta.authorName}. Built with React & Vite. Hosted on Neocities.
        </footer>
    );
}