// src/pages/CustomPage.jsx
import {useParams} from 'react-router-dom';
import WidgetErrorCard from '../../components/registry/WidgetErrorCard';
import WidgetRenderer from '../../components/registry/WidgetRenderer';

// 1. Eagerly grab all JSON files in the pages folder at compile time
const pageModules = import.meta.glob('/src/content/pages/*.json', { eager: true });

export default function CustomPage() {
    const { slug: rawSlug } = useParams();

    // Fallback safety check: if the router hits this page without a slug parameter,
    // default to a safe string so the code doesn't crash on charAt()
    const slug = rawSlug || "new-page";

    // Construct the expected file path based on the URL slug
    const expectedPath = `/src/content/pages/${slug}.json`;
    const pageModule = pageModules[expectedPath];

    // Safely handle missing files so your app never crashes
    if (!pageModule) {
        // Generate a customized boilerplate snippet specific to this missing slug
        const boilerplateSnippet = JSON.stringify({
            title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Page`,
            heroImage: "/images/default-hero.jpg",
            intro: "Welcome to my new custom page! Edit this intro text in your JSON file.",
            sections: [
                {
                    id: `${slug}-section-1`,
                    type: "bio", // fallback default widget type
                    props: {
                        heading: "First Section",
                        body: "Start customizing your content here..."
                    }
                }
            ]
        }, null, 2);

        return (
            <div className="max-w-4xl mx-auto p-6">
                <WidgetErrorCard
                    variant="warning"
                    icon="📄"
                    title={<>Missing Content Blueprint: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-800 font-mono text-sm">"{slug}.json"</code></>}
                    message={
                        <div className="space-y-2">
                            <p>
                                You successfully registered the route for <span className="font-mono bg-slate-200/60 px-1 rounded text-xs">"/{slug}"</span> inside <code className="text-xs font-mono bg-slate-100 px-1 rounded">custom-pages.json</code>.
                                However, the layout engine cannot find the matching data file at:
                            </p>
                            <p className="font-mono text-xs bg-slate-100 p-2 rounded border border-slate-200 text-slate-600 block select-all">
                                src/content/pages/{slug}.json
                            </p>
                        </div>
                    }
                    adviceTitle="🚀 Fast Track - Generate This Page:"
                    adviceList={[
                        <>Create a brand new file in your editor named exactly <code className="font-mono bg-slate-100 px-0.5 rounded">{slug}.json</code>.</>,
                        <>Save it inside the directory: <code className="font-mono bg-slate-100 px-0.5 rounded">src/content/pages/</code>.</>,
                        <>Copy the boilerplate blueprint below and paste it directly into that file to instantly activate the page.</>
                    ]}
                    stackTrace={
                        <div>
                            <p className="text-slate-400 font-sans text-xs mb-1">📋 Copy-paste boilerplate layout for {slug}.json:</p>
                            <pre className="text-amber-200 font-mono text-xs select-all whitespace-pre-wrap">
                                {boilerplateSnippet}
                            </pre>
                        </div>
                    }
                />
            </div>
        );
    }

    // If the file exists, pull out the parsed data payload
    const pageData = pageModule.default || pageModule;

    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header / Hero Area */}
            <header className="space-y-3 border-b border-theme-border pb-6">
                <h1 className="text-3xl font-bold text-theme-text">{pageData.title}</h1>
                {pageData.intro && <p className="text-theme-text-muted text-lg">{pageData.intro}</p>}
            </header>

            {/* Dynamic Widget Grid / Sections */}
            <div className="space-y-6">
                {pageData.sections?.map(section => (
                    <WidgetRenderer key={section.id} section={section} />
                ))}
            </div>
        </main>
    );
}