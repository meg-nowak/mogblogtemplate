// src/components/registry/WidgetRenderer.jsx
import { WidgetRegistry } from './WidgetRegistry';

export default function WidgetRenderer({ section }) {
    const Widget = WidgetRegistry[section.type];

    if (!Widget) {
        return (
            <div className="p-4 border border-red-200 bg-red-50 text-red-500 rounded-xl text-sm">
                Error: Widget type "{section.type}" not found in WidgetRegistry.
            </div>
        );
    }

    return (
        <div className="w-full">
            <Widget {...section.props} />
        </div>
    );
}