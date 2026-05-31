// src/pages/CustomPage.jsx
import { Link } from 'react-router-dom';
import AppImage from '../components/AppImage';

// 1. Eagerly grab all JSON files in the pages folder at compile time
const pageModules = import.meta.glob('/src/content/pages/*.json', { eager: true });

// 2. Format them into a clean lookup map keyed by filename (slug)
const pagesMap = Object.entries(pageModules).reduce((acc, [filepath, module]) => {
    const filename = filepath.split('/').pop().replace('.json', '');
    acc[filename] = module.default || module;
    return acc;
}, {});

export default function CustomPage({ slug }) {
    // 3. Find the data matching our current page slug
    const pageData = pagesMap[slug];

    // 4. Safely handle missing files so your app never crashes
    if (!pageData) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-slate-700 mb-4">Page Content Missing</h1>
                <p className="text-slate-500 mb-6">Could not find data file at <code>src/content/pages/{slug}.json</code></p>
                <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Home</Link>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-500">
            <Link to="/" className="text-sm font-medium text-slate-400 hover:text-slate-700 mb-4 inline-block">
                &larr; Return Home
            </Link>

            {/* Optional Hero Header Image */}
            {pageData.heroImage && (
                <AppImage
                    src={pageData.heroImage}
                    alt={pageData.title}
                    aspect="aspect-[21/9]"
                    rounded="rounded-3xl"
                    animate
                />
            )}

            {/* Title & Introduction */}
            <header className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {pageData.title}
                </h1>
                {pageData.intro && (
                    <p className="text-xl text-slate-600 leading-relaxed font-light">
                        {pageData.intro}
                    </p>
                )}
            </header>

            <hr className="border-slate-200" />

            {/* Dynamic Sections Loop */}
            <div className="prose prose-slate max-w-none space-y-10">
                {pageData.sections?.map((section, index) => (
                    <section key={index} className="space-y-3">
                        <h2 className="text-2xl font-bold text-slate-800 m-0">
                            {section.heading}
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-base m-0">
                            {section.body}
                        </p>
                    </section>
                ))}
            </div>
        </article>
    );
}