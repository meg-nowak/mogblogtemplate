// src/components/registry/WidgetErrorBoundary.jsx
import React from 'react';
import WidgetErrorCard from "./WidgetErrorCard.jsx";

export default class WidgetErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    // This lifecycle hook tells React to swap out the broken UI for our error card
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // This hook captures the exact technical details of where the code failed
    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error("Widget Runtime Crash:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <WidgetErrorCard
                    variant="danger"
                    icon="💥"
                    title={<>Widget Runtime Crash: <code className="bg-red-100 px-1.5 py-0.5 rounded text-red-800 font-mono text-sm">"{this.props.type}"</code></>}
                    message={
                        <p>The component registered under <strong className="font-semibold">"{this.props.type}"</strong> encountered a critical execution error while processing its layout rendering.</p>
                    }
                    adviceList={[
                        <>Examine your corresponding raw <code className="font-mono bg-slate-100 px-0.5 rounded">.json</code> data assets for missing properties, null objects, or undefined records.</>,
                        <>Ensure any arrays or strings are properly initialized before trying to call standard operations like operations like <code className="font-mono bg-slate-100 px-0.5 rounded">.map()</code> or <code className="font-mono bg-slate-100 px-0.5 rounded">.split()</code>.</>
                    ]}
                    stackTrace={
                        <>
                            <p className="font-bold text-white mb-1">{this.state.error?.toString()}</p>
                            <span className="text-slate-500 whitespace-pre">
                                {this.state.errorInfo?.componentStack}
                            </span>
                        </>
                    }
                />
            );
        }

        // If there's no error, smoothly pass through to render the actual widget
        return this.props.children;
    }
}