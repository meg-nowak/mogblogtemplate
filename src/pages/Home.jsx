// src/pages/Home.jsx
import layoutConfig from '../siteconfig/home-layout.json';
import sidebarLayoutConfig from '../siteconfig/sidebar-layout.json';
import siteMeta from '../siteconfig/site-meta.json';
import AppImage from '../components/core/AppImage.jsx';
import WidgetRenderer from '../components/registry/WidgetRenderer';

export default function Home() {
    // Filter out inactive sections right away
    const activeMainSections = layoutConfig.filter(section => section.visible);
    const activeSidebarSections = sidebarLayoutConfig.filter(section => section.visible);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            {/* Hero Header */}
            <AppImage
                src={siteMeta.heroImage}
                alt="A beautiful landscape"
                aspect="aspect-[21/9]"
                rounded="rounded-3xl"
                animate
                overlayClassName="bg-gradient-to-t from-black/20 to-transparent"
            />

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Column (Spans 2 columns on large screens) */}
                <div className="lg:col-span-2 space-y-16 animate-in fade-in duration-500">
                    {activeMainSections.map((section) => (
                        <WidgetRenderer key={section.id} section={section} />
                    ))}
                </div>

                {/* Sidebar Column (Spans 1 column) */}
                <div className="space-y-12 animate-in fade-in duration-500 delay-100">
                    {activeSidebarSections.map((section) => (
                        <WidgetRenderer key={section.id} section={section} />
                    ))}
                </div>

            </div>
        </div>
    );
}