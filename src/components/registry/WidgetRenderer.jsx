// src/components/registry/WidgetRenderer.jsx
import { WidgetRegistry } from './WidgetRegistry';
import WidgetErrorBoundary from "./WidgetErrorBoundary";
import WidgetErrorCard from './WidgetErrorCard';
import DevDataInspector from '../dev/DevDataInspector';

export default function WidgetRenderer({ section }) {
    const Widget = WidgetRegistry[section.type];

    // If the component type doesn't exist in the registry,
    // render our supportive diagnostic card instead of crashing or leaving a blank spot!
    if (!Widget) {
        return (
            <WidgetErrorCard
                variant="warning"
                icon="⚠️"
                title={<>Missing Widget Type: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-800 font-mono text-sm">"{section.type}"</code></>}
                message={
                    <p>The layout engine tried to render a component with the ID <span className="font-mono bg-slate-200/60 px-1 rounded text-xs">"{section.id}"</span>, but the type specified is not registered.</p>
                }
                adviceList={[
                    <>Check your layout JSON configuration file for typos in the <code className="font-mono bg-slate-100 px-0.5 rounded">"type"</code> field (remember it's case-sensitive!).</>,
                    <>Verify that you have explicitly imported and mapped this component inside <code className="font-mono bg-slate-100 px-0.5 rounded">src/components/registry/WidgetRegistry.jsx</code>.</>
                ]}
            />
        );
    }

    // Peel off the wrapper props
    const {  ...widgetProps } = section.props || {};

    // We assume the data driving the widget is passed in 'props'
    // or specifically under a 'data' key within your layout JSON
    const dataToInspect = widgetProps.items || widgetProps.data || widgetProps;



    // Catch functional component data errors (Phase 2)
    return (
        <div className="w-full relative">
            {/* The Global Debugger for this specific widget */}
            {import.meta.env.DEV && (
                <DevDataInspector
                    data={dataToInspect}
                    label={`Debug: ${section.type} (${section.id})`}
                />
            )}
            <WidgetErrorBoundary type={section.type}>
                <Widget {...section.props} />
            </WidgetErrorBoundary>
        </div>
    );
}