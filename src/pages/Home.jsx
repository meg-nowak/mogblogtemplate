import layoutConfig from '../siteconfig/home-layout.json';
import sidebarLayoutConfig from '../siteconfig/sidebar-layout.json';
import siteMeta from '../siteconfig/site-meta.json';
import Microblog from '../components/Microblog';
import VideoGallery from '../components/VideoGallery';
import BookTracker from '../components/BookTracker';
import GameTracker from "../components/GameTracker.jsx";
import HeaderImage from '../components/HeaderImage';

// So the idea of this file is that this is where you customise the layout of your home page.
// It needs a little bit of work, since the widget components like booktracker and gametracker etc are configured in home-layout and sidebar-layout
// The overall design of this needs a bit of a think, because I want it to balance well between configuring the layout in a way that is super easy but still allows for freedom

// I've got a bad feeling about this...
// I feel like this should be its own thing
// I think it would be good to provide visibility of what widgets are allowed and how to configure them somewhere
const ComponentMap = {
    bio: () => (
        <div className="prose prose-slate max-w-none mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 mb-4">
                Hi, I'm {siteMeta.authorName} 👋
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
                Welcome to my digital space. This is where I keep track of what I'm reading, watching, and building.
            </p>
        </div>
    ),
    bookTracker: (props) => <BookTracker {...props} />,
    videoGallery: (props) => <VideoGallery {...props} />,
    microBlog: (props) => <Microblog {...props} />,
    gameTracker: (props) => <GameTracker {...props} />
};

export default function Home() {
    const activeMainSections = layoutConfig.filter(section => section.visible);
    const activeSidebarSections = sidebarLayoutConfig.filter(section => section.visible);

    const renderSection = (section) => {
        const Widget = ComponentMap[section.type];
        if (!Widget) {
            return (
                <div key={section.id} className="p-4 border border-red-200 bg-red-50 text-red-500 rounded-xl text-sm">
                    Error: Widget type "{section.type}" not found.
                </div>
            );
        }
        return (
            <div key={section.id} className="w-full">
                <Widget {...section.props} />
            </div>
        );
    };

    return (
        <div>
            <HeaderImage
                src={siteMeta.heroImage}
                alt="A beautiful landscape"
                height="h-80"
            />
            <br/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Main Column: Feed (Spans 2 columns) */}
                <div className="md:col-span-2 space-y-16 animate-in fade-in duration-500">
                    {activeMainSections.map(renderSection)}
                </div>

                {/* Sidebar Column (Spans 1 column) */}
                <div className="space-y-8 animate-in fade-in duration-500 delay-100">
                    {activeSidebarSections.map(renderSection)}
                </div>

            </div>
        </div>

    );
}